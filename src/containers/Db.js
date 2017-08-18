import React from 'react'
import { connect } from 'react-redux'
import { loadAccounts, loadAllTasks, loadQualifiedTasks, loadOpenOptyTasks, loadAllUsers, setHasLoaded, setHasErrored } from '../actions'
import PropTypes from 'prop-types'
import SfdcConnector from 'utils/sfdc-Connector'
import { Button } from 'react-lightning-design-system'
import _ from 'lodash';

export class Db extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static get KEYS() {
    return {
      USERS: 'Users',
      ACCOUNTS: 'Accounts',
      ACCOUNTS_QUALIFIED: 'QualifiedAccounts',
      CONTACTS_QUALIFIED: 'QualifiedContacts',
      LEADS_QUALIFIED: 'QualifiedLeads',
      TASKS_QUALIFIED: 'QualifiedTasks',
      TASKS_OPEN_OPTY: 'OpenOptyTasks',
      OPPORTUNITIES_QUALIFIED: 'QualifiedOpportunities',
      OPPORTUNITIES_OPEN: 'OpenOpportunities',
      TASKS: 'Tasks',
      OPPORTUNITIES: 'Opportunities',
    };
  }

  get connector() {
    if (!this._cache.connector) {
      this._cache.connector = new SfdcConnector();
    }
    return this._cache.connector;
  }

  constructor(props) {
    super(props);
    this._cache = {};
  }

  componentDidMount() {
    return this.query();
  }

  query() {
    this.clearRecordCache();
    this.props.dispatch(setHasLoaded(false));
    return this.connector.init()
      .then(() => Promise.all([
        this.queryUsers(),
        this.queryQualifiedTasks(),
        this.queryAllTasks(),
        this.queryOpenOptyTasks(),
      ]))
      .then(() => {
        this.props.dispatch(setHasLoaded(true));
      }).catch(e => {
        console.dir(e); // eslint-disable-line
        this.props.dispatch(setHasErrored(true));
      });
  }

  // Query Tasks:
  //   - related to qualified Contacts and Leads
  //   - related to accounts that are related to qualified Contacts
  //   - related to opportunities that are related to accounts that are related to qualified Contacts
  queryQualifiedTasks() {
    return new Promise((resolve) => {
      // Query Leads and Contacts with Qualified Status
      Promise.all([
        this.queryQualifiedContacts(),
        this.queryQualifiedLeads(),
      ])
      .then(([qualifiedContacts, qualifiedLeads]) => {
        // Use results to build lists of related record Ids
        const qualifiedContactIds = _.map(qualifiedContacts, 'Id');
        const qualifiedLeadIds = _.map(qualifiedLeads, 'Id');
        const qualifiedAccountIds = _.map(qualifiedContacts, 'AccountId');

        // Query for opportunities related to qualified accounts
        this.queryQualifiedOpportunities(qualifiedAccountIds)
          .then(qualifiedOpportunities => {
            const qualifiedOpportunityIds = _.map(qualifiedOpportunities, 'Id');

            const whoIds = _.concat(qualifiedContactIds, qualifiedLeadIds);
            const whatIds = _.concat(qualifiedAccountIds, qualifiedOpportunityIds);

            // Now look for tasks related to all the records queried above
            this.queryTasksByRelated(whoIds, whatIds, Db.KEYS.TASKS_QUALIFIED)
              .then(qualifiedTasks => {
                this.props.dispatch(loadQualifiedTasks(qualifiedTasks));
                resolve(qualifiedTasks);
              });
          });
      })
    });
  }

  // Query Tasks:
  //   - related to Open Opportunities
  queryOpenOptyTasks() {
    return new Promise((resolve) => {
      // Find open opties
      this.queryOpenOpportunities()
        .then(openOpportunities => {
          const openOpportunityIds = _.map(openOpportunities, 'Id');

          // Now look for tasks related to all the records queried above
          this.queryTasksByRelated([], openOpportunityIds, Db.KEYS.TASKS_OPEN_OPTY)
            .then(openOptyTasks => {
              this.props.dispatch(loadOpenOptyTasks(openOptyTasks));
              resolve(openOptyTasks);
            });
          });
    });
  }

  queryAccounts() {
      return new Promise((resolve, reject) => {
        this.connector.connection.sobject('Account')
          .select('*')
          .execute((err, results) =>
            this.handleResponse(err, results, resolve, reject, Db.KEYS.ACCOUNTS)
          );
      }).then(allAccounts => {
        this.props.dispatch(loadAccounts(allAccounts));
      });
  }

  queryAllTasks() {
    return new Promise((resolve, reject) => {
      this.connector.connection.sobject('Task')
        .select('*, Who.*, What.*')
        .where('IsClosed = FALSE')
        .execute((err, results) =>
          this.handleResponse(err, results, resolve, reject, Db.KEYS.TASKS)
        );
    }).then(allTasks => {
      this.props.dispatch(loadAllTasks(allTasks));
    });
  }

  queryTasksByRelated(whoIdList, whatIdList, DBKey) {
    const MAX_SIZE = 100;
    // WTF is going on here? Because we are sending GET requests with too many chars, we need to chunk requests with no more than 200 records at a time and concatenate the results
    return Promise.all([
      ..._(whoIdList)
        .chunk(MAX_SIZE)
        .map((whoIdListChunk) => {
          return new Promise((resolve, reject) => {
            this.connector.connection.sobject('Task')
              .find({
                IsClosed: false,
                WhoId: {
                  $in: whoIdListChunk
                }
              }, '*, Who.*')
              .execute((err, results) => {
                if (err) {
                  reject(err);
                }
                resolve(results);
              });
          });
        }),
      ..._(whatIdList)
        .chunk(MAX_SIZE)
        .map((whatIdListChunk) => {
          return new Promise((resolve, reject) => {
            this.connector.connection.sobject('Task')
              .find({
                IsClosed: false,
                WhatId: {
                  $in: whatIdListChunk
                }
              }, '*, What.*')
              .execute((err, results) => {
                if (err) {
                  reject(err);
                }
                resolve(results);
              });
          });
        }),
    ]).then(results => {
      const concatenatedResults = _.concat([], ...results);
      console.dir(DBKey) //eslint-disable-line
      console.dir(concatenatedResults) //eslint-disable-line
      this.cacheRecords(DBKey, concatenatedResults);
      return concatenatedResults;
    });
  }

  queryUsers() {
    return new Promise((resolve, reject) => {
      this.connector.connection.sobject('User')
        .select('*')
        .execute((err, results) =>
          this.handleResponse(err, results, resolve, reject, Db.KEYS.USERS)
        );
    }).then(allUsers => {
      this.props.dispatch(loadAllUsers(allUsers));
    });
  }

  queryQualifiedContacts() {
    // SELECT Id, Name, AccountId FROM Contact WHERE Contact_Status__c = 'Sales Qualified Lead'
    return new Promise((resolve, reject) => {
      this.connector.connection.sobject('Contact')
        .select('*')
        .where(`Contact_Status__c = 'Sales Qualified Lead'`)
        .execute((err, results) =>
          this.handleResponse(err, results, resolve, reject, Db.KEYS.CONTACTS_QUALIFIED)
        );
    });
  }

  queryOpenOpportunities() {
    return new Promise((resolve, reject) => {
      this.connector.connection.sobject('Opportunity')
        .select('*')
        .where('IsClosed = FALSE')
        .execute((err, results) =>
          this.handleResponse(err, results, resolve, reject, Db.KEYS.OPPORTUNITIES_OPEN)
        );
    });
  }

  queryQualifiedLeads() {
    // SELECT Id, Name FROM Lead WHERE Status = 'Sales Accepted Lead'
    return new Promise((resolve, reject) => {
      this.connector.connection.sobject('Lead')
        .select('*')
        .where(`Status = 'Sales Accepted Lead'`)
        .execute((err, results) =>
          this.handleResponse(err, results, resolve, reject, Db.KEYS.LEADS_QUALIFIED)
        );
    });
  }

  queryRecordsByFieldInList(recordType, field, list, DBKey) {
    // SELECT Id, Name FROM Lead WHERE Status = 'Sales Accepted Lead'
    return new Promise((resolve, reject) => {
      this.connector.connection.sobject(recordType)
        .find({
          [field]: {
            $in: list,
          }
        })
        .execute((err, results) =>
          this.handleResponse(err, results, resolve, reject, DBKey)
        );
    });
  }

  queryQualifiedAccounts(qualifiedAccountIdList) {
    return this.queryRecordsByFieldInList('Account', 'Id', qualifiedAccountIdList, Db.KEYS.ACCOUNTS_QUALIFIED);
  }

  queryQualifiedOpportunities(qualifiedAccountIdList) {
    return this.queryRecordsByFieldInList('Opportunity', 'AccountId', qualifiedAccountIdList, Db.KEYS.OPPORTUNITIES_QUALIFIED);
  }

  handleResponse(err, results, resolve, reject, description) {
    if (err) {
      reject(err);
    }
    console.dir(description); // eslint-disable-line
    console.dir(results); // eslint-disable-line
    this.cacheRecords(description, results);
    resolve(results);
  }

  clearRecordCache() {
    this._cache.records = {};
  }

  cacheRecords(description, records) {
    this._cache.records[description] = records;
  }

  getCachedRecords(description) {
    return this._cache.records[description];
  }

  render() {
    return (
      <Button
        type="icon-border"
        size={undefined}
        icon="refresh"
        onClick={::this.query}
      />);
  }
}

export default connect()(Db);

import React from 'react'
import { connect } from 'react-redux'
import { loadAccounts, loadAllTasks, loadAllUsers, setHasLoaded, setHasErrored } from '../actions'
import PropTypes from 'prop-types'
import SfdcConnector from 'utils/sfdc-Connector'
import { Button } from 'react-lightning-design-system'

export class Db extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static get KEYS() {
    return {
      USERS: 'Users',
      ACCOUNTS: 'Accounts',
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
      .then(::this.queryUsers)
      .then(::this.queryAccounts)
      .then(::this.queryTasks)
      .then(() => {
        this.props.dispatch(setHasLoaded(true));
      }).catch(e => {
        console.dir(e); // eslint-disable-line
        this.props.dispatch(setHasErrored(true));
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

  queryTasks() {
    return new Promise((resolve, reject) => {
      this.connector.connection.sobject('Task')
        .select('*, Who.*, What.*')
        .where(`Status = 'Open'`)
        .execute((err, results) =>
          this.handleResponse(err, results, resolve, reject, Db.KEYS.TASKS)
        );
    }).then(allTasks => {
      this.props.dispatch(loadAllTasks(allTasks));
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

import React from 'react'
import { connect } from 'react-redux'
import { loadAccounts, loadAllTasks, setHasLoaded } from '../actions'
import PropTypes from 'prop-types'
import SfdcConnector from 'utils/sfdc-Connector'
import { Button } from 'react-lightning-design-system'

export class Db extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

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
    this.props.dispatch(setHasLoaded(false));
    return this.connector.init()
      .then(::this.queryAccounts)
      .then(::this.queryTasks)
      .then(() => {
        this.props.dispatch(setHasLoaded(true));
      });
  }

  queryAccounts() {
    return this.connector.query('SELECT Id, Name FROM Account')
      .then((results) => {
        console.dir('Good job'); // eslint-disable-line
        console.dir(results); // eslint-disable-line
        this.props.dispatch(loadAccounts(results.records))
      });
  }

  queryTasks() {
    return new Promise((resolve, reject) => {
      this.connector.connection.sobject('Task')
        .select('*, Who.*, What.*')
        .where(`Status = 'Open'`)
        .execute(function(err, results) {
          if (err) {
            reject(err);
          }
          resolve(results);
        })
    }).then(allTasks => {
      this.props.dispatch(loadAllTasks(allTasks));
    });
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

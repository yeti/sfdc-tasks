import React from 'react'
import { connect } from 'react-redux'
import { loadAccounts } from '../actions'
import PropTypes from 'prop-types'
import SfdcConnector from 'sfdc-Connector'

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
    this.connector.init()
      .then(::this.queryAccounts);
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
    return this.connector.query('SELECT Id, Name FROM Activity')
      .then((results) => {
        console.dir('Good job'); // eslint-disable-line
        console.dir(results); // eslint-disable-line
        this.props.dispatch(loadAccounts(results.records))
      });
  }

  render() {
    return null;
  }
}

export default connect()(Db);

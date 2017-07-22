import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import SfdcConnector from '../../db'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App

const sfdc = new SfdcConnector();

/*eslint-disable */
sfdc.init().then(conn => {
  conn.query('SELECT Id, Name FROM Account', (err, res) => {
    if (err) { return console.error(err); }
    console.dir(res); /* eslint-disable-line */
  });
})
/*eslint-enable */

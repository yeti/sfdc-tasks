import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import Db from '../containers/Db'
import VisibleTodoList from '../containers/VisibleTodoList'
import VisibleTaskList from '../containers/VisibleTaskList'

const App = () => (
  <div>
    <Db />
    <AddTodo />
    {false && <VisibleTodoList />}
    <VisibleTaskList />
    <Footer />
  </div>
)

export default App

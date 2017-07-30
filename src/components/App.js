import React from 'react'
import Header from './Header'
import Loader from '../containers/Loader'
import VisibleTaskList from '../containers/VisibleTaskList'

const App = () => (
  <div>
    <Header />
    <Loader />
    <VisibleTaskList />
  </div>
)

export default App

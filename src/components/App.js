import React from 'react'
import Loader from '../containers/Loader'
import Card from './Card'
import VisibleTaskList from '../containers/VisibleTaskList'

const App = () => (
  <div>
    <VisibleTaskList />
    <Loader />
    {false && <Card />}
  </div>
)

export default App

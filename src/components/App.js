import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Loader from '../containers/Loader'
import VisibleTaskList from '../containers/VisibleTaskList'

const App = () => (
  <div>
    <Header />
    <Loader />
    <VisibleTaskList />
    <Footer />
  </div>
)

export default App

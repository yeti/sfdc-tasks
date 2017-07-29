import React from 'react'
import Footer from './Footer'
import Db from '../containers/Db'
import Loader from '../containers/Loader'
import VisibleTaskList from '../containers/VisibleTaskList'
import { PageHeader, PageHeaderHeading, DropdownButton, DropdownMenuItem } from 'react-lightning-design-system'


const App = () => (
  <div>
    <PageHeader>
      <PageHeaderHeading
        legend="TASK TRACKER"
        title="My Tasks"
        info="X items"
        rightActions={[
          <Db key="db"/>,
          <DropdownButton type="icon-more" icon="filterList" menuAlign="right" key="dropdown">
            <DropdownMenuItem>
              All Tasks
            </DropdownMenuItem>
            <DropdownMenuItem>
              Sales Qualified Tasks
            </DropdownMenuItem>
            <DropdownMenuItem>
              Open Opportunity Tasks
            </DropdownMenuItem>
          </DropdownButton>]}
      />
    </PageHeader>
    <Loader />
    <VisibleTaskList />
    <Footer />
  </div>
)

export default App

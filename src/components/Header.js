import Db from '../containers/Db'
import FilterManager from '../containers/FilterManager'
import React from 'react'
import { PageHeader, PageHeaderHeading } from 'react-lightning-design-system'

const Header = () => {
  return (
    <PageHeader>
      <PageHeaderHeading
        legend="TASK TRACKER"
        title="My Tasks"
        info="X items"
        rightActions={[
          <Db key="db"/>,
          <FilterManager key="filters"/>
        ]}
      />
    </PageHeader>
  );
}

export default Header;

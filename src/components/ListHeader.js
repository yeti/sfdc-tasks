import Db from '../containers/Db'
import FilterManager from '../containers/FilterManager'
import React, {PropTypes} from 'react'
import { PageHeader, PageHeaderHeading } from 'react-lightning-design-system'

const Header = ({nItems, filterLabel}) => {
  return (
    <PageHeader>
      <PageHeaderHeading
        legend="TASK TRACKER"
        title={filterLabel}
        info={`${nItems} items`}
        rightActions={[
          <Db key="db"/>,
          <FilterManager key="filters"/>
        ]}
      />
    </PageHeader>
  );
}

Header.propTypes = {
  filterLabel: PropTypes.string.isRequired,
  nItems: PropTypes.number.isRequired,
}


export default Header;

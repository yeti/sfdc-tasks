import React from 'react'
import PropTypes from 'prop-types'
import { DropdownButton, DropdownMenuItem } from 'react-lightning-design-system'
import { setVisibilityFilter } from '../actions'

export const filterList = [
  {
    label: 'All Tasks',
    filter: 'SHOW_ALL_TASKS',
  },
  {
    label: 'Sales Qualified Tasks',
    filter: 'SHOW_SALES_QUALIFIED_TASKS',
  },
  {
    label: 'Open Opportunity Tasks',
    filter: 'SHOW_OPTY_TASKS',
  },
  /*{
    label: 'Untended Accounts',
    filter: 'SHOW_UNTENDED_ACCOUNTS',
  },*/
];

const Filters = ( { dispatch }) => (
  <DropdownButton type="icon-more" icon="filterList" menuAlign="right" onMenuItemClick={(item) => {dispatch(setVisibilityFilter(item.filter))}}>
    {filterList.map(filter => <DropdownMenuItem label={filter.label} filter={filter} key={filter.filter}/>)}
  </DropdownButton>
)

Filters.propTypes = {
  dispatch: PropTypes.func,
}

export default Filters

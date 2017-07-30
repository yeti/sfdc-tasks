import React from 'react'
import PropTypes from 'prop-types'
import { DropdownButton, DropdownMenuItem } from 'react-lightning-design-system'
import { setVisibilityFilter } from '../actions'

const Filters = ( { dispatch }) => (
  <DropdownButton type="icon-more" icon="filterList" menuAlign="right" onMenuItemClick={(item) => {dispatch(setVisibilityFilter(item.filter))}}>
    <DropdownMenuItem label="All Tasks" filter="SHOW_ALL_TASKS"/>
    <DropdownMenuItem label="Sales Qualified Tasks" filter="SHOW_SALES_QUALIFIED_TASKS"/>
    <DropdownMenuItem label="Open Opportunity Tasks" filter="SHOW_OPTY_TASKS"/>
    <DropdownMenuItem label="Untended Accounts" filter="SHOW_UNTENDED_ACCOUNTS"/>
  </DropdownButton>
)

Filters.propTypes = {
  dispatch: PropTypes.func,
}

export default Filters

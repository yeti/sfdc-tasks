import React from 'react'
import FilterOption from '../containers/FilterOption'
import { DropdownButton } from 'react-lightning-design-system'

const Filters = () => (
  <DropdownButton type="icon-more" icon="filterList" menuAlign="right">
    <FilterOption
      filter="SHOW_ALL_TASKS"
      label="All Tasks"
    />
    <FilterOption
      filter="SHOW_SALES_QUALIFIED_TASKS"
      label="Sales Qualified Taskss"
    />
    <FilterOption
      filter="SHOW_OPTY_TASKS"
      label="Open Opportunity Tasks"
    />
    <FilterOption
      filter="SHOW_UNTENDED_ACCOUNTS"
      label="Untended Accounts"
    />
  </DropdownButton>
)

export default Filters

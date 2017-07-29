import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import { DropdownMenuItem } from 'react-lightning-design-system'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  selected: ownProps.filter === state.visibilityFilter,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
})

const FilterOption = connect(
  mapStateToProps,
  mapDispatchToProps
)(DropdownMenuItem)

export default FilterOption

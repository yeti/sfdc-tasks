import { connect } from 'react-redux'
import Filters from '../components/Filters'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
})

const FilterManager = connect(
  mapStateToProps,
)(Filters)

export default FilterManager

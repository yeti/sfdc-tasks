import { connect } from 'react-redux'
import TaskList from '../components/TaskList'

const getVisibleTasks = (tasks, filter) => {
  switch (filter.filter) {
    case 'SHOW_ALL_TASKS':
      return tasks
    case 'SHOW_SALES_QUALIFIED_TASKS':
      return []
    case 'SHOW_OPTY_TASKS':
      return []
    case 'SHOW_UNTENDED_ACCOUNTS':
      return []
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  tasks: getVisibleTasks(state.allTasks, state.visibilityFilter),
  visibilityFilter: state.visibilityFilter,
})

const mapDispatchToProps = {}

const VisibleTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

export default VisibleTaskList

import { connect } from 'react-redux'
import TaskList from '../components/TaskList'

const getVisibleTasks = (tasks, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return tasks
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  tasks: getVisibleTasks(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = {}

const VisibleTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

export default VisibleTaskList

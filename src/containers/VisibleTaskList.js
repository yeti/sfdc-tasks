import { connect } from 'react-redux'
import TaskList from '../components/TaskList'
import TaskWrapper from '../utils/TaskWrapper'

/* eslint-disable */

const findUser = (users, id) => {
  return users.find(user => user.Id === id)
};

const attachUsers = (tasks, users) => {
  tasks.forEach(task => {
    task.Owner = findUser(users, task.OwnerId);
  })

  return tasks;
};

const getVisibleTasks = (tasks, filter, users) => {
  switch (filter.filter) {
    case 'SHOW_ALL_TASKS':
      return attachUsers(tasks, users);
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
  tasks: getVisibleTasks(state.allTasks, state.visibilityFilter, state.allUsers)
    .map(task => new TaskWrapper(task)),
  visibilityFilter: state.visibilityFilter,
})

const mapDispatchToProps = {}

const VisibleTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

export default VisibleTaskList

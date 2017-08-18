import { connect } from 'react-redux'
import TaskList from '../components/TaskList'
import TaskWrapper from '../utils/TaskWrapper'
import _ from 'lodash'

const findUser = (users, id) => {
  return users.find(user => user.Id === id)
};

const attachUsers = (tasks, users) => {
  tasks.forEach(task => {
    task.Owner = findUser(users, task.OwnerId);
  })

  return tasks;
};

const setupTasks = (tasks, users) => {
  return attachUsers(tasks, users)
    .map(task => new TaskWrapper(task));
};

const getVisibleTasks = (state, filter, users) => {
  switch (filter.filter) {
    case 'SHOW_ALL_TASKS':
      return setupTasks(state.allTasks, users);
    case 'SHOW_SALES_QUALIFIED_TASKS':
      return setupTasks(state.qualifiedTasks, users);
    case 'SHOW_OPTY_TASKS':
      return setupTasks(state.openOptyTasks, users);
    case 'SHOW_UNTENDED_ACCOUNTS':
      return []
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  tasks: _(getVisibleTasks(state, state.visibilityFilter, state.allUsers))
    .orderBy(['owner.name', 'dueDate.date'], ['asc', 'asc'])
    .value(),
  visibilityFilter: state.visibilityFilter,
})

const mapDispatchToProps = {}

const VisibleTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

export default VisibleTaskList

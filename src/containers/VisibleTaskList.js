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

const setupTasks = (tasks, users, sort) => {
  const augmentedUsers = attachUsers(tasks, users)
    .map(task => new TaskWrapper(task));

  return _.sortBy(augmentedUsers, sort);
};

const getVisibleTasks = (tasks, filter, users) => {
  switch (filter.filter) {
    case 'SHOW_ALL_TASKS':
      return setupTasks(tasks, users, ['owner.name', 'dueDate.date']);
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
  tasks: _.sortBy(getVisibleTasks(state.allTasks, state.visibilityFilter, state.allUsers), 'owner.name'),
  visibilityFilter: state.visibilityFilter,
})

const mapDispatchToProps = {}

const VisibleTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

export default VisibleTaskList

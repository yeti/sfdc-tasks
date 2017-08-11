import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import records from './records'
import allTasks from './allTasks'
import allUsers from './allUsers'
import hasLoaded from './hasLoaded'
import hasErrored from './hasErrored'

const taskTracker = combineReducers({
  allTasks,
  allUsers,
  hasLoaded,
  hasErrored,
  records,
  visibilityFilter,
})

export default taskTracker

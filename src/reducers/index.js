import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import records from './records'
import allTasks from './allTasks'
import hasLoaded from './hasLoaded'

const taskTracker = combineReducers({
  allTasks,
  hasLoaded,
  records,
  visibilityFilter,
})

export default taskTracker

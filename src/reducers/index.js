import { combineReducers } from 'redux'

import allTasks from './allTasks'
import allUsers from './allUsers'
import hasLoaded from './hasLoaded'
import hasErrored from './hasErrored'
import qualifiedTasks from './qualifiedTasks'
import visibilityFilter from './visibilityFilter'
import records from './records'

const taskTracker = combineReducers({
  allTasks,
  allUsers,
  hasLoaded,
  hasErrored,
  qualifiedTasks,
  records,
  visibilityFilter,
})

export default taskTracker

import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import records from './records'

const todoApp = combineReducers({
  records,
  todos,
  visibilityFilter,
})

export default todoApp

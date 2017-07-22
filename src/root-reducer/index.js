import { combineReducers } from 'redux-immutable';

export default (asyncReducers) => combineReducers({
  ...asyncReducers
})

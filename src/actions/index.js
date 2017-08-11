let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export const loadAccounts = (accounts) => ({
  type: 'LOAD_ACCOUNTS',
  accounts
})

export const loadAllTasks = (allTasks) => ({
  type: 'LOAD_ALL_TASKS',
  allTasks
})

export const loadAllUsers = (allUsers) => ({
  type: 'LOAD_ALL_USERS',
  allUsers
})

export const setHasLoaded = (hasLoaded) => ({
  type: 'SET_HAS_LOADED',
  hasLoaded
})

export const setHasErrored = (hasErrored) => ({
  type: 'SET_HAS_ERRORED',
  hasErrored
})

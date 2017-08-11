const loadRecords = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ALL_TASKS':
      return action.allTasks
    default:
      return state
  }
}

export default loadRecords

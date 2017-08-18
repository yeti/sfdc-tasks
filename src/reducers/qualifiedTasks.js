const loadRecords = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_QUALIFIED_TASKS':
      return action.qualifiedTasks
    default:
      return state
  }
}

export default loadRecords

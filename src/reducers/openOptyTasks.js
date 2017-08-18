const loadRecords = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_OPEN_OPTY_TASKS':
      return action.openOptyTasks
    default:
      return state
  }
}

export default loadRecords

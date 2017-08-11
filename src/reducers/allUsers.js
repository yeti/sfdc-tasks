const loadRecords = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ALL_USERS':
      return action.allUsers
    default:
      return state
  }
}

export default loadRecords

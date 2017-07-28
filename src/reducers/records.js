const loadRecords = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ACCOUNTS':
      return {
        accounts: action.accounts,
      }
    default:
      return state
  }
}

export default loadRecords

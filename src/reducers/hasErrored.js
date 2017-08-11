const hasErrored = (state = false, action) => {
  switch (action.type) {
    case 'SET_HAS_ERRORED':
      return action.hasErrored
    default:
      return state
  }
}

export default hasErrored

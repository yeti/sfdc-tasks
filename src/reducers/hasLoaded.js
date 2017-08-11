const hasLoaded = (state = false, action) => {
  switch (action.type) {
    case 'SET_HAS_LOADED':
      return action.hasLoaded
    default:
      return state
  }
}

export default hasLoaded

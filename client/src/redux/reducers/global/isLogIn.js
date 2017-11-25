const isLogIn = (state = false, action) => {
  if (action.type === 'IS_LOG_IN') {
      return !state;
  }
  return state;
}

export default isLogIn;
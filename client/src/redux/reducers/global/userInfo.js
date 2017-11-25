const currentUser = {
  id:'',
  email:'',
  firstname:'',
  lastname:'',
  amount:0
}

const currentUserReducer = (state = currentUser , action) => {
  if(action.type === 'LOG_IN') {
    const {id , email , firstname , lastname , amount} = action;
    return {id , email , firstname , lastname , amount: +amount};
  }
  if(action.type === 'LOG_OUT') {
    return {...currentUser};
  }
  if(action.type === 'UPDATE_AMOUNT'){
    const {amount} = action;
    return {...state , amount}
  }
  return state;
}

export default currentUserReducer;
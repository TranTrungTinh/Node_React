const tranfers = [];

const allTranfers = (state = tranfers , action) => {
  if(action.type === 'ADD_TRANFERS'){
    const {nameSend, nameReceive, money} = action;
    const tranfer = {id: state.length + 1 , nameSend, nameReceive, money};
    return state.concat(tranfer);
  }
  if(action.type === 'CLEAR_TRANFERS'){
    return tranfers;
  }
  return state;
}

export default allTranfers;
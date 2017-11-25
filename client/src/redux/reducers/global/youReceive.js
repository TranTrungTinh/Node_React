const receives = [];

const historyReceiveMoney = (state = receives , action) => {
  if(action.type === 'RECEIVE_HISTORY') {
    const {nameSend, nameReceive, money} = action;
    const receive = {id: state.length + 1 , nameSend, nameReceive, money};
    return state.concat(receive);
  }
  if(action.type === 'CLEAR_RECEIVE_HISTORY'){
    return receives;
  }
  return state;
}

export default historyReceiveMoney;
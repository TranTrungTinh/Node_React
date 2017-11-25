const sends = [];

const historySendMoney = (state = sends , action) => {
  if(action.type === 'SEND_HISTORY') {
    const {nameSend, nameReceive, money} = action;
    const send = {id: state.length + 1 , nameSend, nameReceive, money};
    return state.concat(send);
  }
  if(action.type === 'CLEAR_SEND_HISTORY'){
    return sends;
  }
  return state;
}

export default historySendMoney;
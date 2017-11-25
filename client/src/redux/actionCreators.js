export function login(id , email , firstname , lastname , amount){
  return { type: 'LOG_IN' , id , email, firstname , lastname , amount };
} 
export function logout() {
  return { type: 'LOG_OUT' };
}
export function islogin() {
  return { type: 'IS_LOG_IN'};
}
export function updateAmount(amount) {
  return { type: 'UPDATE_AMOUNT' , amount};
}
export function addTranfers(nameSend, nameReceive, money) {
  return { type: 'ADD_TRANFERS' , nameSend, nameReceive, money};
}
export function clearTranfers(){
  return {type: 'CLEAR_TRANFERS'};
}
export function addSendHistory(nameSend, nameReceive, money) {
  return { type: 'SEND_HISTORY' , nameSend, nameReceive, money};  
}
export function clearSendHistory(){
  return {type: 'CLEAR_SEND_HISTORY'};
}
export function addReceiveHistory(nameSend, nameReceive, money) {
  return { type: 'RECEIVE_HISTORY' , nameSend, nameReceive, money};  
}
export function clearReceiveHistory(){
  return {type: 'CLEAR_RECEIVE_HISTORY'};
}
import {combineReducers } from 'redux';
// Globle state
import currentUserReducer from './global/userInfo';
import isLogInReducer from './global/isLogIn';
import tranfersReducer from './global/allTranfer';
import sendsReducer from './global/youSend';
import receivesReducer from './global/youReceive';

const reducer = combineReducers({
  currentUser: currentUserReducer , 
  isLogIn: isLogInReducer,
  tranfers: tranfersReducer,
  sends: sendsReducer,
  receives: receivesReducer
});
export default reducer;
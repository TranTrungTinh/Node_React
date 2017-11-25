const {initializeApp , database} = require('firebase');
const config = {
  apiKey: "AIzaSyDXi5WI9AxqFkSpQuPr3P6fN0bY6ON5NQI",
  authDomain: "bitcoinnet-a994a.firebaseapp.com",
  databaseURL: "https://bitcoinnet-a994a.firebaseio.com",
  projectId: "bitcoinnet-a994a",
  storageBucket: "bitcoinnet-a994a.appspot.com",
  messagingSenderId: "41537362086"
};
initializeApp(config);
module.exports = database();
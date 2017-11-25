const {hash , compare} = require('bcryptjs');
const db = require('./fbConfig');

class User {
  static async signUp(firstname , lastname , email , rawPassword) {
    const users = await db.ref('users').once('value');
    users.forEach(e => {
      if(e.val().email == email) throw new Error('Email was registered. Please enter another email');
    });
    const password = await hash(rawPassword , 8);
    if(!password) throw new Error('FAIL');
    db.ref('users').push({firstname , lastname , email , password , amount: 1000});
    return;
  }

  static async signIn(email , rawPassword) {
    const users = await db.ref('users').once('value');
    let user = null;
    users.forEach(e => {
      const data = {...e.val() , id: e.key};
      if(data.email == email){
        user = data;
        return;
      }
    });
    if(!user) throw new Error('Invalid Email');
    const {password , firstname , id , lastname , amount} = user;
    const same = await compare(rawPassword , password);
    if(!same) throw new Error('Wrong password');
    return {id, email, firstname, lastname, amount};
  }

  static async tranfer(id , emailReceive , amount , balance) {
    // B1. Kiem tra email gui
    let userReceive = null;
    const users = await db.ref('users').once('value');
    users.forEach(e => {
      const data = {...e.val() , id: e.key};
      if(data.email == emailReceive){
        userReceive = data;
        return;
      }
    })
    if(!userReceive) throw new Error('Invalid Email');
    if(userReceive.id == id) throw new Error('Enter Another Email');

    // B2: Tinh toan so du
    const newAmountSend = amount - balance;
    const newAmountReceive = +userReceive.amount + +balance;
    //B3: Update database
    db.ref(`users/${id}`).update({amount:  newAmountSend});
    db.ref(`users/${userReceive.id}`).update({amount:  newAmountReceive});

    //B4: Update tranfer
    const userSend = await db.ref(`users/${id}`).once('value');
    const {firstname , lastname} = userSend.val();
    const tranfer = {
      id,
      firstname,
      lastname,
      balance,
      receive: userReceive
    };
    db.ref('tranfers').push(tranfer);
    return;
  }
  static async getAmountBy(id) {
    const user = await db.ref(`users/${id}`).once('value');
    const {amount} = user.val();
    return amount;
  }
  static async getTranfers() {
    const data = [];
    const tranfers = await db.ref('tranfers').once('value');
    tranfers.forEach(e => {
      const {firstname , balance} = e.val();
      const content = {
        nameSend: firstname, 
        nameReceive: e.val().receive.firstname, 
        money: balance
      };
      data.push(content);
    });
    return data;
  }
  static async history(id) {
    const arrYouSend = [];
    const arrYouReceive = [];

    const oneData = await db.ref('tranfers').once('value');
    oneData.forEach(e => {
      if(e.val().id == id){
        const {firstname , balance} = e.val();
        const content = {
          nameSend: firstname, 
          nameReceive: e.val().receive.firstname, 
          money: balance
        };
        arrYouSend.push(content);
      }
    });
    const twoData = await db.ref('tranfers').once('value');
    twoData.forEach(e => {
      if(e.val().receive.id == id){
        const {firstname , balance} = e.val();
        const content = {
          nameSend: firstname, 
          nameReceive: e.val().receive.firstname, 
          money: balance
        };
        arrYouReceive.push(content);
      }
    });
    return {send: arrYouSend , receive: arrYouReceive};
  }
}




module.exports = User;
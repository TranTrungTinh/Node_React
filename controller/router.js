const router = require('express').Router();
// const parser = require('body-parser').urlencoded({extended: false});
const jsonParser = require('body-parser').json();

// class
const User = require('../model/User');

// signup 
router.post('/signup' , jsonParser , (req , res) => {
  const {firstname , lastname , email , password} = req.body;
  
  User.signUp(firstname , lastname , email , password)
  .then(() => res.send({message: 'OK'}))
  .catch(err => res.send({error: err.message}));
});

// login
router.post('/signin' , jsonParser , (req , res) => {
  const {email , password} = req.body;
  User.signIn(email , password)
  .then(user => res.send({message:"OK" , user}))
  .catch(err => res.send({error: err.message}));
});

// tranfer
router.post('/tranfer' , jsonParser , (req , res) => {
  const {id , email , amount , balance} = req.body;
  User.tranfer(id, email, amount, balance)
  .then(() => res.send({message: "OK"}))
  .catch(err => res.send({error: err.message}));
});

router.post('/amount' , jsonParser , (req , res) => {
  const {id} = req.body;
  User.getAmountBy(id)
  .then(amount => res.send({message: "OK" , amount}))
  .catch(err => res.send({error: err.message}));  
});

router.get('/tranfers' , (req , res) => {
  User.getTranfers()
  .then(tranfers => res.send({message:"OK" , tranfers}))
  .catch(err => res.send({error: err.message}));
});

router.post('/history', jsonParser , (req , res) => {
  const {id} = req.body;
  User.history(id)
  .then(histories => res.send({message: "OK" , histories}))
  .catch(err => res.send({error: err.message}));
});






module.exports = router;
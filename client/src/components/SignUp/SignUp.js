import React, { Component } from 'react';
import './SignUp.css';

import {Redirect} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

export default class SignUp extends Component {
  state = {
    isSignUp: false
  }
 
  handleAddWallet = () => {
    const {fname , lname , mail , pass} = this.refs;

    const firstname = fname.value || '';
    const lastname = lname.value || '';
    const email = mail.value || '';
    const password = pass.value || '';
    if(!firstname || !lastname || !email || !password) 
      return swal('FAIL','Vui lòng nhập đầy đủ các trường','warning');
    const data = {firstname , lastname , email , password};
    axios.post('/api/signup' , data)
    .then(resp => {
      if(resp.data.error) return swal('ERROR',`${resp.data.error}`,'error');
      swal('SUCCESS','Đăng ký thành công','success')
      .then(() => this.setState({isSignUp: true}));
    })
    .catch(err => swal('ERROR',`${err.message}`,'error'));
  }

  render() {
    const {isSignUp} = this.state
    let goSignInJSX = isSignUp ? <Redirect to="/signin"/> : null;
    return (
    <div className="row">
      {goSignInJSX}
      <h4>Create a New Wallet</h4>
      <div className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input type="text" className="validate" ref="fname"/>
            <label>First Name</label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">account_box</i>
            <input type="text" className="validate" ref="lname"/>
            <label>Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">email</i>
            <input type="email" className="validate" ref="mail"/>
            <label>Email</label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">lock</i>
            <input type="password" className="validate" ref="pass"/>
            <label>Password</label>
          </div>
          
        </div>
        <button className="btn waves-effect waves-light right"
        onClick={this.handleAddWallet}
        >
          Add Wallet
          <i className="material-icons right">add_circle</i>
        </button> 
      </div>
    </div>
    );
  }
}
import React, { Component } from 'react';
import './SignIn.css';

import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actionCreators';

import swal from 'sweetalert';
import axios from 'axios';

class SignIn extends Component {

  handleSignIn = () => {
    const email = this.refs.email.value || '';
    const password = this.refs.password.value || '';
    if(!email || !password) return swal('FAIL','Vui lòng nhập đầy đủ email và password','warning');
    axios.post('/api/signin' , {email , password})
    .then(resp => {
      if(resp.data.error) return swal('FAIL',`${resp.data.error}`,'error');
      const {id , firstname , lastname , amount} = resp.data.user;
      this.props.login(id , email , firstname , lastname , amount);
      this.props.islogin(); 
    })
    .catch(err => swal('FAIL',`${err.message}`,'error'));
  }

  render() {
    const {isLogIn} = this.props;
    let redirect = isLogIn ? <Redirect to="/info" /> : null;
    return (
      <div className="row" id="signin">
        {redirect}
        <h4>SignIn</h4>
        <div className="input-field">
          <i className="material-icons prefix">email</i>
          <input type="email" className="validate" ref="email"/>
          <label>Email</label>
        </div>
        <div className="input-field">
          <i className="material-icons prefix">lock</i>
          <input type="password" className="validate" ref="password"/>
          <label>Password</label>
        </div>
        
        <button className="btn waves-effect waves-light center red"
          onClick={this.handleSignIn}
        > sign in
          <i className="material-icons right">send</i>
        </button>
    </div>
    );
  }
}

const mapStateToProps = state => ({isLogIn: state.isLogIn});
export default connect(mapStateToProps , actionCreators)(SignIn);
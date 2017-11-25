import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './UserInfo.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actionCreators';

import {Redirect} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

import YouSend from './YouSend';
import YouReceive from './YouReceive';

class UserInfo extends Component {

  handleLogOut = () => {
    swal({
      title: "WARNING?",
      text: "Bạn sẽ đăng xuất ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(yes => {
      if (yes) {
        this.props.logout();
        this.props.islogin();
      }
    });
  }
  render() {
    let redirect = null;
    if(!this.props.isLogIn) {
      redirect = <Redirect to="/signin" />;
    }
    const {firstname , lastname , amount} = this.props.currentUser;
    const userinfo = (
    <div className="chip">
      <img src="./resources/profile.jpg" alt="Current User"/>
      {lastname} {firstname} - {amount}$
    </div>);
    const load = (
    <div className="progress">
      <div className="indeterminate"></div>
    </div>);
    const {sends , receives} = this.props;
    let loadingsendJSX = sends[0] ? null : load;
    let loadingreceiveJSX = receives[0] ? null : load;
    return (
    <div className="wrapper_content">
      {redirect}
      {userinfo}
      <button 
        className="btn waves-effect waves-light right"
        onClick={this.handleLogOut}
      >Log out</button>
      <div className="row">
        <div className="another_send col s6">
          <h5>TRANFERS MONEY</h5>
          {loadingsendJSX}
          <ul className="collection">
            { sends.map(e => <YouSend key={e.id} {...e}/>) }
          </ul>
        </div>
        <div className="you_send col s6">
          <h5>RECEIVES MONEY</h5>
          {loadingreceiveJSX}
          <ul className="collection">
            { receives.map(e => <YouReceive key={e.id} {...e}/>) }
          </ul>
        </div>
      </div>
      <Link 
        className="btn-floating btn-large waves-effect waves-light red right"
        to="/send">
        <i className="material-icons">send</i>
      </Link>
    </div>
    );
  }
  componentWillMount(){
    const {id} = this.props.currentUser;    
    this.props.clearSendHistory();
    this.props.clearReceiveHistory();
    axios.post('/api/amount' , { id })
    .then(resp => {
      if(resp.data.message){
        const {amount} = resp.data;
        this.props.updateAmount(amount);
      }
    })
  }

  componentDidMount(){
    const {id} = this.props.currentUser;
    axios.post('/api/history' , { id })
    .then(resp => {
      if(resp.data.message) {
        const {send , receive} = resp.data.histories;
        setTimeout(() => {
          send.forEach(e => {
            const {nameSend, nameReceive, money} = e;
            this.props.addSendHistory(nameSend, nameReceive, money);
          });
          receive.forEach(e => {
            const {nameSend, nameReceive, money} = e;
            this.props.addReceiveHistory(nameSend, nameReceive, money);
          });
        }, 3000);
      }
    })
    .catch(err => console.log(err.message));
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  isLogIn: state.isLogIn,
  sends: state.sends,
  receives: state.receives
});
export default connect(mapStateToProps , actionCreators)(UserInfo);
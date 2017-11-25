import React, { Component } from 'react';
import './SendMoney.css';

import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
// import * as actionCreators from '../../redux/actionCreators';
import axios from 'axios';
import swal from 'sweetalert';

class SendMoney extends Component {

  state = {
    isSend: false
  }

  handleSendMoney = () => {
    const {id , amount} = this.props.currentUser;

    const email = this.refs.email.value || '';
    const balance = this.refs.balance.value || '';
    if(!email || !balance) return swal('FAIL','Vui lòng nhập đầy đủ email và password','warning');
    if(+balance > +amount) return swal('FAIL','Số tiền không đủ để thực hiện giao dịch','warning');
    
    axios.post('/api/tranfer' , {id , email , amount , balance})
    .then(resp => {
      if(resp.data.error) return swal('ERROR',resp.data.error,'error');
      swal('SUCCESS','Giao dịch thành công','success')
      .then(() => this.setState({isSend: true}));
    })
    .catch(err => swal('ERROR',err.message,'error'));
  }

  render() {
    let redirect = null;
    if(this.state.isSend) {
      redirect = <Redirect to="/info"/>
    }
    return (
    <div className="row" id="send">
      {redirect}
      <h4>Send Money</h4>
      <div className="input-field">
        <i className="material-icons prefix">verified_user</i>
        <input type="email" className="validate" ref="email"/>
        <label>Enter an email address of receive</label>
      </div>
      <div className="input-field">
        <i className="material-icons prefix">attach_money</i>
        <input type="number" className="validate" ref="balance"/>
        <label>Amount you want to send</label>
      </div>
      <button 
        className="btn waves-effect waves-light center red"
        onClick={this.handleSendMoney}
      > send
        <i className="material-icons right">send</i>
      </button>
    </div>
    );
  }
}

const mapStateToProps = state => ({currentUser: state.currentUser});

export default connect(mapStateToProps)(SendMoney);
import React, { Component } from 'react';
import './Home.css';

import {connect} from 'react-redux';
import * as actionCreators from '../../redux/actionCreators';
import axios from 'axios';
import HomeContent from './HomeContent';

class Home extends Component {
  render() {
    const load = (
    <div className="preloader-wrapper big active">
      <div className="spinner-layer spinner-red-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
    );
    const {tranfers} = this.props;
    const loadingJSX = tranfers[0] ? null : load;
    return (
    <div className="wrapper_container">
      <div className="total">
        <p>TOTAL TRANSACTIONS <span>{tranfers.length}</span></p>
        {loadingJSX}        
      </div>
      <div className="wrapper_tranfers">
        <ul className="collection">
          { tranfers.map(e => <HomeContent key={e.id} {...e}/>) }
        </ul>
      </div>
    </div>
    )
  }
  componentWillMount(){
    this.props.clearTranfers();
  }
  componentDidMount(){
    axios.get('/api/tranfers')
    .then(resp => {
      if(resp.data.message){
        setTimeout(() => {
          const {tranfers} = resp.data;
          tranfers.forEach(e => {
            const {nameSend, nameReceive, money} = e;
            this.props.addTranfers(nameSend, nameReceive, money);
          });
        },3000);
      }
    })
    .catch(err => console.log(err.message));
  }
}
const mapStateToProps = state => ({tranfers: state.tranfers});

export default connect(mapStateToProps , actionCreators)(Home);
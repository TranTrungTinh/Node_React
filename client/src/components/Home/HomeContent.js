import React, { Component } from 'react';

export default class HomeContent extends Component {
  render() {
    const {nameSend, nameReceive, money} = this.props;
    return (
      <li className="collection-item avatar">
        <i className="material-icons circle red"
          style={{margin: "10px 0px"}}
        >assessment</i>
        <p 
          style={{fontSize: "24px", padding: "18px 0px" , color: "#2c3e50"}}
        >{nameSend} has sent {nameReceive} 
          <span style={{color: "#2ecc71" , fontWeight: "500"}}> {money} </span>$
        </p>
      </li>
    );
  }
}
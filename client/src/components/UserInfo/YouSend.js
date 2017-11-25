import React, { Component } from 'react';

export default class YouSend extends Component {
  render() {
    const {nameReceive , money} = this.props;
    return (
    <li className="collection-item avatar">
      <i className="material-icons circle orange"
        style={{margin: "10px 0px"}}
      >redeem</i>
      <p
      style={{fontSize: "24px", padding: "18px 0px" , color: "#7f8c8d"}}
      >You has sent<span
        style={{color: "#3498db" , fontWeight: "500"}}
      > {money}</span>$ to {nameReceive}</p>
    </li>
    );
  }
}
import React, { Component } from 'react';
export default class YouReceive extends Component {
  render() {
    const {nameSend , money} = this.props;    
    return (
    <li className="collection-item avatar">
      <i className="material-icons circle lime"
        style={{margin: "10px 0px"}}
      >near_me</i>
      <p 
        style={{fontSize: "24px", padding: "18px 0px" , color: "#7f8c8d"}}
      >{nameSend} has sent<span
        style={{color: "#3498db" , fontWeight: "500"}}
      > {money}</span>$ for You</p>
    </li>
    );
  }
}
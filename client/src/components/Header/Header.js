// import library
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';
// import * as actionCreators from '../../redux/actionCreators';

// import swal from 'sweetalert';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="left brand-logo">
            <img src="./resources/logo.png" alt="" />
          </Link>
          <ul className="right">
            <li>
              <Link to="/info">Personal</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

// const mapStateToProps = state => ({isLogIn: state.isLogIn});
export default Header;
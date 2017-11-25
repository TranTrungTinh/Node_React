// import library
import React, { Component } from 'react';
import {BrowserRouter , Switch , Route} from 'react-router-dom';
// css
import './App.css';

// import my components
import Header from "../components/Header/Header";
import SignUp from "../components/SignUp/SignUp";
import SignIn from "../components/SignIn/SignIn";
import Home from '../components/Home/Home';
import UserInfo from '../components/UserInfo/UserInfo';
import SendMoney from '../components/SendMoney/SendMoney';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/send" component={SendMoney} />
              <Route path="/info" component={UserInfo} />
            </Switch>
        </div>
      </BrowserRouter>
    
    );
  }
}

export default App;

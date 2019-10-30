import React from 'react';
//import { SignIn, Register } from './FormPage';
import Header from './Header';

class Account extends React.Component{
  // userIsLoggedIn should be defaulted to "false", "true" for debugging
  state = {
    userName: "Guest",
    userIsLoggedIn: true
  }

  userLogIn(email, password){
    this.setState({userIsLoggedIn: true});
    console.log(this.props);
  }

  render(){
    return <Header
              userIsLoggedIn={this.state.userIsLoggedIn}
              userName={this.state.userName}/>
  }

}
export default Account;

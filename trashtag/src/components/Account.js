import React from 'react';
//import { SignIn, Register } from './FormPage';
import Header from './Header';

class Account extends React.Component{
  // userIsLoggedIn should be defaulted to "false", "true" for debugging
  state = {
    userEmail: "",
    userIsLoggedIn: false
  }

  userLogIn(email, password){
    this.setState({userIsLoggedIn: true});
    console.log(this.props);
  }

  render(){
    return <Header userIsLoggedIn={this.state.userIsLoggedIn}/>
  }

}
export default Account;

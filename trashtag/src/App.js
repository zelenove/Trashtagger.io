import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import './assets/css/default.css';
import Home from './components/Home';
import Header from './components/Header';
import TrashMapPage from './components/TrashMapPage';
import { SignIn, Register } from './components/FormPage';
//import AccountManager from './components/AccountManager';
import CreateRequest from "./components/CreateRequest";
import Cleanups from "./components/Cleanups";
import Profile from "./components/Profile";

class App extends React.Component{
  constructor(){
    super();
    this.state={
      userName: "Guest",
      userIsLoggedIn: false,
      credentials: [["Guest", "123"]]
    }
  }

  userLogIn(email, password){
    for(let i = 0; i < this.state.credentials.length; i++){
      if(this.state.credentials[i][0] === email && this.state.credentials[i][1] === password){
        this.setState({userIsLoggedIn: true, userName: email});
        return true;
      }
    }
    console.log(email, password);
  }

  userSignUp(email, password){
    let allowSignUp = true;
    for(let i = 0; i < this.state.credentials.length; i++){
      if (this.state.credentials[i][0] === email){
        allowSignUp = false;
        return false;
      }
    }
    if(allowSignUp){
      let newStateArray = this.state.credentials
      newStateArray.push([email, password])
      this.setState({credentials: newStateArray})
      console.log(this.state.credentials);
      return true;
    }
  }

  render(){
    return (
      <div className="App">
          <Router>
              <Header userIsLoggedIn={this.state.userIsLoggedIn}
                      userName={this.state.userName}/>
              <div className = "page-container">
                <Route exact path = "/" component = {Home} />
                <Route exact path = "/trash-map" component = {TrashMapPage} />
                <Route exact path = "/register" render = {(props) => <Register signUpCallback={this.userSignUp.bind(this)} />} />
                <Route exact path = "/sign-in" render = {(props) => <SignIn signInCallback={this.userLogIn.bind(this)} />} />
                <Route exact path = "/create-request" component = {CreateRequest} />
                <Route exact path = "/cleanups" component = {Cleanups} />
                <Route exact path = "/profile" component = {Profile} />
              </div>
          </Router>
      </div>
    );
  }
}

export default App;

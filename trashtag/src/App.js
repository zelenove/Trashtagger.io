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
import axios from "axios";

// Configure axios
import "./config/axios";

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      userName: "Guest",
      userIsLoggedIn: false,
      userErrorMessage: ""
    }
  }

  userLogIn(email, password) {
    axios.post("/users/login", {
      email: email,
      password: password
    })
    .then((user) => {
      // Successfully logged in
      this.setState({
        userIsLoggedIn: true,
        userName: user.email
      })
    })
    .catch((error) => {
      // Server errors
      if (error.status === 500) {
        // Not sure what to do for now
      }
      else {
        // Log in errors, could display an alert for them
        this.setState({
          userErrorMessage: error.message
        })
      }
    })
  }

  userSignUp(email, password) {
    axios.post("/users/register", {
      email: email,
      password: password
    })
    .then((user) => {
      // Successfully logged in
      this.setState({
        userIsLoggedIn: true,
        userName: user.email
      })
    })
    .catch((error) => {
      // Server errors
      if (error.status === 500) {
        // Not sure what to do for now
      }
      else {
        // Log in errors, could display an alert for them
        this.setState({
          userErrorMessage: error.message
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
          <Router>
              <Header userIsLoggedIn={this.state.userIsLoggedIn}
                      userName={this.state.userName}/>
              <div className = "page-container">
                <Route exact path = "/" component = {Home} />
                <Route exact path = "/trash-map" component = {TrashMapPage} />
                <Route exact path = "/register" render = {(props) => <Register signUpCallback={this.userSignUp.bind(this)}
                                                                        errorMessage={this.state.userErrorMessage}
                                                                        loggedIn={this.state.userIsLoggedIn} />} />
                <Route exact path = "/sign-in" render = {(props) => <SignIn signInCallback={this.userLogIn.bind(this)}
                                                                        errorMessage={this.state.userErrorMessage}
                                                                        loggedIn={this.state.userIsLoggedIn} />} />
                <Route exact path = "/create-request" component = {CreateRequest} />
                <Route exact path = "/cleanups" component = {Cleanups} />
                <Route exact path = "/profile" render = {(props) => <Profile userName={this.state.userName} />} />
              </div>
          </Router>
      </div>
    );
  }
}

export default App;

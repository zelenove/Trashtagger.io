import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './assets/css/default.css';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import TrashMapPage from './components/TrashMapPage';
import { SignIn, Register } from './components/FormPage';
//import AccountManager from './components/AccountManager';
import CreateRequest from "./components/CreateRequest";
import Cleanups from "./components/Cleanups";
import Profile from "./components/Profile";
import { ProfilePage } from "./components/ProfilePage";
import Logout from "./components/Logout"

// Configure axios
import "./config/axios";
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: "Guest"
      },
      userIsLoggedIn: false,
      userErrorMessage: ""
    }
  }

  onLogIn = (response) => {
    // Successfully logged in
    this.setState({
      userIsLoggedIn: true,
      user: response.data.user
    })
  }

  onLogOut = () => {
    this.setState({
      userIsLoggedIn: false,
      user: {
        username: "Guest"
      }
    })
  }

  updateUser = () => {
    // Check if the user has an active session running
    axios.get("/auth")
      .then((response) => {
        // A session already exists
        this.onLogIn(response)
      })
      .catch((error) => {
        // Nothing needs to be done if not authorized
      })
  }

  componentDidMount() {
    this.updateUser()
  }

  render() {
    return (
      <div className="App">
          <Router>
              <Header userIsLoggedIn={this.state.userIsLoggedIn}
                      userName={this.state.user.username}/>
              <div className = "page-container">
                <Switch>
                  <Route exact path = "/" component = {Home} />
                  <Route exact path = "/trash-map" render = {(props) => <TrashMapPage updateUser={this.updateUser} />} />
                  <Route exact path = "/register" render = {(props) => <Register loginCallback={this.onLogIn}
                                                                          loggedIn={this.state.userIsLoggedIn} />} />
                  <Route exact path = "/sign-in" render = {(props) => <SignIn loginCallback={this.onLogIn}
                                                                          loggedIn={this.state.userIsLoggedIn} />} />
                  <Route exact path = "/create-request" render = {(props) => <CreateRequest updateUser={this.updateUser} />} />
                  <Route exact path = "/cleanups" component = {Cleanups} />
                  <Route path = "/profile" render = {(props) => <Profile user={this.state.user}
                                                                          updateUser={this.updateUser} />} />
                  <Route exact path = "/logout" render = {(props) => <Logout onLogOut={this.onLogOut} />} />
                  <Route path = "/user/:username" component = {ProfilePage} />
                  <Route path="*" render = {(props) => <Redirect to="/" />} />
                </Switch>
              </div>
              <Footer />
          </Router>
      </div>
    );
  }
}

export default App;

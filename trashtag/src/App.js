import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import './assets/css/default.css';
import Home from './components/Home';
//import Header from './components/Header';
import TrashMapPage from './components/TrashMapPage';
import { SignIn, Register } from './components/FormPage';
import AccountManager from './components/AccountManager';
import CreateRequest from "./components/CreateRequest";

function App() {
  return (
    <div className="App">
        <Router>
            <AccountManager />
            <div className = "page-container">
              <Route exact path = "/" component = {Home} />
              <Route exact path = "/trash-map" component = {TrashMapPage} />
              <Route exact path = "/register" component = {Register} />
              <Route exact path = "/sign-in" component = {SignIn} />
              <Route exact path = "/create-request" component = {CreateRequest} />
            </div>
        </Router>
    </div>
  );
}

export default App;

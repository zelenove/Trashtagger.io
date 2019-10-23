import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './assets/css/default.css';
import Home from './components/Home';
import Header from './components/Header';
import TrashMap from './components/TrashMap';
import { SignIn, Register } from './components/FormPage';

function App() {
  return (
    <div className="App">
        <Router>
            <Header />
            <Route exact path = "/" component = {Home} />
            <Route exact path = "/trash-map" component = {TrashMap} />
            <Route exact path = "/register" component = {Register} />
            <Route exact path = "/sign-in" component = {SignIn} />
        </Router>
    </div>
  );
}

export default App;

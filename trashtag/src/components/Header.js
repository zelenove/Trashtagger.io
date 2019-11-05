import React from 'react';
import { Link } from "react-router-dom";

import logo from "../assets/images/logo.png";


class Logo extends React.Component {
  render() {
    return (
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo"></img>
        </Link>
      </div>
    );
  }
}

class NavItems extends React.Component {
  generateNavBar() {
    if (this.props.userIsLoggedIn) {
      return (
        <React.Fragment>
          <li className="first">
            <h3 className="user-header-text">Welcome, {this.props.userName}</h3>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cleanups">Cleanups</Link>
          </li>
          <li>
            <Link to="/trash-map">Trash Map</Link>
          </li>
          <li>
            <Link to="/create-request">Create Request</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <li className="first">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cleanups">Cleanups</Link>
          </li>
          <li>
            <Link to="/trash-map">Trash Map</Link>
          </li>
          <li>
            <Link to={{pathname:"/sign-in"}}>Sign In</Link>

          </li>
          <li className="last">
            <Link to={{pathname:"/register"}}>Register</Link>
          </li>
        </React.Fragment>
      );
    }
  }

  render() {
    var listItems = this.generateNavBar();
    return (
      <nav>
        <ul>
          {listItems}
        </ul>
      </nav>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <header>
        <Logo />
        <NavItems userIsLoggedIn={this.props.userIsLoggedIn}
                  userName={this.props.userName}
                  />
      </header>
    );
  }
}

export default Header;

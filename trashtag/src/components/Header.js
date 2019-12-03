import React from 'react';
import { Link, withRouter } from "react-router-dom";

import logo from "../assets/images/logo2.png";


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
            <h3 className="user-header-text">Welcome {this.props.userName}</h3>
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
          <li>
            <Link to="/logout">Logout</Link>
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
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li className="last">
            <Link to="/register">Register</Link>
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
    const shouldTransparent = this.props.location.pathname === "/" ? "transparent" : null;
    const headerClass = "header-text" + " " + shouldTransparent
    return (
      <header className={shouldTransparent}>
        <Logo/>
        <NavItems userIsLoggedIn={this.props.userIsLoggedIn}
                  userName={this.props.userName}
                  />
      </header>
    );
  }
}

export default withRouter(Header);

import React from 'react';
import {Link} from "react-router-dom";

import logo from "../assets/images/logo.png";

class Logo extends React.Component {
  render() {
    return (
      <a href = "/" className = "logo">
        <img src = {logo} alt = ""></img>
      </a>
    );
  }
}

class NavItems extends React.Component {
  render() {
    return (
      <nav>
      <ul>
        <li className = "first">
          <Link to = "/">Home</Link>
        </li>
        <li>
          <Link to = "/sign-in">Sign In</Link>
        </li>
        <li className="last">
          <Link to = "/register">Register</Link>
        </li>
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
        <NavItems />
      </header>
    );
  }
}

export default Header;
import React from 'react';
import {Link} from "react-router-dom";

import logo from "../assets/images/logo.png";

class Logo extends React.Component {
  render() {
    return (
        <div className="logo-container">
            <Link to = "/">
                <img className = "logo" src = {logo} alt = "Logo"></img>
            </Link>
        </div>
    );
  }
}

class NavItems extends React.Component {
  generateNavBar(){
    if(this.props.userIsLoggedIn){
      return (
        <React.Fragment>
          <li className = "first">
            <Link to = "/">Home</Link>
          </li>
          <li>
            <Link to = "/trash-map">Trash Map</Link>
          </li>
          <li>
            <h3 style={{color: "white"}}>Welcome {this.props.userName}</h3>
          </li>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <li className = "first">
            <Link to = "/">Home</Link>
          </li>
          <li>
            <Link to = "/trash-map">Trash Map</Link>
          </li>
          <li>
            <Link to = "/sign-in">Sign In</Link>
          </li>
          <li className="last">
          <Link to = "/register">Register</Link>
          </li>
        </React.Fragment>
    );
    }
  }

  render() {
    var listItems = this.generateNavBar();
    return(
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
                  userName={this.props.userName}/>
      </header>
    );
  }
}

export default Header;

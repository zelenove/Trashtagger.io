import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <section id = "home" className = "hero full-page">
        <div className = "hero-block">
          <h1 className = "hero-text text-white">
            Clean Up Your Community
          </h1>
        <button
            className = "hero-button button-transparent button-border-white">
            Learn More
        </button>
        </div>
      </section>
    );
  }
}

export default Home;
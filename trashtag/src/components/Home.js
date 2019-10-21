import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <section id = "home" className = "page hero full-page">
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
import React from 'react';
import { Link } from 'react-router-dom';

import tt1 from "../assets/images/uploads/tt1.jpg";
import tt2 from "../assets/images/uploads/tt2.jpg";
import tt3 from "../assets/images/uploads/tt3.jpg";

class Home extends React.Component {
  render() {
    const numPics = 3;

    // Would get the numPics most trending pictures here
    const pics = [["Woodbine Beach", tt1],
                  ["Brent National Park", tt2],
                  ["Kensley Lake", tt3]]

    const picRows = pics.map((picRow) => {
      const name = picRow[0];
      const pic = picRow[1];

      return (
        <div key = {pic} className = "trending-block">
          <h1>{name}</h1>
          <Link to = "/">
            <img className = "trending-img" src = {pic} alt={name}></img>
          </Link>
        </div>
      );
    });

    return (
      <div>
        <section id = "home" className = "page hero full-page">
          <div className = "hero-block">
            <h1 className = "hero-text text-white">
              Clean Up Your Community
            </h1>
          <button
              className = "hero-button button-transparent button-border-lg">
              Learn More
          </button>
          </div>
        </section>
        <div className = "trending-container">
          <h1 className = "trending-heading">Trending This Week</h1>
          {picRows}
        </div>
      </div>
    );
  }
}

export default Home;
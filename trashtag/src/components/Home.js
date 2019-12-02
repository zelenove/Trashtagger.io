import React from 'react';
import { Link } from 'react-router-dom';
import ScrollMenu from "react-horizontal-scrolling-menu";

import homeHero from "../assets/images/hero-home.jpg";

import tt1 from "../assets/images/uploads/tt1.jpg";
import tt2 from "../assets/images/uploads/tt2.jpg";
import tt3 from "../assets/images/uploads/tt3.jpg";

const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};
const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const MenuItem = ({img, selected}) => {
  return <div
    className={`menu-item ${selected ? 'active' : ''}`}
    ><img src={img} /></div>;
};

export const Menu = (list, selected) =>
  list.map(el => {
    const {name, img} = el;

    return <MenuItem img={img} key={name} selected={selected} />;
  });


class Home extends React.Component {
  render() {
    const numPics = 3;


    // Would get the numPics most trending pictures here
    const pics = [["Woodbine Beach", tt1],
                  ["Brent National Park", tt2],
                  ["Kensley Lake", tt3]]

    const pics2 = [{name: "Woodbine Beach", img: tt1},
                    {name: "Brent National Park", img: tt2},
                    {name: "Kensley Lake", img: tt3}];
    let selected = "Woodbine Beach";

    const menuItems = Menu(pics2, selected);

    const picRows = pics.map((picRow) => {
      const name = picRow[0];
      const pic = picRow[1];
      return (
        <div key = {pic} className = "trending-block">
          <h1>{name}</h1>
          <Link to = "/">
            <img className = "trending-img" src = {pic} alt={name}></img>
          </Link>
        </div>);}
      );

    return (
      <div>
        <div className = "page hero full-page">
        <img id="home-hero-img" className = "hero-img" src = {homeHero}
        alt="Community Cleanup"></img>
          <div id = "home-hero-block" className = "hero-block">
            <h1 className = "hero-text text-white">
              HELP KEEP YOUR<br />COMMUNITY CLEAN.
            </h1>
            <button
                className = "hero-button button-transparent button-border-lg">
                LEARN MORE
            </button>
          </div>
        </div>
        <div className = "trending-container">
          <h1 className = "trending-heading">Trending This Week</h1>
          <ScrollMenu
            data={menuItems}
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            selected={selected}
            onSelect={this.onSelect}
            wheel={false}
          />
        </div>
      </div>
    );
  }
}

export default Home;

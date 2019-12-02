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
      className='scroll-menu-arrow'
    >{text}</div>
  );
};
const ArrowLeft = Arrow({ text: '<' });
const ArrowRight = Arrow({ text: '>' });

const MenuItem = ({img, name, selected}) => {
  console.log({img, name, selected});
  return <div
    className={`menu-item ${selected ? 'active' : ''}`}
    ><h1>{name}</h1><img src={img} /></div>;
};

export const Menu = (list, selected) =>
  list.map(el => {
    const {name, img} = el;

    return <MenuItem img={img} key={name} selected={selected} name={name} />;
  });


class Home extends React.Component {
  render() {
    const pics = [{name: "Woodbine Beach", img: tt1},
                    {name: "Brent National Park", img: tt2},
                    {name: "Kensley Lake", img: tt3}];

    let selected = "Brent National Park";

    const menuItems = Menu(pics, selected);

    return (
      <div>
      <img id="home-hero-img" className = "hero-img" src = {homeHero}
      alt="Community Cleanup"></img>
        <div className = {"page hero full-page"}>
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
            itemClass={'innerWrapper'}
          />
        </div>
      </div>
    );
  }
}

export default Home;

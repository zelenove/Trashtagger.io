import React from 'react';
import { Link } from 'react-router-dom';
import ScrollMenu from "react-horizontal-scrolling-menu";
import Combiner from "./Combiner"
import homeHero from "../assets/images/hero-home.jpg";

const Arrow = ({ text, className }) => {
  return (
    <div
      className='scroll-menu-arrow'
    >{text}</div>
  );
};
const ArrowLeft = Arrow({ text: '<' });
const ArrowRight = Arrow({ text: '>' });

// const MenuItem = ({text}) => {
//   return <div className="menu-item">{text}</div>;
// };

// export const Menu = (list) =>
//   list.map(el => {
//     const { name } = el;

//     return <MenuItem text={name} key={name} />;
//   });

const MenuItem = ({before, after}) => {
  return <Combiner before = {before} after = {after} />;
};

export const Menu = (list) =>
  list.map(el => {
    const { before, after, id } = el;
    //return <Combiner before = {el.before} after = {el.after} />
    return <MenuItem before={before} after={after} key={id}/>;
  });


class Home extends React.Component {
  render() {
    const featured = [{id: "1",
                      before: "https://trashtag.s3.ca-central-1.amazonaws.com/trash1_a.jpg", 
                      after: "https://trashtag.s3.ca-central-1.amazonaws.com/trash1_b.jpg"},
                      {id: "2",
                        before: "https://trashtag.s3.ca-central-1.amazonaws.com/trash1_a.jpg", 
                      after: "https://trashtag.s3.ca-central-1.amazonaws.com/trash1_b.jpg"},
                      {id: "3",
                        before: "https://trashtag.s3.ca-central-1.amazonaws.com/trash1_a.jpg", 
                      after: "https://trashtag.s3.ca-central-1.amazonaws.com/trash1_b.jpg"},
                      {id: "4",
                        before: "https://trashtag.s3.ca-central-1.amazonaws.com/trash1_a.jpg", 
                      after: "https://trashtag.s3.ca-central-1.amazonaws.com/trash1_b.jpg"},
                      {id: "5",
                        before: "https://trashtag.s3.ca-central-1.amazonaws.com/trash1_a.jpg", 
                      after: "https://trashtag.s3.ca-central-1.amazonaws.com/trash1_b.jpg"},
                      {id: "6",
                        before: "https://trashtag.s3.ca-central-1.amazonaws.com/trash1_a.jpg", 
                      after: "https://trashtag.s3.ca-central-1.amazonaws.com/trash1_b.jpg"}];

    const menuItems = Menu(featured);

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
                className = "submit-button hero-button button-transparent button-border-lg">
                LEARN MORE
            </button>
          </div>
        </div>
        <div className = "trending-container">
          <h1 className = "trending-heading">Trending This Week:</h1>
          <ScrollMenu
            data={menuItems}
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            wheel={false}
            scrollToSelected={true}
          />
        </div>
      </div>
    );
  }
}

export default Home;

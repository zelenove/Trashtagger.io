import React from "react";
import { Link } from "react-router-dom";

import tt1 from "../assets/images/uploads/tt1.jpg";
import tt2 from "../assets/images/uploads/tt2.jpg";
import tt3 from "../assets/images/uploads/tt3.jpg";

class Cleanups extends React.Component {
    render() {
        const pics = [["Woodbine Beach", tt1],
        ["Brent National Park", tt2],
        ["Kensley Lake", tt3]]

        const picRows = pics.map((picRow) => {
            const name = picRow[0];
            const pic = picRow[1];

            return (
                <div key={pic} className="trending-block">
                    <h1>{name}</h1>
                    <Link to="/">
                        <img className="trending-img" src={pic} alt={name}></img>
                    </Link>
                </div>
            );
        });

        return (
            <div className="trending-container">
                <h1 className="trending-heading">See the dedication of the Trashtag community</h1>
                {picRows}
            </div>
        );
    }
}

export default Cleanups;
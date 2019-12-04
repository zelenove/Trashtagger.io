import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Combiner from "./Combiner";

class Cleanups extends React.Component {
    constructor() {
        super()

        this.state = {
            cleanups: []
        }
    }

    componentDidMount() {
        axios.get("/trashtags", {
            // params: {
            //     cleaned: true
            // }
        })
        .then((response) => {
            this.setState({
                cleanups: response.data.cleanups
            })
            
        })
        .catch((error) => {
            // Error getting cleanups
        })
    }

    render() {

        
        const CleanedUp = this.state.cleanups.filter(cleanup=> cleanup.cleaned === true);
        
        const cleanupBlocks = CleanedUp.map((cleanup) => {
            const before = {
                src: cleanup.request_img,
                alt: cleanup.location + " request"
            }

            const after = {
                src: cleanup.cleaned_img,
                alt: cleanup.location + " cleaned"
            }

            return (
                <Link to={"/user/" + cleanup.cleaned_by} className="trending-block">
                    <h1>{cleanup.location} by {cleanup.cleaned_by}</h1>
                    <Combiner before={before} after={after} />
                </Link>
            );
        });

        return (
            <div className="trending-container">
                <h1 className="trending-heading">See the dedication of the Trashtag community</h1>
                {cleanupBlocks}
            </div>
        );
    }
}

export default Cleanups;
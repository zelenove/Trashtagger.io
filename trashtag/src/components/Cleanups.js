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
            params: {
                 cleaned: true
            }
        })
        .then((response) => {
            const cleanups = response.data.cleanups.filter((cleanup) => {
                return cleanup.cleaned
            })

            this.setState({
                cleanups: cleanups
            })

        })
        .catch((error) => {
            // Error getting cleanups
        })
    }

    render() {
        const cleanupBlocks = this.state.cleanups.map((cleanup) => {
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
                    <h2>{cleanup.location} by {cleanup.cleaned_by}</h2>
                    <div className="trending-combine-container">
                        <Combiner before={before} after={after} />
                    </div>
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
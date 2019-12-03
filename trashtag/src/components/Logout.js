import React from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"

class Logout extends React.Component {
    constructor() {
        super()
        this.setState({
            loggedOut: false
        })
    }

    componentDidMount() {
        // Check if the user has an active session running
        axios.get("/logout")
            .then((response) => {
                // A session already exists
                this.setState({
                    loggedOut: true
                })
            })
            .catch((error) => {
                // Already logged out, so just redirect
                this.setState({
                    loggedOut: true
                })
            })
    }

    render() {
        if (this.state.loggedOut) {
            return <Redirect to="/" />
        }
        else {
            return <div></div>
        }
    }
}

export default Logout
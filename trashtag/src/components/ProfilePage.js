import React from "react";
import { Redirect } from "react-router-dom"
import axios from "axios";

import Combiner from "./Combiner"

class ProfileComp extends React.Component {
    constructor() {
        super()

        this.state = {
            editting: false
        }
    }
    editProfile = (event) => {
        this.setState({
            editting: true
        })
    }

    render() {
        if (this.state.editting) {
            return <Redirect to = "/profile/edit" />
        }
        else {
            const picRows = (
                this.props.user.completed_cleanups ?
                this.props.user.completed_cleanups.map((cleanup) => {
                    const before = {
                        src: cleanup.request_img,
                        alt: cleanup.location + " request"
                    }
        
                    const after = {
                        src: cleanup.cleaned_img,
                        alt: cleanup.location + " cleaned"
                    }

                    return (
                        <div className="trending-block">
                            <h2>{cleanup.location}</h2>
                            <div className="trending-combine-container">
                                <Combiner before={before} after={after} />
                            </div>
                        </div>
                    )
                }) :
                []
            )

            const numRequested = (
                this.props.user.requested_cleanups ?
                this.props.user.requested_cleanups.length :
                ""
            )

            const numCompleted = (
                this.props.user.completed_cleanups ?
                this.props.user.completed_cleanups.length :
                ""
            )

            return (
                <div className="trashmap-page-container">
                    <div className="profile-info-pane">
                        <div className="profile-info-pane-inner">
                            <div className="profile-header">
                                <div className="picture-center-container">
                                    <img className="profile-picture"
                                        src={this.props.user.picture_url}
                                        alt="Profile Picture" />
                                </div>
                                <div className="profile-info-block">
                                    <h2>{this.props.user.username}</h2>
                                    {this.props.user.quote}
                                </div>
                                <div className="profile-info-block">
                                    Cleanups Requested: {numRequested}
                                    <br />
                                    Cleanups Completed: {numCompleted}
                                </div>
                            </div>
                            <div className="profile-description">
                                {this.props.user.about_me}
                            </div>
                            {this.props.edit ?
                                <button className="submit-button button-border-g"
                                    type="button"
                                    onClick={this.editProfile}>
                                        Edit Profile
                                </button> : ""}
                        </div>
                    </div>
                    <div className="profile-cleanups-container">
                        <h1 className="trending-heading">My Cleanups</h1>
                        {picRows}
                    </div>
                </div>
            )       
        }
    }
}

class ProfilePage extends React.Component {
    constructor() {
        super()
        this.state = {
            user: {},
            userNotFound: false
        }
    }

    componentDidMount() {
        // username is this.props.match.params.username
        axios.get("/users/" + this.props.match.params.username).then((res) => {
            this.setState({
                user: res.data.user
            })
        })
        .catch((error) => {
            // Display an error showing that the user does not exist
            this.setState({
                userNotFound: true
            })
        })
    }

    render() {
        if (this.state.userNotFound) {
            return (
                <div className="trashmap-page-container">
                    <h1>
                        The user {this.props.match.params.username} could not be found
                    </h1>
                </div>
            )
        }
        else {
            return <ProfileComp user={this.state.user} />
        }
    }
}

export {
    ProfilePage,
    ProfileComp
}
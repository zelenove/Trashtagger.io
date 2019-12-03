import React from "react";
import axios from "axios";

// Picture would be from DB, just importing them for show now
import admin from "../assets/images/profile-pictures/admin.jpg";
import user from "../assets/images/profile-pictures/user.jpg";

import tt1 from "../assets/images/uploads/tt1.jpg";

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
        console.log(this.state)
        console.log(this.props.match.params)
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
            // Static title and about for now, all user related data would be
            // pulled from the database
            const title = "Avid trashtagger and environmental activist"
            const description = "I wish to start a movement of global "
                + "environmental concern. Picking up trash and publicizing it is my "
                + "way of showing that every single person can make a difference."
    
            const pics = [["Woodbine Beach", tt1]]
    
            const picRows = pics.map((picRow) => {
                const name = picRow[0];
                const pic = picRow[1];
    
                return (
                    <div key={pic} className="trending-block">
                        <h1>{name}</h1>
                        <img className="trending-img" src={pic} alt={name}></img>
                    </div>
                );
            });
    
            // Showcasing with the 2 users
            const profilePic = this.state.user.username === "user" ? user : admin

            const numRequested = (
                this.state.user.requested_cleanups ?
                this.state.user.requested_cleanups.length :
                ""
            )

            const numCompleted = (
                this.state.user.completed_cleanups ?
                this.state.user.completed_cleanups.length :
                ""
            )

            return (
                <div className="trashmap-page-container">
                    <div className="profile-info-pane">
                        <div className="profile-info-pane-inner">
                            <div className="profile-header">
                                <div className="picture-center-container">
                                    <img className="profile-picture"
                                        src={profilePic}
                                        alt="Profile Picture" />
                                </div>
                                <div className="profile-info-block">
                                    <h2>{this.state.user.username}</h2>
                                    {title}
                                </div>
                                <div className="profile-info-block">
                                    Cleanups Requested: {numRequested}
                                    <br />
                                    Cleanups Completed: {numCompleted}
                                </div>
                            </div>
                            <div className="profile-description">
                                {description}
                            </div>
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

export default ProfilePage
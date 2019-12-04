import React from "react";

// Picture would be from DB, just importing them for show now
import admin from "../assets/images/profile-pictures/admin.jpg";
import user from "../assets/images/profile-pictures/user.jpg";

import tt1 from "../assets/images/uploads/tt1.jpg";

class Profile extends React.Component {
    render() {
        console.log(this.props)
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
        const profilePic = this.props.user.username === "user" ? user : admin
        console.log(this.props)
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
                                <h2>{this.props.user.username}</h2>
                                {title}
                            </div>
                            <div className="profile-info-block">
                                Cleanups Requested: {this.props.user.requested_cleanups.length}
                                <br />
                                Cleanups Completed: {this.props.user.completed_cleanups.length}
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

export default Profile
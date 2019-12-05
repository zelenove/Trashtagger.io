import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ProfileComp } from "./ProfilePage"
import axios from "axios";

class Profile extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path = "/profile" render = {(props) => <ProfileComp user={this.props.user}
                                                                        edit />} />
                <Route exact path = "/profile/edit" render = {(props) => <EditProfile user={this.props.user}
                                                                            updateUser={this.props.updateUser} />} />
                <Route render = {(props) => <Redirect to = "/" />} />
            </Switch>
        )
    }
}

class EditProfile extends React.Component {
    constructor() {
        super()

        this.state = {
            quote: "",
            aboutMe: "",
            editting: true,
            img_url: ""
        }
    }

    // Create the image upload widget and require square cropping
    // Callback stores returned img url in state
    showWidget = () => {
        window.cloudinary.openUploadWidget({
            cloudName: "trashcloud",
            uploadPreset: "trashtag_crop",
            sources: ["local"],
            cropping: 'server',
            multiple: false,
            resourceType: 'image',
            singleUploadAutoClose: false,
            showSkipCropButton: false,
            croppingAspectRatio: 1,
            croppingCoordinatesMode: 'custom',
        }, (error, result) => {
            if (result && result.event === "success"){
                console.log(result.info.url);
                this.setState({
                    img_url: result.info.url
                })
            }
        });
    }

    editProfile = (event) => {
        event.preventDefault()

        axios.patch("/users/" + this.props.user.username, {
            quote: this.state.quote,
            about_me: this.state.aboutMe,
            picture_url: this.state.img_url
        })
        .then((response) => {
            this.setState({
                editting: false
            })

            this.props.updateUser()
        })
        .catch((error) => {
            console.log(error)
            console.log(error.response)
        })
    }

    componentDidMount() {
        this.setState({
            quote: this.props.user.quote,
            aboutMe: this.props.user.about_me,
            img_url: this.props.user.img_url
        })
    }

    render() {
        if (!this.state.editting) {
            return <Redirect to="/profile" />
        }
        else {
            return (
                <div className="trash-page-container trashmap-container-full">
                    <form id="create-request trashmap"
                        className="trashmap-container-full"
                        onSubmit={this.editProfile}>
                        <div className="user-form-section">
                            <h2 className="user-form-header">Create Request</h2>
                            <div className= "message"></div>
                            <div className="form-input">
                                <input className="form-field"
                                    type="text"
                                    placeholder="Quote"
                                    name="quote"
                                    value= {this.state.quote}
                                    onChange={onFormInputChange.bind(this)} />
                            </div>
                            <div className="form-input">
                                <textarea className="form-text-area"
                                    form="create-request"
                                    name="aboutMe"
                                    onChange={onFormInputChange.bind(this)}
                                    wrap="soft"
                                    placeholder="About Me (Max 256 Characters)"
                                    maxLength="256"
                                    rows="5"
                                    value= {this.state.aboutMe}
                                    required />
                            </div>
                            <div>
                                <button className="submit-button button-border-g"
                                    type="button"
                                    onClick={this.showWidget}>Upload Photo</button>
                            </div>
                            <input type="submit"
                                className="form-submit button-border-g"
                                value="Finish Editting" />
    
                                <img src={this.state.img_url} />
    
                        </div>
                    </form>
                </div>
            )
        }
    }
}

function onFormInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
        [name]: value
    })
}

export default Profile
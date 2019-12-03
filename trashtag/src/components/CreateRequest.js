import React from "react";
import axios from "axios";

import TrashMap from "./TrashMap";

// Make sure to redirect the login page if the user is not logged in
class CreateRequest extends React.Component {
    constructor() {
        super()

        this.state = {
            title: "",
            description: "",
            markerPosition: null,
            img_url: ""
        }
    }

    moveMarker = (marker) => {
        const { lat, lng } = marker.latLng;

        this.setState({
            markerPosition: {
                lat: lat(),
                lng: lng()
            }
        })
    }
  
    // To be used only if a user is logged in
    createCleanupRequest = (e) => {
        e.preventDefault()
        
        console.log(this.state.title, this.state.description, this.state.img_url)

        axios.post("trashtags/create", {
            //requested_by: 
            title: this.state.title,
            description: this.state.description,
            //longitude: Decimal128
            //latitude: Decimal128
            request_img: this.state.img_url
        })

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.title !== this.state.title
            || nextState.description !== this.state.description) {
            return false
        }

        return true
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

    render() {

        // Likely a good idea to customize rendering to not reload the map
        // when the user types in a text box
        const marker = (
            !this.state.markerPosition ? [] :
                [
                    {
                        name: this.state.title,
                        position: this.state.markerPosition
                    }
                ]
        )

        return (
            <div className="trash-page-container trashmap-container-full">
                <form id="create-request trashmap"
                    className="trashmap-container-full"
                    onSubmit={this.createCleanupRequest.bind(this)}>
                    <div className="user-form-section">
                        <h2 className="user-form-header">Create Request</h2>
                        <div className="form-input">
                            <input className="form-field"
                                type="text"
                                placeholder="Title"
                                name="title"
                                onChange={onFormInputChange.bind(this)} />
                        </div>
                        <div className="form-input">
                            <textarea className="form-text-area"
                                form="create-request"
                                name="description"
                                onChange={onFormInputChange.bind(this)}
                                wrap="soft"
                                placeholder="Description (Max 256 Characters)"
                                maxLength="256"
                                rows="5"
                                required />
                        </div>

                        <div className="trash-map-embed">
                            <TrashMap
                                onMapClick={this.moveMarker}
                                markers={marker}
                                containerElement={<div className="trashmap-container-half-right" />} />
                        </div>
                        <div>
                            <button className="button-border-g" onClick={this.showWidget}>Upload Photo</button>
                        </div>
                        <input type="submit"
                            className="form-submit button-border-g"
                            value="Submit Request" />
                            <img src={this.state.img_url} />
                    </div>
                </form>
            </div>
        )
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

export default CreateRequest;
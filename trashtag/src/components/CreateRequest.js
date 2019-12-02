import React from "react";

import TrashMap from "./TrashMap";

// Make sure to redirect the login page if the user is not logged in
class CreateRequest extends React.Component {
    constructor() {
        super()

        this.state = {
            title: "",
            description: "",
            markerPosition: null
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
  
    createCleanupRequest = (event) => {
        event.preventDefault();
        // To be used only if a user is logged in
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.title !== this.state.title
            || nextState.description !== this.state.description) {
            return false
        }

        return true
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
                    onSubmit={this.createCleanupRequest}>
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
                        <input type="submit"
                            className="form-submit button-border-g"
                            value="Submit Request" />
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
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

    render() {

        // Likely a good idea to customize rendering to not reload the map
        // when the user types in a text box
        const titleEmpty = checkNotEmpty.bind(this)("title")
        const descriptionEmpty = checkNotEmpty.bind(this)("description")
        const marker = !this.state.markerPosition ? [] :
        [{
            name: this.state.title,
            position: this.state.markerPosition
        }]

        return (
            <div className="trash-page-container trashmap-container-full">
                <form id="create-request trashmap"
                    className="trashmap-container-full"
                    onSubmit={this.createCleanupRequest}>
                    <div className="user-form-section">
                        <h2 className="user-form-header">Create Request</h2>
                        <div className="form-input">
                            <input className={`form-field ${titleEmpty}`}
                                type="text"
                                name="title"
                                onChange={onFormInputChange.bind(this)}
                                value={this.state.title} />
                            <label>Title</label>
                        </div>
                        <div className="form-input">
                            <textarea className={`form-text-area
                                    ${descriptionEmpty}`}
                                form="create-request"
                                name="description"
                                onChange={onFormInputChange.bind(this)}
                                wrap="soft"
                                maxLength="256"
                                rows="5"
                                required
                                value={this.state.description} />
                            <label>Description (Max 256 Characters)</label>
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

// To make the form labels work
function checkNotEmpty(name) {
    return this.state[name].length === 0 ? "" : "not-empty"
}

export default CreateRequest;
import React from "react";

import TrashMap from "./TrashMap"

class TrashMapPage extends React.Component {
    render() {
        // Figure out how to style the page later
        return (
            <div className="trash-page-container">
                <TrashMap
                    containerElement={<div className="trashmap-container-full"
                    updateUser={this.props.updateUser} />} />
            </div>
        )
    }
}

export default TrashMapPage;
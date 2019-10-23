import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class TrashMap extends React.Component {
  constructor() {
    super();

    this.state = {
      // Not sure what to add yet
    }
  }

  addMarker() {

  }

  createCleanupRequests() {
    // Create the pin and pass the request along here
    // To be used only if a user is logged in
  }

  render() {
    // Would get the markers from the db
    const markers = [];

    return withGoogleMap(
      <GoogleMap >
        {markers}
      </GoogleMap>
    );
  }
}

export default TrashMap;
import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class TrashMap extends React.Component {
  constructor() {
    super();

    this.state = {
      // Not sure what to add yet
      markers: []
    }
  }

  addMarker() {

  }

  createCleanupRequests() {

  }

  render() {
    // Would get the markers from the db
    // Some random api key off stack overflow
    const mapURL = 'https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyA7XEFRxE4Lm28tAh44M_568fCLOP_On3k';
    const markers = this.state.markers.map((marker) => {
      return (
        <Marker
          {...marker} />
      )
    })

    const Map = withScriptjs(withGoogleMap((props) => {
      return (
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}>
          {markers}
        </GoogleMap >
      )
    }))

    return (
      <Map isMarkerShown={true}
        containerElement={this.props.containerElement}
        mapElement={<div className="trashmap-map-element"/>}
        googleMapURL={mapURL}
        loadingElement={<div className="trashmap-loading-element"/>} />
    )
  }
}

export default TrashMap;
import React from 'react';
import {
  withScriptjs, withGoogleMap, GoogleMap,
  Marker, InfoWindow
} from 'react-google-maps';

import placesRequest from "./google-maps-api/places";

class TrashMap extends React.Component {
  constructor() {
    super();

    this.state = {
      // Just some static data for now, would be pulled from DB
      markers: [
        {
          id: 0,
          name: "Bolton's Ranch",
          position: {
            lat: 41.89812,
            lng: -77.9129
          }
        },
        {
          id: 1,
          name: "Niagara Falls",
          position: {
            lat: 43,
            lng: -79
          }
        },
        {
          id: 2,
          name: "Queen's Park",
          position: {
            lat: 43.6532,
            lng: -79.3832
          }
        }
      ],
      searchResults: [],
      pagination: null
    }

    this.map = React.createRef()
  }

  onMarkerClick = (event) => {
    // Just a test api call
    const marker = event.target;

    const request = {
      location: this.map.center,
      radius: '500',
    }

    placesRequest(this.map, "nearbySearch", request)
      .then((result) => {
        this.setState({
          searchResults: result.results,
          pagination: result.pagination
        })

      })
      .catch((error) => {
        console.log(error)
      })
  }

  makeMarkerObj = (marker) => {
    return (
      <Marker key={marker.id} name={marker.name} position={marker.position}
        onClick={this.onMarkerClick}>
        <InfoWindow>
          <div>
            {marker.name}
          </div>
        </InfoWindow>
      </Marker>
    )
  }

  render() {
    // Some random api key off stack overflow
    const mapURL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places,geometry&key=AIzaSyA7XEFRxE4Lm28tAh44M_568fCLOP_On3k';
    const markers = this.state.markers.map((marker) => this.makeMarkerObj(marker))
    const propMarkers = this.props.markers.map((marker) => {
      const markerOb = {
        id: markers.length, // Temporary id for show
        name: marker.name,
        position: marker.position
      }

      return this.makeMarkerObj(markerOb)
    })

    const Map = withScriptjs(withGoogleMap((props) => {
      return (
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
          onClick={this.props.onMapClick}
          ref={this.map}
        >
          {markers}
          {propMarkers}
        </GoogleMap >
      )
    }))

    return (
      <Map isMarkerShown={true}
        containerElement={this.props.containerElement}
        mapElement={<div className="trashmap-map-element" />}
        googleMapURL={mapURL}
        loadingElement={<div className="trashmap-loading-element" />} />
    )
  }
}

export default TrashMap;
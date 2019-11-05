import React from 'react';
import {
  withScriptjs, withGoogleMap, GoogleMap,
  Marker, InfoWindow
} from 'react-google-maps';
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
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
    this.selectedMarker = React.createRef()
  }

  onSearchSelected = (place) => {

  }

  onMarkerClick = (marker) => {
    const { lat, lng } = marker.latLng

    this.selectedMarker.current = marker

    // Just a test api call
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

    let propMarkers;
    if (this.props.markers) {
      propMarkers = this.props.markers.map((marker) => {
        const markerOb = {
          id: markers.length, // Temporary id for show
          name: marker.name,
          position: marker.position
        }

        return this.makeMarkerObj(markerOb)
      })
    }

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

    const SearchBoxPane = withScriptjs((props) => {
      return (
        <StandaloneSearchBox
          onPlacesChanged={this.onSearchSelected}>
          <input type="text" placeholder="Search for a trash site" />
        </StandaloneSearchBox>
      )
    })

    const mapContainer = <div className="trashmap-container" />
    const mapElement = <div className="trashmap-map-element" />
    const loadingElement = <div className="trashmap-loading-element" />

    // This info would be pulled from the database, static for now
    const trashInfo = [(
      <div className="trashmap-info-block">
        <div className="trashmap-info-text">
          <h3>Queen's Park</h3>
          Severity: High
        </div>
      </div>
    )]

    return (
      <div className="trashmap-all-container">
        <div className="trashmap-sidepane">
          <div className="trashmap-search-box">
            <SearchBoxPane
              googleMapURL={mapURL}
              loadingElement={<div className="trashmap-search-box" />} />
          </div>
          <div className="trashmap-info-pane">
            {trashInfo}
          </div>
        </div>
        <Map isMarkerShown={true}
          containerElement={mapContainer}
          mapElement={mapElement}
          googleMapURL={mapURL}
          loadingElement={loadingElement} />
      </div>
    )
  }
}

export default TrashMap;
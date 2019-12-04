import React from 'react';
import {
  withScriptjs, withGoogleMap, GoogleMap,
  Marker, InfoWindow
} from 'react-google-maps';
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import placesRequest from "./google-maps-api/places";
import axios from "axios";
import Popup from "reactjs-popup";


const RenderMap = withScriptjs(withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
      onClick={props.onMapClick}
      ref={props.onMapMounted}
    >
      {props.markers}
    </GoogleMap >
  )
}))

const SearchBoxPane = withScriptjs((props) => {
  return (
    <StandaloneSearchBox
      onPlacesChanged={props.onSearchSelected}>
      <input type="text" placeholder="Search for a trash site" />
    </StandaloneSearchBox>
  )
})

class TrashMap extends React.Component {
  constructor() {
    super();

    this.state = {
      // Just some static data for now, would be pulled from DB
      markers: [],
      searchResults: [],
      pagination: null,
      map: null,
      completed_img_url: ""
      
      
    }

    this.selectedMarker = React.createRef()
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  onSearchSelected = (place) => {

  }

  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }
 
  onMarkerClick = (marker) => {
    const { lat, lng } = marker.latLng
    console.log(lat())
    this.selectedMarker.current = marker

    // Just a test api call
    const request = {
      location: this.map.center,
      radius: '500',
    }

    // placesRequest(this.map, "nearbySearch", request)
    //   .then((result) => {
    //     this.setState({
    //       searchResults: result.results,
    //       pagination: result.pagination
    //     })

    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

    const map_filter_1 = this.state.markers.filter((element) => element.latitude === lat())
    const map_filter_2 = map_filter_1.find((element) => element.longitude === lng())
    console.log(map_filter_2)

    this.selectedMarker = map_filter_2

    console.log(this.selectedMarker)
    
      this.openModal()


  }

  getTrash = () => {
    axios.get("/trashtags", {
    
  }).then((res) => {
     // this.state.markers = res.data.trashtags
      this.setState({
        markers: res.data.cleanups
      })
     
      
    })
    .catch((error) => {
      console.log(error)
    })
  }

  makeMarkerObj = (marker) => {

    
    let position = {
      lat : (marker.latitude),
      lng : (marker.longitude)
    }
    
    return (
      <Marker key={marker.id} name={marker.location} position={position}
        onClick={this.onMarkerClick}>
        <InfoWindow>
          <div>
            {marker.location}
          </div>
        </InfoWindow>
      </Marker>
    )
    }

  makeMarkerObj1 = (marker) => {
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

  onSidePaneClick = (marker) => {
    this.map.panTo({
      lat: marker.latitude,
      lng: marker.longitude
    })
  }

  onMapMounted = (map) => {
    this.map = map
  }

  componentDidMount ()  {
    this.getTrash()
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
                  completed_img_url: result.info.url
              })
          }
      });
    }

    submitRequest = (e) => {

      e.preventDefault()
      console.log(this.selectedMarker.rID)



      axios.post("/trashtags/complete-request", {
        //requested_by:
        rID: this.selectedMarker.rID,
        cleanedImg: this.state.completed_img_url
        
    }).then(function(res) {

        console.log('submitted')
      })
      .catch((error) => {
          
        console.log('ERERRE')
      })
    }
  

  render() {
    // Some random api key off stack overflow
    const mapURL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places,geometry&key=AIzaSyA7XEFRxE4Lm28tAh44M_568fCLOP_On3k';
    const markers = this.state.markers.map((marker) => {
      if (!marker.cleaned){
      return(
        this.makeMarkerObj(marker))
      }
    })
    
    
    const trash_locations = []
    const trash_names = this.state.markers.map((marker) => trash_locations.push(marker.location)) 
       

    let propMarkers;
    if (this.props.markers) {
      propMarkers = this.props.markers.map((marker) => {
        
        const markerOb = {
          id: 0, // Temporary id for show
          name: marker.name,
          //latitude: marker.latitude,
          //longitude: marker.longitude
          position: marker.position
        }

       

        return this.makeMarkerObj1(markerOb)
      })
    }
    
    
   
    const mapContainer = <div className="trashmap-container" />
    const mapElement = <div className="trashmap-map-element" />
    const loadingElement = <div className="trashmap-loading-element" />

    const trashInfo = this.state.markers.map((marker) => {
      // Only get the date
      if (!marker.cleaned){
      const reqDateT = new Date(marker.requested_date)
      const reqDate = reqDateT.getFullYear() + "/" + reqDateT.getMonth()
                      + "/" + reqDateT.getDate()
      return (
          <button className="trashmap-info-block" marker={marker}
              onClick={() => this.onSidePaneClick(marker)}>
              <div className="trashmap-info-text">
                  <h2>{marker.location}</h2>
                  <h4>Requested by {marker.requested_by} on {reqDate}</h4>
              </div>
          </button>
      )
    }
    })

    

    const popup_text = (
        
        <div className="PopupText">
         
        <h3>Location:</h3>
          <p>{this.selectedMarker.location}</p>
          <h3>Description:</h3>
          <p>{this.selectedMarker.description}</p>
          <h3>Requested by:</h3>
          <p>{this.selectedMarker.requested_by}</p>
          <h3>Requested Date:</h3>
          <p>{this.selectedMarker.requested_date}</p>
          <h3 >Image </h3>
          <div classname= "Image">
            <img  src={this.selectedMarker.request_img }/>
          </div>
          

          
          


      </div>
    )



    
    return (
      <div className="trashmap-all-container">
        <div className="trashmap-search-box">
            <SearchBoxPane
              googleMapURL={mapURL}
              loadingElement={<div className="trashmap-search-box" />}
              onSearchSelected = {this.onSearchSelected} />
          </div>
        <RenderMap isMarkerShown={true}
          containerElement={mapContainer}
          mapElement={mapElement}
          googleMapURL={mapURL}
          loadingElement={loadingElement}
          markers={markers.concat(propMarkers)}
          onMapMounted={this.onMapMounted}
          onMapClick={this.props.onMapClick} />

        <Popup
              open={this.state.open}
              closeOnDocumentClick
              onClose={this.closeModal}
            >
          <div className="Popup">
             <a className="close" onClick={this.closeModal}>
              &times;
                </a>
                {popup_text}
                   <br></br>
                 <button onClick = {this.showWidget} >Submit Finished Picture</button>
                 <button onClick = {this.submitRequest}>Complete Request</button>
                 

             </div>
            </Popup>
         </div>
    )
  }
}

export default TrashMap;
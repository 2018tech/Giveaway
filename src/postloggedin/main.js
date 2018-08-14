import React from 'react';
import ReactMapboxGl, { Feature,Layer, Popup } from "react-mapbox-gl";
import Request from './request.js';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiamxlZWVpIiwiYSI6ImNqa2JmdnBydzBqcXkzb3A4MXR3aGZ5M3IifQ.1BYG_EtmKkW8YTeBYwcL9A"
});

export default class Mainpage extends React.Component {
  constructor () {
    super()
    this.state = {
      region: {
        latitude: 0,
        longitude: 0
      },
      showmap: false,
      showPopup: false,
      stations: {},
      station: {},
      currentPage: "MainPage"
    }
    this.redirect = this.redirect.bind(this);
  }

  redirect(page, options) {
    this.setState({currentPage: page, options: options})
  }

  markerClick(station) {
    console.log(station)
    this.setState({
      region: {
        latitude: station.position[1],
        longitude: station.position[0]
      },
      station: station,
      showPopup: true
    })
  }

  onCancel(e) {
    this.setState({
      showPopup: false
    });
  };

  onRequest(e){
      this.setState({currentPage: "Request"});
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        this.setState({region: {
          latitude: success.coords.latitude,
          longitude: success.coords.longitude
        }, showmap: true
      });
    },
    (error) => {
      console.log(error)
    }
  )
  fetch('/usershop', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res=> res.json())
  .then(res=> {
    var obj = {}
    res.map(item=> {
      obj[item["_id"]]={stations: item.locations.stations, position: item.locations.position, yourshopname: item.locations.yourshopname, items: item.items }}
    )
    this.setState({stations: obj})
  })
  .catch(err=> console.log(err))
}

render() {
  return(
    <div>
      {this.state.currentPage === 'Request' ? <Request redirect={this.redirect} setLogin={this.setLogin} app={this}/> : null}
      {this.state.currentPage === 'MainPage'?
      <div className="home"> {this.state.showmap &&
      <Map
        container='map'
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        center={[this.state.region.longitude, this.state.region.latitude]}
        zoom={[15]}
        >
          <Layer
            type="symbol"
            layout={{ "icon-image": "harbor-15" }}>
            {Object.keys(this.state.stations).map((stationkey, index) => {
              return (<Feature
                onClick={this.markerClick.bind(this, this.state.stations[stationkey])}
                coordinates={this.state.stations[stationkey]["position"]}
              />)
            })}
          </Layer>
          {this.state.showPopup ?
            <Popup
              coordinates={this.state.station["position"]}
              >
                <div className="shopname">
                  Welcome to {this.state.station.yourshopname}
                  <div className="item">
                    {this.state.station["items"].map(item=> <p>Name: {[item["name"]]}<br></br> Description: {item[["description"]]}<br></br> Value: {item[["value"]]}<button onClick={e=> this.onRequest(e)}>Request</button></p>)}
                  </div>
                  <div id="item">
                    <button onClick={e => this.onCancel(e)}>Cancel</button>
                  </div>
                </div>
              </Popup>: null}
            </Map>
          }</div>: null}
        </div>
        )}
      }

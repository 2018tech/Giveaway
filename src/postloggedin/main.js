import React from 'react';
import ReactMapboxGl, { Feature,Layer, Popup } from "react-mapbox-gl";
import Request from './request.js';
import axios from 'axios'

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
      currentPage: "MainPage",
      userprofileinfo: []
    }
    this.redirect = this.redirect.bind(this);
    // this.onRequest = this.onRequest.bind(this);
  }

  redirect(page, options) {
    this.setState({currentPage: page, options: options})
  }

  onCancel(e) {
    this.setState({
      showPopup: false
    });
  };

  onRequest(e, item){
  // this.props.app.eachitem({eachitem: item})
  // this.props.app.redirect("Mainpage")
  this.setState({currentPage: "Request"})
  }

  markerClick(station) {
    this.setState({
      region: {
        latitude: station.position[1],
        longitude: station.position[0]
      },
      station: station,
      showPopup: true
    })
  }

  // componentWillMount(){
  //   console.log("willmount")
  // }

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
    })

  fetch('/usershop', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res=> res.json())

  // .then(data=> JSON.stringify(data))
  // .then(data=>JSON.parse(data))
  .then(res=> {
    var obj = {}
    res.map(item=> {
      obj[item["_id"]]={stations: item.locations.stations, position: item.locations.position, yourshopname: item.locations.yourshopname, items: item.items }}
    )
    this.setState({stations: obj})

      })
  .catch(err=> console.log(err))
  // console.log("didmount")
}

// componentWillUpdate(){
//   console.log("didupdate")
//     {
//     var obj = {}
//     this.state.userprofileinfo.map(item=> {
//       obj[item["_id"]]={stations: item.locations.stations, position: item.locations.position, yourshopname: item.locations.yourshopname, items: item.items }}
//     )
//     this.setState({stations: obj})
//   }
// }
  //   {
  //   var obj = {}
  //   res.map(item=> {
  //     obj[item["_id"]]={stations: item.locations.stations, position: item.locations.position, yourshopname: item.locations.yourshopname, items: item.items }}
  //   )
  //   this.setState({stations: obj})
  // })

render() {
  // {console.log("render")}
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
              id="marker"
              layout={{ "icon-image": "shop-15" }}>
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
                      {this.state.station["items"].map(item=> <p>Name: {[item["name"]]}<br></br> Description: {item[["description"]]}</p>)}
                          <button onClick={e=> this.onRequest(e)}>Request</button>
                          <button onClick={e => this.onCancel(e)}>Cancel</button>
                    </div>
                    <div id="item">
                    </div>
                  </div>
                </Popup>: null}
              </Map>
            }</div>: null}
          </div>
        )}
      }

import React from 'react';
import ReactMapboxGl, { Layer } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiamxlZWVpIiwiYSI6ImNqa2JmdnBydzBqcXkzb3A4MXR3aGZ5M3IifQ.1BYG_EtmKkW8YTeBYwcL9A"
});

export default class Home extends React.Component {
  constructor () {
    super()
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5
      }
    }
  }

  componentDidMount() {
    console.log(this.state)
    console.log(navigator)
    navigator.geolocation.getCurrentPosition(
      (success) => {
        this.setState({region: {
          latitude: success.coords.latitude,
          longitude: success.coords.longitude,
          latitudeDelta: 10,
          longitudeDelta: 10
        }
      });
    },
    (error) => {
      console.log(error)
    }
  )
  }

  render() {
    return(
      <div className="home">
        <Map
          style={"mapbox://styles/mapbox/streets-v9"}
          containerStyle={{
            height: "100vh",
            width: "100vw"
            }}
            center={[this.state.region.longitude, this.state.region.latitude]}
            zoom={[15]}
            >
          {console.log(this.state)}
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            {/* <Feature coordinates={[0,0]}/> */}
          </Layer>
        </Map>
      </div>
    )}
  }

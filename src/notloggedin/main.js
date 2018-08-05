import React from 'react';
import ReactMapboxGl, { Layer, GeoJSONLayer, Popup } from "react-mapbox-gl";


const geojson = require('.././newgeojson.geojson')

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiamxlZWVpIiwiYSI6ImNqa2JmdnBydzBqcXkzb3A4MXR3aGZ5M3IifQ.1BYG_EtmKkW8YTeBYwcL9A"
});

const symbolLayout: MapboxGL.SymbolLayout = {
  'text-field': '{place}',
  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  'text-offset': [0.7, 0.6],
  'text-anchor': 'top'
};
const symbolPaint: MapboxGL.SymbolPaint = {
  'text-color': 'blue'
};

const circleLayout: MapboxGL.CircleLayout = { visibility: 'visible' };
const circlePaint: MapboxGL.CirclePaint = {
  'circle-color': 'red'
};

export default class Mainpage extends React.Component {
  constructor () {
    super()
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5
      },
      showmap: false,
      showPopup: false
    }
  }

onClickCircle(e){
  console.log(e)
  this.setState({
    showPopup: !this.state.showPopup,
    region: {
      latitude: e.lngLat.lat,
     longitude: e.lngLat.lng}
  })
}


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        this.setState({region: {
          latitude: success.coords.latitude,
          longitude: success.coords.longitude,
          latitudeDelta: 10,
          longitudeDelta: 10
        }, showmap: true

      });
    },
    (error) => {
      console.log(error)
    }
  )
}
// mapbox://styles/jleeei/cjke8nygu0h1y2ro8jlf9mj69
//mapbox://styles/mapbox/streets-v9
render() {
  return(
    <div className="home"> {this.state.showmap&& <Map
      container='map'
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}
      center={[this.state.region.longitude, this.state.region.latitude]}
      zoom={[15]}
      >
        <GeoJSONLayer
          data={geojson}
          circleLayout={circleLayout}
          circlePaint={circlePaint}
          symbolLayout={symbolLayout}
          symbolPaint={symbolPaint}
          circleOnClick={this.onClickCircle.bind(this)}
      />
      {this.state.showPopup ?
        <Popup
          coordinates={[this.state.region.longitude, this.state.region.latitude]}
          className="popup"
          ><div>You are here</div>
        </Popup>: null}
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}>
          {/* <Feature coordinates={[this.state.region.longitude, this.state.region.latitude]}/> */}
        </Layer>
      </Map>}
    </div>
  )}
}

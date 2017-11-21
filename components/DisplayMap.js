import React from 'react'
import MapView from 'react-native-maps'

export default class DisplayMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      region: {
        latitude: 37.9485,
        longitude: -91.7715,
        latitudeDelta: 0.009,
        longitudeDelta: 0.005
      },
      mark_cord: {
        latitude: 37.9485,
        longitude: -91.7715
      }
    }
    if (this.props.mark_lat) {
      this.state.mark_cord.latitude = this.props.mark_lat
    }
    if (this.props.mark_long) {
      this.state.mark_cord.longitude = this.props.mark_long
    }
    if (this.props.focus) {
      this.state.region.latitude = this.state.mark_cord.latitude
      this.state.region.longitude = this.state.mark_cord.longitude
    }
  }

  render () {
    return (
      <MapView style={{height: 250, flex: 1}} region={this.state.region}>
        <MapView.Marker
          coordinate={this.state.mark_cord}
        />
      </MapView>
    )
  }
}

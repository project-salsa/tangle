import React from 'react'
import MapView from 'react-native-maps'

export default class SelectMap extends React.Component {
  constructor (props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
    this.state = {
      region: {
        latitude: 37.9485,
        longitude: -91.7715,
        latitudeDelta: 0.009,
        longitudeDelta: 0.005
      },
      mark_cord: {
        latitude: 0,
        longitude: 0
      },
      map_height: 200
    }
    if (this.props.map_ht) {
      this.state.map_height = this.props.map_ht
    }
    if (this.props.user_lat) {
      this.state.region.latitude = this.props.user_lat
    }
    if (this.props.user_long) {
      this.state.region.longitude = this.props.user_long
    }
  }

  handlePress (e) {
    this.setState({ mark_cord: e.nativeEvent.coordinate })
    this.setState({ region: {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.005}
    })
    this.props.getCoordinate(e.nativeEvent.coordinate)
  }

  render () {
    return (
      <MapView
        style={{height: this.state.map_height, flex: 1}}
        region={this.state.region}
        onPress={this.handlePress}>
        <MapView.Marker coordinate={this.state.mark_cord} />
      </MapView>
    )
  }
}

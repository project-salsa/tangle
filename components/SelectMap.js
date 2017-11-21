import React from 'react'
import MapView from 'react-native-maps'

export default class SelectMap extends React.Component {
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
        latitude: 0,
        longitude: 0
      }
    }
  }

  getMark () {
    return this.state.mark_cord
  }

  render () {
    return (
      <MapView
        style={{height: 250, flex: 1}}
        region={this.state.region}
        onPress={(e) => this.setState({ mark_cord: e.nativeEvent.coordinate })}>
        <MapView.Marker coordinate={this.state.mark_cord} />
      </MapView>
    )
  }
}

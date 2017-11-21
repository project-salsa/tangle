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
        latitude: this.props.mark_lat,
        longitude: this.props.mark_long
      }
    }
  }

  render () {
    return (
      <MapView style={{height: 250, flex: 1}} region={this.state.region}>
        <MapView.Marker draggable
          coordinate={this.state.mark_cord}
          onDragEnd={(e) => this.setState({ mark_cord: e.nativeEvent.coordinate })} />
      </MapView>
    )
  }
}

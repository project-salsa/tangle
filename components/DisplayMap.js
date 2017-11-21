import React from 'react'
import {Container, Header, Body, Title, Text, Form, Content, View, Button, Item, Input, Label} from 'native-base'
import MapView from 'react-native-maps'

export default class DisplayMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      region: {
        latitude: 37.9485,
        longitude: 91.7715,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      mark_cord: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  onRegionChange (region) {
    this.setState({ region })
  }

  render () {
    return (
      <MapView
        region={this.state.region}
        onRegionChange={this.onRegionChange}
      />
    )
  }
}

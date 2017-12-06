import React from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import {Container, Body, Title, Left, Content, Button, Icon, Thumbnail} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import MapView from 'react-native-maps'
import { inject } from 'mobx-react'
import axios from 'axios'
import GlobalStyleSheet from '../../style'
import Header from '../common/header'

@inject('authStore')
export default class RequestComponent extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const currentUser = this.props.authStore.user
    const hostUser = this.props.hostUser
    let hasJoined = false
    let contactInfo
    let mapDisplay
    let joinLeaveButton = (
      <Button block primary onPress={() => this.props.handleJoin('Join')}>
        <Text style={{color: '#FFFFFF', fontSize: 18}}>Join Request</Text>
      </Button>
    )
    let hostPic = 'https://tangled.michaelbeaver.info/assets/images/default-profile-pic.png'
    if (hostUser.profilePicUrl !== '') {
      hostPic = hostUser.profilePicUrl
    }
    if (this.props.currentPlayers.length >= this.props.maxPlayers ) {
      joinLeaveButton = (
        <Button block primary disabled>
          <Text style={{color: '#FFFFFF', fontSize: 18}}>Join Request</Text>
        </Button>
      )
    }
    if (this.props.authStore.user.username === this.props.hostUser.username)
    {
      joinLeaveButton = (
        <Button block primary disabled>
          <Text style={{color: '#FFFFFF', fontSize: 18}}>Join Request</Text>
        </Button>
      )
    }

    for (const player of this.props.currentPlayers) {
      if (player.username === currentUser.username) {
        hasJoined = true
        break
      }
    }

    if (hasJoined) {
      // Change button to 'Leave Request'
      joinLeaveButton = (
        <Button block primary onPress={() => this.props.handleJoin('Leave')}>
          <Text style={{color: '#FFFFFF', fontSize: 18}}>Leave Request</Text>
        </Button>
      )
      // Show contact info
      contactInfo = (
        <View>
          <Text>{this.props.contactInfo}</Text>
        </View>
      )
    }

    if(this.props.location.length > 0) {
      mapDisplay = (
        <View style={{height: 350, flex: 1, backgroundColor: '#f2f9fc'}}>
          <View style={{flex: 1}} />
          <View style={{flex: 20, flexDirection: 'row'}}>
            <View style={{flex: 1}} />
            <View style={{flex: 20}}>
              <MapView style={{height: 330, flex: 1}} region={{
                latitude: this.props.location[1],
                longitude: this.props.location[0],
                latitudeDelta: 0.009,
                longitudeDelta: 0.005}}>
                <MapView.Marker
                  coordinate={{
                    latitude: this.props.location[1],
                    longitude: this.props.location[0]}} />
              </MapView>
            </View>
            <View style={{flex: 1}} />
          </View>
          <View style={{flex: 1}} />
        </View>
      )
    }

    return (
      <Container>
        <Header title='Request Details' navigation={this.props.navigation} action='Back' style={GlobalStyleSheet.headerText} />
        <Content>
          <Grid>
            <Row style={GlobalStyleSheet.bgColor}>
              <Image style={{ height: 200, width: 500, justifyContent: 'center', alignItems: 'center' }} source={{ uri: this.props.game.bannerUrl }} />
            </Row>
          </Grid>
          <Body>
            <Text style={{ color: '#000000', fontSize: 30 }}>{this.props.postTitle}</Text>
          </Body>
          <Grid>
            <Col size={1} style={{ backgroundColor: '#f2f9fc', height: 100 }}>
              <Body>
                <Text style={{fontSize: 18}}>Host</Text>
                <Thumbnail source={{uri: hostPic}} />
                <Text>{hostUser.username}</Text>
              </Body>
            </Col>
            <Col size={1} style={{ backgroundColor: '#f2f9fc', height: 100 }}>
              <Body>
                <Text style={{fontSize: 18}}>Game</Text>
                <Thumbnail source={{uri: this.props.game.iconUrl}} />
                <Text>{this.props.game.name}</Text>
              </Body>
            </Col>
          </Grid>
          {mapDisplay}
          {contactInfo}
          {joinLeaveButton}
        </Content>
      </Container>
    )
  }
}

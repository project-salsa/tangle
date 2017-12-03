import React from 'react'
import { Text, Image } from 'react-native'
import {Container, Body, Title, Left, Content, Button, Icon, Thumbnail, View} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { inject } from 'mobx-react'
import axios from 'axios'

import DisplayMap from '../DisplayMap'

import Header from '../common/header'

@inject('authStore')
export default class RequestComponent extends React.Component {
  constructor (props) {
    super(props)

    this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  handleButtonPress (mode) {
    const { params } = this.props.navigation.state
    if (mode === 'Join') {
      // Make Join Request
      const axiosOptions = {
        method: 'POST',
        url: 'https://tangled.michaelbeaver.info/requests/' + params.requestId + '/join',
        headers: {
          Authorization: `Bearer ${this.props.authStore.token}`
        },
        json: true
      }
      axios(axiosOptions).then((response) => {
        console.log(response)
        this.forceUpdate()
      }).catch((err) => {
        console.log(err.message)
      })
    } else {
      // Make Leave Request
    }
  }

  render () {
    let hasJoined = false
    let contactInfo
    let joinLeaveButton = (
      <Button block primary onPress={() => this.props.handleJoin('Join')}>
        <Text style={{color: '#FFFFFF', fontSize: 18}}>Join Request</Text>
      </Button>
    )
    if (this.props.currentPlayers.length >= this.props.maxPlayers ) {
      joinLeaveButton = (
        <Button block primary disabled>
          <Text style={{color: '#FFFFFF', fontSize: 18}}>Join Request</Text>
        </Button>
      )
    }

    for (const player of this.props.currentPlayers) {
      if (player.username === this.props.authStore.username) {
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

    return (
      <Container>
        <Header title='Details' navigation={this.props.navigation} action='Back' />
        <Content>
          <Grid>
            <Row style={{ backgroundColor: '#776B76', height: 200 }}>
              <Image style={{ height: 200, width: 500, justifyContent: 'center', alignItems: 'center' }} source={{ uri: this.props.game.bannerUrl }} />
            </Row>
          </Grid>
          {/*<DisplayMap map_ht={250} mark_lat={this.state.location.latitude} mark_long={this.state.location.longitude}*/}
                      {/*focus />*/}
          <Body>
            <Text style={{ color: '#000000', fontSize: 36, fontStyle: 'italic' }}>{this.props.postTitle}</Text>
          </Body>
          <Grid>
            <Col size={1} style={{ backgroundColor: '#776B76', height: 100 }}>
              <Body>
                <Text style={{fontSize: 18}}>Host</Text>
                <Thumbnail source={this.props.hostUser.profilePic} />
                <Text>{this.props.hostUser.username}</Text>
              </Body>
            </Col>
            <Col size={1} style={{ backgroundColor: '#776B76', height: 100 }}>
              <Body>
                <Text style={{fontSize: 18}}>Place</Text>
                <Thumbnail source={{ uri: this.props.game.iconUrl }} />
                <Text>Location Name</Text>
              </Body>
            </Col>
            <Col size={1} style={{ backgroundColor: '#776B76', height: 100 }}>
              <Body>
                <Text style={{fontSize: 18}}>Game</Text>
                <Thumbnail source={{ uri: this.props.game.iconUrl }} />
                <Text>{this.props.game.name}</Text>
              </Body>
            </Col>
          </Grid>
          {contactInfo}
          {joinLeaveButton}
        </Content>
      </Container>
    )
  }
}

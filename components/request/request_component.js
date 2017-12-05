import React from 'react'
import {Text, View, Image} from 'react-native'
import {Container, Body, Title, Left, Content, Button, Icon, Thumbnail} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { inject } from 'mobx-react'
import axios from 'axios'

import DisplayMap from '../DisplayMap'
import GlobalStyleSheet from '../../style'
import Header from '../common/header'

@inject('authStore')
export default class RequestComponent extends React.Component {
  constructor (props) {
    super(props)
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
      if (player.username === this.props.authStore.user.username) {
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
        <Header title={this.props.postTitle} navigation={this.props.navigation} action='Back' style={GlobalStyleSheet.headerText} />
        <Content>
          <Grid>
            <Row style={GlobalStyleSheet.bgColor}>
              <Image style={{ height: 200, width: 500, justifyContent: 'center', alignItems: 'center' }} source={{ uri: this.props.game.bannerUrl }} />
            </Row>
          </Grid>

          <Body>
            <Text style={{ color: '#000000', fontSize: 36, fontStyle: 'italic' }}>{this.props.postTitle}</Text>
          </Body>
          <Grid>
            <Col size={1} style={{ backgroundColor: '#f2f9fc', height: 100 }}>
              <Body>
                <Text style={{fontSize: 18}}>Host</Text>
                <Thumbnail source={this.props.hostUser.profilePic} />
                <Text>{this.props.hostUser.username}</Text>
              </Body>
            </Col>
            <Col size={1} style={{ backgroundColor: '#f2f9fc', height: 100 }}>
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
          <View style={{height: 350, flex: 1, backgroundColor: '#f2f9fc'}}>
            <View style={{flex: 1}} />
            <View style={{flex: 20, flexDirection: 'row'}}>
              <View style={{flex: 1}} />
              <View style={{flex: 20}}>
                <DisplayMap
                  map_ht={330}
                  mark_lat={this.props.location[1]}
                  mark_long={this.props.location[0]}
                  focus
                />
              </View>
              <View style={{flex: 1}} />
            </View>
            <View style={{flex: 1}} />
          </View>
          {contactInfo}
          {joinLeaveButton}
        </Content>
      </Container>
    )
  }
}

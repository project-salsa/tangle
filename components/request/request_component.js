import React from 'react'
import {Text, View, Image, FlatList} from 'react-native'
import {Container, Body, Title, Left, Right, Content, Button, Icon, Thumbnail, List, ListItem} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import MapView from 'react-native-maps'
import { inject } from 'mobx-react'
import GlobalStyleSheet from '../../style'
import Header from '../common/header'

@inject('authStore')
export default class RequestComponent extends React.Component {
  constructor (props) {
    super(props)
    this.renderUser = this.renderUser.bind(this)
  }

  renderUser ({item}) {
    const { navigate } = this.props.navigation
    return (
      <ListItem
        avatar
        onPress={() => navigate('UserProfile', { username: item.username })}>
        <Left>
          <Thumbnail small source={{ uri: item.profilePicUrl }} />
        </Left>
        <Body>
          <Text>{item.username}</Text>
        </Body>
        <Right />
      </ListItem>
    )
  }

  render () {
    const currentUser = this.props.authStore.user
    const hostUser = this.props.hostUser
    let hasJoined = false
    let hostPic = 'https://tangled.michaelbeaver.info/assets/images/default-profile-pic.png'
    let contactInfo
    let mapDisplay
    let joinedUserList

    let joinLeaveButton = (
      <Button block primary onPress={() => this.props.handleJoin('Join')}>
        <Text style={{color: '#FFFFFF', fontSize: 18}}>Join Request</Text>
      </Button>
    )

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
      joinLeaveButton = null
      contactInfo = (
        <Grid>
          <Col size={1} style={{backgroundColor: '#f2f9fc'}}>
            <Body>
            <Text style={{fontSize: 20, textDecorationLine: 'underline'}}>Provided Contact Info</Text>
            <Text style={{ color: '#000000', fontSize: 18}}>{this.props.contactInfo}</Text>
            </Body>
          </Col>
        </Grid>
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
        <Grid>
          <Col size={1} style={{backgroundColor: '#f2f9fc'}}>
            <Body>
            <Text style={{fontSize: 20, textDecorationLine: 'underline'}}>Contact Host</Text>
            <Text style={{ color: '#000000', fontSize: 18}}>{this.props.contactInfo}</Text>
            </Body>
          </Col>
        </Grid>
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

    if(this.props.currentPlayers.length === 0) {
      joinedUserList = (
        <Grid>
          <Col size={1} style={{ height: 150 }}>
            <Body>
              <Text style={{color: '#605d66', fontSize: 18}}>Nobody's here!</Text>
            </Body>
          </Col>
        </Grid>
      )
    } else {
      joinedUserList = (
        <List>
          <FlatList
            data={this.props.currentPlayers}
            renderItem={this.renderUser}
            keyExtractor={item => item.username}
            extraData={this.state}
          />
        </List>
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
          <Grid>
            <Col size={1} style={{backgroundColor: '#f2f9fc'}}>
              <Body>
                <Text style={{ color: '#000000', fontSize: 22}}>Current Players</Text>
              </Body>
            </Col>
          </Grid>
          {joinedUserList}
        </Content>
      </Container>
    )
  }
}

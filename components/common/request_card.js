import React from 'react'
import { Card, CardItem, Col, Grid, Icon, Row, Text, Thumbnail } from 'native-base'
import GlobalStyleSheet from '../../style'
import { inject } from 'mobx-react'

@inject('authStore')
export default class RequestCard extends React.Component {
  render () {
    const { navigate } = this.props.navigation
    let bgColor = GlobalStyleSheet.tertiaryColor
    let textStyle = {
      fontSize: 16
    }
    let titleStyle = {

    }
    if (this.props.currentPlayers.length >= this.props.maxPlayers) {
      // Change BG Color if request is full
      bgColor = {
        backgroundColor: '#FFB3BA'
      }
    }
    let usernames = []
    this.props.currentPlayers.forEach((user) => {
      usernames.push(user.username)
    })
    if (usernames.includes(this.props.authStore.user.username)) {
      bgColor = {
        backgroundColor: '#BAE1FF'
      }
    }
    if (this.props.user.username === this.props.authStore.user.username) {
      bgColor = {
        backgroundColor: '#BAFFC9'
      }
    }
    return (
      <Card>
        <CardItem button style={bgColor}
          onPress={() => navigate('Request', { requestId: this.props.requestId })}>
          <Grid>
            <Col style={{ width: '20%' }} >
              <Thumbnail source={{ uri: this.props.game.iconUrl }} />
            </Col>
            <Col>
              <Row>
                <Text style={{ fontSize: 20, fontStyle: 'italic' }}>{this.props.title}</Text>
              </Row>
              <Row>
                <Col>
                  <Text style={{ fontSize: 16 }} >
                    <Icon name='md-person' style={{ fontSize: 16 }} /> {this.props.user.username}
                  </Text>
                </Col>
                <Col>
                  <Text style={{ fontSize: 16 }} >
                    <Icon name='md-people' style={{ fontSize: 16 }} /> {this.props.currentPlayers.length}/{this.props.maxPlayers}
                  </Text>
                </Col>
                <Col>
                  <Text style={{ fontSize: 16 }} >
                    <Icon name='md-pin' style={{ fontSize: 16 }} /> 1.2 mi
                  </Text>
                </Col>
              </Row>
            </Col>
          </Grid>
        </CardItem>
      </Card>
    )
  }
}

RequestCard.defaultProps = {
  requestId: '',
  title: '',
  user: '', // maybe this should be userId and we can grab info?
  tags: [], // may need to be changed based on what we want to do w/ the tag system
  game: {}, // Game object for the game being requested
  location: ''
}

import React from 'react'
import {Text} from 'react-native'
import {Container, Header, Body, Title, Left, Content, Button, Icon, Thumbnail} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import DisplayMap from '../DisplayMap'

export default class RequestComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isActive: true,
      profilePic: {uri: 'http://brand.mst.edu/media/universityadvancement/communications/images/logos/logo/Logo_356.jpg'},
      gamePic: {uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/500px-Overwatch_circle_logo.svg.png'},
      hasJoined: false
    }

    this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  handleButtonPress () {
    if (this.state.hasJoined === false) {
      this.state.hasJoined = true
    }
  }

  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Details</Title>
          </Body>
        </Header>
        <Content>
          <Grid>
            <Row style={{ backgroundColor: '#776B76', height: 200 }}>
              <Body>
                <Text>Banner Goes Here!</Text>
              </Body>
            </Row>
          </Grid>
          <DisplayMap mark_lat={37.9} mark_long={-91.8} focus />
          <Body>
            <Text style={{ color: '#000000', fontSize: 36, fontStyle: 'italic' }}>{this.props.postTitle}</Text>
          </Body>
          <Grid>
            <Col size={1} style={{ backgroundColor: '#776B76', height: 100 }}>
              <Body>
                <Text style={{fontSize: 18}}>Host</Text>
                <Thumbnail source={this.state.profilePic} />
                <Text>{this.props.hostUser.username}</Text>
              </Body>
            </Col>
            <Col size={1} style={{ backgroundColor: '#776B76', height: 100 }}>
              <Body>
                <Text style={{fontSize: 18}}>Place</Text>
                <Thumbnail source={this.state.gamePic} />
                <Text>{this.props.locationName}</Text>
              </Body>
            </Col>
            <Col size={1} style={{ backgroundColor: '#776B76', height: 100 }}>
              <Body>
                <Text style={{fontSize: 18}}>Game</Text>
                <Thumbnail source={this.state.gamePic} />
                <Text>{this.props.game.name}</Text>
              </Body>
            </Col>
          </Grid>
          <Button block primary>
            <Text style={{color: '#FFFFFF', fontSize: 18}}>Join</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

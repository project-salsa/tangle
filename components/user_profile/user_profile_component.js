import { Text, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon,
  Thumbnail, List, ListItem } from 'native-base'

// import Request from 'react-http-request';

export default class UserProfileComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: 'DummyUser',
      // TODO add profilePic to user schema in db and pull it from back-end
      profilePic: {uri: 'http://brand.mst.edu/media/universityadvancement/communications/images/logos/logo/Logo_356.jpg'},
      gameTags: ['game1', 'game2', 'game3', 'game4'],
      discord: 'DummyDiscord'
    }
  }

  render () {
    let styles = StyleSheet.create({
      title: {
        fontSize: 12
      },
      userValues: {
        fontSize: 24
      }
    })

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>User Profile</Title>
          </Body>
          <Right>
            <Button rounded light>
              <Text fontSize={4}>
                Edit Profile
              </Text>
              {/* TODO Make Edit Profile, only for user */}
            </Button>
          </Right>
        </Header>
        <Content>
          <Body>
            <Text style={styles.userValues}>
              {'\n'}
            </Text>
            {/* Thumbnail for Profile Picture */}
            <Thumbnail large source={this.state.profilePic} />
            {/* Display Username */}
            <Text style={styles.title}>
              {'\n'}
              Username
            </Text>
            <Text style={styles.userValues}>
              {this.props.username}
            </Text>
          </Body>
          <Text style={styles.title}>
            Discord
          </Text>
          <Text style={styles.userValues}>
            {this.props.discord}
          </Text>
          <Text style={styles.title}>
            {'\n'}
            Game Tags
          </Text>
          {/* /* Display Game Tags */}
          <List dataArray={this.props.gameTags}
            // style={ styles.userValues}
            renderRow={(item) =>
              <ListItem>
                <Text>{item}</Text>
              </ListItem>
            } />
        </Content>
      </Container>
    )
  }
}

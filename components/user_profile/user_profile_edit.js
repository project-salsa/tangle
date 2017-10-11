import { Text, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Thumbnail, Item, Input } from 'native-base'

// import Request from 'react-http-request';

export default class UserProfileEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {

      username: 'DummyUser',
      email: 'email@email.com',
      password: 'password123',
      profilePic: {uri: 'http://brand.mst.edu/media/universityadvancement/communications/images/logos/logo/Logo_356.jpg'},
      gameTags: ['game1', 'game2', 'game3', 'game4'],
      discord: 'DummyDiscord',
      steam: 'DummySteam',
      battlenet: 'DummyBattle.net'
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
    const { navigate } = this.props.navigation

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Edit Profile</Title>
          </Body>
          <Right>
            <Button full rounded light onPress={() => navigate('UserProfile')}>
              <Text fontSize={4}>
              Back
            </Text>
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
            {/* /* Display Username */}
            <Text style={styles.title}>
              {'\n'}
            Update Username
          </Text>
            <Item style={styles.userValues}>
              <Input onChangeText={(input) => this.setState({username: input})} />
            </Item>
            {/* /* Display Email */}
            <Text style={styles.title}>
              {'\n'}
              Update Email
            </Text>
            <Item style={styles.userValues}>
              <Input onChangeText={(input) => this.setState({email: input})} />
            </Item>
            {/* /* Display Password */}
            <Text style={styles.title}>
              {'\n'}
            Update Password
          </Text>
            <Item style={styles.userValues}>
              <Input onChangeText={(input) => this.setState({password: input})} />
            </Item>
          <Text style={styles.title}>
            {'\n'}
            Discord
          </Text>
          <Item style={styles.userValues}>
            <Input onChangeText={(input) => this.setState({discord: input})} />
          </Item>
            <Text style={styles.title}>
              {'\n'}
              Steam
            </Text>
            <Item style={styles.userValues}>
              <Input onChangeText={(input) => this.setState({steam: input})} />
            </Item>
            <Text style={styles.title}>
              {'\n'}
              Battle.net
            </Text>
            <Item style={styles.userValues}>
              <Input onChangeText={(input) => this.setState({battlenet: input})} />
            </Item>
          <Text style={styles.title}>
            {'\n'}
          </Text>
          <Button block info>
            <Text fontSize={20}>
              Save
            </Text>
          </Button>
          </Body>
        </Content>
      </Container>
    )
  }
}

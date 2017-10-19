import { Text, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Thumbnail, Item, Input } from 'native-base'
import axios from 'axios'

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
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleInputChange (event) {
    const target = event.target
    const val = target.type
    const name = target.name

    this.setState({
      [name]: val
    })
  }

  handleSubmit () {
    const { navigate } = this.props.navigation
    axios.post('/users', {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      profilePic: this.state.profilePic,
      gameTags: this.state.gameTags,
      discord: this.state.discord,
      steam: this.state.steam,
      battlenet: this.state.battlenet
    })
      .then((resp) => {
        console.log(resp)
        navigate('Dashboard')
      }, (err) => {
        console.log(err)
      }).catch((err) => {
        console.log(err)
      })
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
              <Input
                name='username'
                onChangeText={this.handleInputChange}
              />
            </Item>
            {/* /* Display Email */}
            <Text style={styles.title}>
              {'\n'}
              Update Email
            </Text>
            <Item style={styles.userValues}>
              <Input
                name='email'
                onChangeText={this.handleInputChange}
              />
            </Item>
            {/* /* Display Password */}
            <Text style={styles.title}>
              {'\n'}
            Update Password
          </Text>
            <Item style={styles.userValues}>
              <Input
                name='password'
                onChangeText={this.handleInputChange}
              />
            </Item>
            <Text style={styles.title}>
              {'\n'}
            Discord
          </Text>
            <Item style={styles.userValues}>
              <Input
                name='discord'
                onChangeText={this.handleInputChange}
              />
            </Item>
            <Text style={styles.title}>
              {'\n'}
              Steam
            </Text>
            <Item style={styles.userValues}>
              <Input
                name='steam'
                onChangeText={this.handleInputChange}
              />
            </Item>
            <Text style={styles.title}>
              {'\n'}
              Battle.net
            </Text>
            <Item style={styles.userValues}>
              <Input
                name='battlenet'
                onChangeText={this.handleInputChange}
            />
            </Item>
            <Text style={styles.title}>
              {'\n'}
            </Text>
            <Button block info onPress={this.handleSubmit}>
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

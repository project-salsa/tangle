import { Text, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Thumbnail, Item, Input } from 'native-base'
import axios from 'axios'
import Loader from '../Loader'
import { inject } from 'mobx-react'

// import Request from 'react-http-request';
@inject ('authStore')
export default class UserProfileEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: this.props.authStore.user.username,
      email: this.props.authStore.user.email,
      profilePic: this.props.authStore.user.profilePic,
      subscribedTags: this.props.authStore.user.subscribedTags,
      discordID: this.props.authStore.user.discordID,
      steamID: this.props.authStore.user.steamID,
      battlenetID: this.props.authStore.user.battlenetID,
      isLoading: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    this.setState({ isLoading: true })
    const { navigate } = this.props.navigation
    const axiosOptions = {
      method: 'PUT',
      url: 'https://tangled.michaelbeaver.info/users/' + this.state.username + '/',
      data: {
        currentPassword: String,
        EditData: {
          email: this.state.email,
          password: this.state.password,
          profilePic: this.state.profilePic,
          subscribedTags: this.state.subscribedTags,
          discordID: this.state.discordID,
          steamID: this.state.steamID,
          battlenetID: this.state.battlenetID
        }
      },
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    };
    axios(axiosOptions).then((resp) => {
      if (resp.data.success) {
        console.log(resp)
        navigate('UserProfile')
        this.setState({ isLoading: false })
      }
      console.log(resp.data)
    }).catch((err) => {
      // TODO: Log errors
      console.log(JSON.stringify(err))
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

    return (
      <Container>
        <Header style={{marginTop: 24}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='md-arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Edit Profile</Title>
          </Body>
        </Header>
        <Content>
          <Body>
            <Text style={styles.userValues}>
              {'\n'}
            </Text>
            {/* Thumbnail for Profile Picture */}
            <Thumbnail large source={this.state.profilePic} />
            <Text style={styles.title}>
              {'\n'}
            Update Profile Picture
          </Text>
            <Item style={styles.userValues}>
              <Input
                name='profilePic'
                onChangeText={(text) => this.setState({profilePic: text})}
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
                onChangeText={(text) => this.setState({email: text})}
              />
            </Item>
            {/* /* Display Password */}
            <Text style={styles.title}>
              {'\n'}
            Update Password
          </Text>
            <Item style={styles.userValues}>
              <Input secureTextEntry
                name='password'
                onChangeText={(text) => this.setState({password: text})}
              />
            </Item>
            <Text style={styles.title}>
              {'\n'}
            Discord
          </Text>
            <Item style={styles.userValues}>
              <Input
                name='discordID'
                onChangeText={(text) => this.setState({discordID: text})}
              />
            </Item>
            <Text style={styles.title}>
              {'\n'}
              Steam
            </Text>
            <Item style={styles.userValues}>
              <Input
                name='steamID'
                onChangeText={(text) => this.setState({steamID: text})}
              />
            </Item>
            <Text style={styles.title}>
              {'\n'}
              Battle.net
            </Text>
            <Item style={styles.userValues}>
              <Input
                name='battlenetID'
                onChangeText={(text) => this.setState({battlenetID: text})}
            />
            </Item>
            <Text style={styles.title}>
              {'\n'}
              Your Tags
            </Text>
            <Item style={styles.userValues}>
              <Input
                name='subscribedTags'
                onChangeText={(text) => this.setState({subscribedTags: text})}
              />
            </Item>
            <Text style={styles.title}>
              {'\n'}
              Please Enter Current Password
            </Text>
            <Item style={styles.userValues}>
              <Input secureTextEntry
                name='currentPassword'
                onChangeText={(text) => this.setState({currentPassword: text})}
              />
            </Item>
            <Text style={styles.title}>
              {'\n'}
            </Text>
            <Button full primary onPress={this.handleSubmit}>
              <Text>
              Save
            </Text>
            </Button>
          </Body>
        </Content>
      </Container>
    )
  }
}

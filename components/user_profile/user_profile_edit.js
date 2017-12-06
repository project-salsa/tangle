import { Text, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Thumbnail, Item, Input } from 'native-base'
import axios from 'axios'
import Loader from '../Loader'
import { inject } from 'mobx-react'

@inject ('authStore')
export default class UserProfileEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: this.props.authStore.user.username,
      email: this.props.authStore.user.email,
      password: this.props.authStore.user.password,
      profilePic: this.props.authStore.user.profilePic,
      subscribedTags: this.props.authStore.user.subscribedTags,
      discordId: this.props.authStore.user.discordId,
      steamId: this.props.authStore.user.steamId,
      battleNetId: this.props.authStore.user.battleNetId,
      isLoading: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    this.setState({ isLoading: true })
    const { navigate } = this.props.navigation
    const editInfo = ['password', 'email', 'profilePic', 'subscribedTags', 'discordId', 'steamId', 'battleNetId']
    const editData = {}
    for (const key of editInfo) {
      if (typeof editInfo[key] !== 'undefined' && editInfo[key] !== '') {
        switch (key) {
          case 'subscribedTags':
            editData[key] = this.state[key].split(',')
            break
          default:
            editData[key] = editInfo[key]
        }
      }
    }

    const axiosOptions = {
      method: 'PUT',
      url: 'https://tangled.michaelbeaver.info/users/' + this.state.username,
      data: {
        currentPassword: this.state.currentPassword,
        editData: editData
      },
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    };
    console.log("In HandleSubmit!")
    axios(axiosOptions).then((resp) => {
      console.log("Using Axios!")
      if (resp.data.success) {
        console.log("In Success")
        console.log(resp)
        navigate('UserProfile')
        this.setState({ isLoading: false })
      }
      console.log(resp.data)
    }).catch((err) => {
      console.log("FAILED")
      // TODO: Log errors
      console.log(JSON.stringify(err))
    })
  }

  render () {
    if (this.state.isLoading) { return ( <Loader /> ) }
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
            <Item>
              <Input
                style={styles.userValues}
                name='profilePic'
                onChangeText={(text) => this.setState({profilePic: text})}
              />
            </Item>
            {/* /* Display Email */}
            <Text style={styles.title}>
              {'\n'}
              Update Email
            </Text>
            <Item>
              <Input
                style={styles.userValues}
                name='email'
                onChangeText={(text) => this.setState({email: text})}
              />
            </Item>
            {/* /* Display Password */}
            <Text style={styles.title}>
              {'\n'}
            Update Password
          </Text>
            <Item>
              <Input
                style={styles.userValues}
                secureTextEntry
                name='password'
                onChangeText={(text) => this.setState({password: text})}
              />
            </Item>
            <Text style={styles.title}>
              {'\n'}
            Discord
          </Text>
            <Item>
              <Input
                style={styles.userValues}
                name='discordId'
                onChangeText={(text) => this.setState({discordId: text})}
              />
            </Item>
            <Text style={styles.title}>
              {'\n'}
              Steam
            </Text>
            <Item>
              <Input
                style={styles.userValues}
                name='steamId'
                onChangeText={(text) => this.setState({steamId: text})}
              />
            </Item>
            <Text style={styles.title}>
              {'\n'}
              Battle.net
            </Text>
            <Item>
              <Input
                style={styles.userValues}
                name='battleNetId'
                onChangeText={(text) => this.setState({battleNetId: text})}
            />
            </Item>
            <Text style={styles.title}>
              {'\n'}
              Your Tags
            </Text>
            <Item>
              <Input
                style={styles.userValues}
                value={this.state.subscribedTags.toString()}
                name='subscribedTags'
                onChangeText={(text) => this.setState({subscribedTags: text})}
              />
            </Item>
            <Text style={styles.title}>
              {'\n'}
              Please Enter Current Password
            </Text>
            <Item>
              <Input
                style={styles.userValues}
                secureTextEntry
                name='currentPassword'
                onChangeText={(text) => this.setState({currentPassword: text})}
              />
            </Item>
            <Text>
              {'\n'}
            </Text>
            <Button full primary onPress={this.handleSubmit}>
              <Text style={{color: 'white', fontSize: 24}}>
              Save
            </Text>
            </Button>
          </Body>
        </Content>
      </Container>
    )
  }
}

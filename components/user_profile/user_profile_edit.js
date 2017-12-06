import { Text, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Thumbnail, Item, Input, Toast } from 'native-base'
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
      editData: {
        currentPassword: '',
        username: '',
        email: '',
        password: '',
        profilePic: '',
        subscribedTags: '',
        discordId: '',
        steamId: '',
        battleNetId: ''
      },
      isLoading: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    this.setState({ isLoading: true })
    const { navigate } = this.props.navigation
    const validFields = ['password', 'email', 'profilePic', 'subscribedTags', 'discordId', 'steamId', 'battleNetId']
    const axiosData = {}
    const editData = this.state.editData
    for (const field of validFields) {
      const data = editData[field]
      if (typeof data !== 'undefined' && data !== null && data !== '') {
        switch (field) {
          case 'subscribedTags':
            if (editData[field].length > 0) {
              axiosData[field] = editData[field]
            }
            break
          default:
            axiosData[field] = editData[field]
        }
      }
    }
    console.log(axiosData)
    const axiosOptions = {
      method: 'PUT',
      url: 'https://tangled.michaelbeaver.info/users/' + this.state.username,
      data: {
        currentPassword: this.state.editData.currentPassword,
        editData: axiosData
      },
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    };
    axios(axiosOptions).then((resp) => {
      if (resp.data.success) {
        console.log(resp)
        this.props.authStore
          .getUserData(this.props.authStore.user.username)
          .then(() => {
            this.setState({ isLoading: false })
            navigate('UserProfile')
          })
      }
      console.log(resp.data)
    }).catch((err) => {
      // TODO: Log errors
      console.log(JSON.stringify(err))
      Toast.show({
        text: 'Something went wrong, please try again.',
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000
      })
      this.setState({ isLoading: false })
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
                onChangeText={(text) => {
                  const editData = this.state.editData
                  editData.profilePic = text
                  this.setState({editData: editData})
                }
                }
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
                onChangeText={(text) => {
                  const editData = this.state.editData
                  editData.email = text
                  this.setState({editData: editData})
                }
                }
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
                onChangeText={(text) => {
                  const editData = this.state.editData
                  editData.password = text
                  this.setState({editData: editData})
                }
                }
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
                onChangeText={(text) => {
                  const editData = this.state.editData
                  editData.discordId = text
                  this.setState({editData: editData})
                }
                }
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
                onChangeText={(text) => {
                  const editData = this.state.editData
                  editData.steamId = text
                  this.setState({editData: editData})
                }
                }
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
                onChangeText={(text) => {
                  const editData = this.state.editData
                  editData.battleNetId = text
                  this.setState({editData: editData})
                }
                }
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
                onChangeText={(text) => {
                  const editData = this.state.editData
                  editData.subscribedTags = text
                  this.setState({editData: editData})
                }
                }
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
                onChangeText={(text) => {
                  const editData = this.state.editData
                  editData.currentPassword = text
                  this.setState({editData: editData})
                }
                }
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

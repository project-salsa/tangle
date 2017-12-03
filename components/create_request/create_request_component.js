import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import {Container, Header, Body, Title, Text, Form, Left, Content, Picker, Button, Icon, Item, Label, Input} from 'native-base'
import axios from 'axios'
import { inject } from 'mobx-react'
import Autocomplete from 'react-native-autocomplete-input'


@inject('authStore')
export default class CreateRequestComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      postTitle: '',
      hostUser: this.props.authStore.username,
      gameSelection: '',
      platform: '',
      tags: [],
      locationName: '',
      maxPlayers: 2,
      contactInfo: '',
      platformList: [],
      platformReady: false
    }

    this.getGames = this.getGames.bind(this)
    this.updatePlatforms = this.updatePlatforms.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  updatePlatforms() {
    // TODO: Stop component from running this code when it's not necessary
    const axiosOptions = {
      method: 'GET',
      url: this.props.serverAddress + '/games/' + this.state.gameSelection,
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    };
    axios(axiosOptions).then((response) => {
      if (response.data.success) {
        this.setState({platformList: response.data.game.platforms, platformReady: true})
      }
    }).catch((err) => {
      // TODO: Log Errors instead of printing them to console
      console.log(err.message)
    })
  }

  getGames(query) {
    if (query === '') {
      return [];
    }
    const trimmedQuery = query.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').trim()
    const regex = new RegExp(trimmedQuery, 'i');
    return this.props.gamesList.filter(game => game.search(regex) >= 0);
  }

  handleSubmit () {
    const { navigate } = this.props.navigation
    // TODO: In the data section here, I think we can make this less verbose using some ES6 spread syntax.
    // Not a big deal since it's a code style issue, but worth looking into later.
    const axiosOptions = {
      method: 'POST',
      url: this.props.serverAddress + '/requests',
      data: {
        title: this.state.postTitle,
        user: this.state.hostUser,
        game: this.state.gameSelection,
        platform: this.state.platform,
        tags: this.state.tags,
        location: this.state.locationName,
        maxPlayers: this.state.maxPlayers,
        contactInfo: this.state.contactInfo,
        currentPlayers: []
      },
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    };
    axios(axiosOptions).then((resp) => {
      if (resp.data.success) {
        navigate('Request', {requestId: resp.data.requestId})
      }
    }).catch((err) => {
      // TODO: Log errors
      console.log(err.message)
    })
  }



  render () {
    const displayGames = this.getGames(this.state.gameSelection)

    let platformSelect
    if (this.props.gamesList.indexOf(this.state.gameSelection) > -1) {
      this.updatePlatforms()
      if (this.state.platformReady) {
        platformSelect = (
          <View>
            <Text>Select a Platform</Text>
            <Picker
              iosHeader='Select a Platform'
              placeholder='Choose...'
              mode='dialog'
              prompt='Platform'
              selectedValue={this.state.platform}
              onValueChange={(value) => this.setState({platform: value})}>
              {this.state.platformList.map((item, index) => {
                return (<Item label={item} value={item} key={index}/>)
              })}
            </Picker>
          </View>
        )
      }
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Create Game Request</Title>
          </Body>
        </Header>
        <Content padder
          keyboardShouldPersistTaps='always'>
          <Form>
            <Item floatingLabel>
              <Label>Post Title</Label>
              <Input
                name='postTitle'
                onChangeText={(text) => this.setState({postTitle: text})} />
            </Item>

            <View padder>
              <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                data={displayGames[0] === this.state.gameSelection ? [] : displayGames}
                defaultValue={this.state.gameSelection}
                onChangeText={text => this.setState({ gameSelection: text })}
                placeholder='Enter game title...'
                renderItem={(data) => (
                  <TouchableOpacity onPress={() => this.setState({gameSelection: data})}>
                    <Text>{data}</Text>
                  </TouchableOpacity> )} />
            </View>

            {platformSelect}

            <Item floatingLabel>
              <Label>Number of Players</Label>
              <Input padder
                name='maxPlayers'
                type='number'
                keyboardType='numeric'
                maxLength={2}
                onChangeText={(text) => this.setState({maxPlayers: text})} />
            </Item>

            <Item floatingLabel>
              <Label>Location</Label>
              <Input padder
                name='locationName'
                onChangeText={(text) => this.setState({locationName: text})} />
              {/* TODO Change to Daniel's location select component */}
            </Item>

            <Item floatingLabel>
              <Label>Preferred Contact</Label>
              <Input padder
                 name='contactInfo'
                 defaultValue={this.props.defaultContact}
                 onChangeText={(text) => this.setState({contactInfo: text})} />
            </Item>
            </Form>

            <Button full primary
              onPress={this.handleSubmit}>
              <Text>Send Request</Text>
            </Button>
        </Content>
      </Container>
    )
  }
}

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
      platformList: [],
      gameSelected: false
    }

    this.getGames = this.getGames.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate() {
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
        this.state.platformList = response.data.game.platforms
        console.log(this.state.platformList)
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
    const gamesList = this.getGames(this.state.gameSelection)

    let platformSelect
    if (this.state.gameSelected) {
      platformSelect = (
        <View>
          <Picker
              iosHeader='Select a Platform'
              placeholder={'Choose...'}
              mode='dialog'
              prompt='Select a Platform'
              selectedValue={this.state.platform}
              onValueChange={(value) => this.setState({platform: value})}>
            <Text>Select a Platform</Text>
            {this.state.platformList.map((item, index) => {
              return (<Item label={item} value={item} key={index} />)
            })}
          </Picker>
        </View>
      )
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
                data={gamesList[0] === this.state.gameSelection ? [] : gamesList}
                defaultValue={this.state.gameSelection}
                onChangeText={text => this.setState({ gameSelection: text })}
                placeholder='Enter game title...'
                renderItem={data => (
                  <TouchableOpacity onPress={() => this.setState({gameSelection: data, gameSelected: true})}>
                    <Text>{data}</Text>
                  </TouchableOpacity> )} />
            </View>
            <View>
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
            </View>
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

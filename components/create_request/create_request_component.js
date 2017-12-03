import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import {Container, Title, Text, Form, Left, Content, Picker, Button, Icon, Item, Label, Input} from 'native-base'
import axios from 'axios'
import { inject } from 'mobx-react'
import Autocomplete from 'react-native-autocomplete-input'
import SelectMap from '../SelectMap'
import Header from '../common/header'
import GlobalStyleSheet from '../../style'

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
      maxPlayers: 2,
      contactInfo: '',
      platformList: [],
      platformReady: false,
      location: [0, 0]
    }

    this.updatePlatforms = this.updatePlatforms.bind(this)
    this.getGames = this.getGames.bind(this)
    this.handleCoordinateChange = this.handleCoordinateChange.bind(this)
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

  handleCoordinateChange(coordinate) {
    this.setState({ location: [coordinate.longitude, coordinate.latitude] })
  }

  handleSubmit () {
    const { navigate } = this.props.navigation
    const axiosOptions = {
      method: 'POST',
      url: this.props.serverAddress + '/requests',
      data: {
        title: this.state.postTitle,
        user: this.state.hostUser,
        game: this.state.gameSelection,
        platform: this.state.platform,
        tags: this.state.tags,
        location: this.state.location,
        maxPlayers: this.state.maxPlayers,
        contactInfo: this.state.contactInfo,
        currentPlayers: []
      },
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    }
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
      <Container style={GlobalStyleSheet.bgColor}>
        <Header
          title='Create New Request'
          navigation={this.props.navigation}
          style={GlobalStyleSheet.headerText}
          action='Back' />
        <Content padder
          keyboardShoultPersistTaps='always'>
          <Form>
            <Item>
              <Input
                name='postTitle'
                placeholder='Post Title'
                onChangeText={(text) => this.setState({postTitle: text})} />
            </Item>

            <View>
              <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={GlobalStyleSheet.bgColor}
                data={displayGames[0] === this.state.gameSelection ? [] : displayGames}
                defaultValue={this.state.gameSelection}
                onChangeText={text => this.setState({ gameSelection: text })}
                placeholder='Enter game title...'
                style={GlobalStyleSheet.bgColor}
                renderItem={(data) => (
                  <Button onPress={() => this.setState({gameSelection: data})}>
                    <Text>{data}</Text>
                  </Button> )} />
            </View>

            {platformSelect}

            <Text>Tap your location on the map</Text>
            <SelectMap map_ht={250} getCoordinate={this.handleCoordinateChange} />

            <Item style={GlobalStyleSheet.bgColor}>
              <Input padder
                     name='maxPlayers'
                     placeholder='Number of Players'
                     type='number'
                     keyboardType='numeric'
                     maxLength={2}
                     onChangeText={(text) => this.setState({maxPlayers: text})} />
            </Item>

            <Item last style={GlobalStyleSheet.bgColor}>
              <Input padder
                 name='contactInfo'
                 placeholder='Preferred Contact Info'
                 defaultValue={this.props.defaultContact}
                 onChangeText={(text) => this.setState({contactInfo: text})} />
            </Item>
          </Form>

          <Button full primary
            onPress={this.handleSubmit}>
            <Text>Create Request</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

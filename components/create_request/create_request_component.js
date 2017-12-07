import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import {Container, Title, Text, Form, Left, Content, Picker, Button, Icon, Item, Label, Input, Toast} from 'native-base'
import axios from 'axios'
import { inject } from 'mobx-react'
import Loader from '../Loader'
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
      hostUser: this.props.authStore.user.username,
      gameSelection: '',
      platform: '',
      genres: [],
      tags: [],
      maxPlayers: 2,
      contactInfo: '',
      platformList: [],
      platformReady: false,
      location: [0, 0],
      locSelected: false,
      isLoading: false,
      showToast: false
    }

    this.updatePlatforms = this.updatePlatforms.bind(this)
    this.getGames = this.getGames.bind(this)
    this.handleCoordinateChange = this.handleCoordinateChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  updatePlatforms() {
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
        this.setState({
          platformList: response.data.game.platforms,
          platformReady: true,
          platform: response.data.game.platforms[0],
          genres: response.data.game.genres
        })
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
    this.setState({ location: [coordinate.longitude, coordinate.latitude], locSelected: true })
  }

  handleSubmit () {
    const { navigate } = this.props.navigation
    if (this.state.locSelected === false) {
      Toast.show({
        text: 'You need to select a location.',
        position: 'bottom',
        buttonText: 'Okay',
        duration: 6000
      })
    } else {
      this.setState({isLoading: true})
      const axiosOptions = {
        method: 'POST',
        url: this.props.serverAddress + '/requests',
        data: {
          title: this.state.postTitle,
          user: this.state.hostUser,
          game: this.state.gameSelection,
          platform: this.state.platform,
          tags: this.state.tags + this.state.genres,
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
          this.setState({isLoading: false})
          navigate('Request', {requestId: resp.data.requestId})
        }
      }).catch((err) => {
        // TODO: Log errors
        console.log(err.message)
        this.setState({isLoading: false, platformReady: false})
      })
    }
  }

  componentDidMount () {
    // Set initial contact to the autofill option
    // This is in here so we know that the props are set for sure.
    this.setState({
      contactInfo: this.props.defaultContact
    })
  }

  render () {
    if (this.state.isLoading) { return ( <Loader /> ) }
    const displayGames = this.getGames(this.state.gameSelection)

    let platformSelect
    if (this.props.gamesList.indexOf(this.state.gameSelection) > -1) {
      if (!this.state.platformReady){
        this.updatePlatforms()
      } else {
        platformSelect = (
          <View>
            <Text>   Select a Platform</Text>
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
          behavior='padding'
          keyboardShoultPersistTaps='always'>
          <Form>
            <Item>
              <Input
                name='postTitle'
                placeholder='Post Title'
                onChangeText={(text) => this.setState({postTitle: text})} />
            </Item>

            <View>
              <Text>   Select a game</Text>
              <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={GlobalStyleSheet.bgColor}
                data={displayGames[0] === this.state.gameSelection ? [] : displayGames}
                defaultValue={this.state.gameSelection}
                onChangeText={text => this.setState({ gameSelection: text, platformReady: false })}
                placeholder='Enter game title...'
                style={GlobalStyleSheet.bgColor}
                renderItem={(data) => (
                  <TouchableOpacity onPress={() => this.setState({gameSelection: data})}>
                    <Text>{data}</Text>
                  </TouchableOpacity> )} />
            </View>

            {platformSelect}

            <Text>   Tap your location on the map</Text>
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
      </Container >
    )
  }
}

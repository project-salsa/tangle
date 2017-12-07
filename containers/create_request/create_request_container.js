import React from 'react'
import axios from 'axios'
import CreateRequestComponent from '../../components/create_request/create_request_component'
import { inject } from 'mobx-react'
import Loader from '../../components/Loader'

@inject('authStore')
export default class CreateRequestView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      serverAddress: 'https://tangled.michaelbeaver.info',
      gamesList: [],
      defaultContact: '',
      isLoading: false,
      isReady: false
    }
  }

  componentDidMount () {
    this.setState({ isLoading: true })
    const axiosOptions = {
      method: 'GET',
      url: this.state.serverAddress + '/games',
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    }
    axios(axiosOptions).then((response) => {
      if (response.data.success) {
        this.setState({
          gamesList: response.data.games
        })
        let contact
        if (this.props.authStore.user.discordId) {
          contact = 'Discord: ' + this.props.authStore.user.discordId
        }
        else if (this.props.authStore.user.steamId) {
          contact = 'Steam: ' + this.props.authStore.user.steamId
        }
        else if (this.props.authStore.user.battleNetId) {
          contact = 'BattleNet: ' + this.props.authStore.user.battleNetId
        }
        else {
          contact = ''
        }
        this.setState({
          defaultContact: contact,
          isLoading: false,
          isReady: true
        })
      }
    }).catch((err) => {
      // TODO: Log Errors instead of printing them to console
      console.log(err.message)
    })
  }

  render () {
    if (this.state.isLoading) { return <Loader /> }
    if (this.state.isReady) {
      return (
        <CreateRequestComponent
          serverAddress={this.state.serverAddress}
          navigation={this.props.navigation}
          gamesList={this.state.gamesList}
          defaultContact={this.state.defaultContact}/>
      )
    }
    return <Loader />
  }
}

import React from 'react'
import axios from 'axios'
import CreateRequestComponent from '../../components/create_request/create_request_component'
import { inject } from 'mobx-react'

@inject('authStore')
export default class CreateRequestView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      serverAddress: 'https://tangled.michaelbeaver.info',
      gamesList: [],
      defaultContact: ''
    }
  }

  componentDidMount () {
    const axiosOptions = {
      method: 'GET',
      url: this.state.serverAddress + '/games',
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    };
    axios(axiosOptions).then((response) => {
      if (response.data.success) {
        this.setState({
          gamesList: response.data.games
        })
      }
    }).catch((err) => {
      // TODO: Log Errors instead of printing them to console
      console.log(err.message)
    })
    const axiosOptions2 = {
      method: 'GET',
      url: this.state.serverAddress + '/users/' + this.props.authStore.username,
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    };
    axios(axiosOptions2).then((response) => {
      if (response.data.success) {
        let contact
        if (response.data.user.discordId) {
          contact = response.data.user.discordId
        }
        else if (response.data.user.steamId) {
          contact = response.data.user.steamId
        }
        else if (response.data.user.battleNetId) {
          contact = response.data.user.battleNetId
        }
        this.setState({
          defaultContact: contact
        })
      }
    })
  }

  render () {
    return (
      <CreateRequestComponent
        serverAddress={this.state.serverAddress}
        navigation={this.props.navigation}
        gamesList={this.state.gamesList}
        defaultContact={this.state.defaultContact} />
    )
  }
}

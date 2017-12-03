import React from 'react'
import axios from 'axios'
import RequestComponent from '../../components/request/request_component'
import { inject } from 'mobx-react'

@inject('authStore')
export default class RequestContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      postTitle: '',
      hostUser: '',
      game: '',
      platform: '',
      tags: [],
      maxPlayers: 2,
      currentPlayers: [],
      serverAddress: 'https://tangled.michaelbeaver.info',
      location: {
        latitude: '',
        longitude: ''
      }
    }
  }

  componentDidMount () {
    const axiosOptions = {
            method: 'GET',
            url: this.state.serverAddress + '/requests/' + this.props.navigation.state.params.requestId,
            headers: {
              Authorization: `Bearer ${this.props.authStore.token}`
            },
            json: true
          };
    axios(axiosOptions).then((response) => {
      const request = response.data.request

      if (response.data.success) {
        this.setState({
          postTitle: request.title,
          hostUser: request.user,
          game: request.game,
          platform: request.platform,
          tags: request.tags,
          maxPlayers: request.maxPlayers,
          currentPlayers: request.currentPlayers,
          location: {
            latitude: request.location.latitude,
            longitude: request.location.longitude
          }
        })
      }
    }).catch((err) => {
      // TODO: Log Errors instead of printing them to console
      console.log(err.message)
    })
  }

  render () {
    return (
      <RequestComponent
        navigation={this.props.navigation}
        postTitle={this.state.postTitle}
        hostUser={this.state.hostUser}
        game={this.state.game}
        platform={this.state.platform}
        tags={this.state.tags}
        maxPlayers={this.state.maxPlayers}
        coords={this.state.location}
      />
    )
  }
}

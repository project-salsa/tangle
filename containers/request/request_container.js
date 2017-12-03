import React from 'react'
import axios from 'axios'
import { inject } from 'mobx-react'

import RequestComponent from '../../components/request/request_component'
import Loader from '../../components/Loader'

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
      location: [],
      contactInfo: '',
      infoOutOfDate: false
    }

    this.handleJoin = this.handleJoin.bind(this)
  }

  handleJoin (mode) {
    const { params } = this.props.navigation.state
    if (mode === 'Join') {
      // Make Join Request
      const axiosOptions = {
        method: 'POST',
        url: 'https://tangled.michaelbeaver.info/requests/' + params.requestId + '/join',
        headers: {
          Authorization: `Bearer ${this.props.authStore.token}`
        },
        json: true
      }
      axios(axiosOptions).then((response) => {
        console.log(response)
        this.setState({ infoOutOfDate: true })
      }).catch((err) => {
        console.log(err.message)
      })
    } else {
      const axiosOptions = {
        method: 'POST',
        url: 'https://tangled.michaelbeaver.info/requests/' + params.requestId + '/leave',
        headers: {
          Authorization: `Bearer ${this.props.authStore.token}`
        },
        json: true
      }
      axios(axiosOptions).then((response) => {
        console.log(response)
        this.setState({ infoOutOfDate: true })
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }

  updateRequest () {
    const axiosOptions = {
      method: 'GET',
      url: this.state.serverAddress + '/requests/' + this.props.navigation.state.params.requestId,
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    }
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
          location: request.location.coordinates,
          contactInfo: request.contactInfo,
          infoOutOfDate: false
        })
      }
    }).catch((err) => {
      // TODO: Log Errors instead of printing them to console
      console.log(err.message)
    })
  }


  componentDidMount () {
    const axiosOptions = {
      method: 'GET',
      url: this.state.serverAddress + '/requests/' + this.props.navigation.state.params.requestId,
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    }
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
          location: request.location.coordinates,
          contactInfo: request.contactInfo
        })
      }
    }).catch((err) => {
      // TODO: Log Errors instead of printing them to console
      console.log(err.message)
    })
  }

  render () {
    if (this.state.infoOutOfDate) {
      this.updateRequest()
      // TODO: Loading overlay
      return (
        <Loader />
      )
    } else {
      return (
        <RequestComponent
          navigation={this.props.navigation}
          postTitle={this.state.postTitle}
          hostUser={this.state.hostUser}
          game={this.state.game}
          platform={this.state.platform}
          tags={this.state.tags}
          currentPlayers={this.state.currentPlayers}
          maxPlayers={this.state.maxPlayers}
          location={this.state.location}
          contactInfo={this.state.contactInfo}
          handleJoin={this.handleJoin}
        />
      )
    }
  }
}

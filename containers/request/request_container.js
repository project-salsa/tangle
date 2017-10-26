import React from 'react'
import axios from 'axios'
import RequestComponent from '../../components/request/request_component'

export default class RequestContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      postTitle: '',
      hostUser: '',
      game: '',
      platform: '',
      tags: [],
      locationName: '',
      maxPlayers: 2,
      currentPlayers: [],
      serverAddress: 'https://tangled.michaelbeaver.info'
    }
  }

  componentDidMount () {
    axios.get(this.state.serverAddress + '/requests/' + this.props.requestId).then((response) => {
      const request = response.data.request
      this.setState({
        postTitle: request.title,
        hostUser: request.user,
        game: request.game,
        platform: request.platform,
        tags: request.tags,
        locationName: request.location,
        maxPlayers: request.maxPlayers,
        currentPlayers: request.currentPlayers
      })
    }).catch((err) => {
      console.log(err)
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
        locationName={this.state.locationName}
        maxPlayers={this.state.maxPlayers} />
    )
  }
}

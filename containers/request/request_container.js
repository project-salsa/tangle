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
      this.setState({
        postTitle: response.data.title,
        hostUser: response.data.user,
        game: response.data.game,
        platform: response.data.platform,
        tags: response.data.tags,
        locationName: response.data.location,
        maxPlayers: response.data.maxPlayers,
        currentPlayers: response.data.currentPlayers
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

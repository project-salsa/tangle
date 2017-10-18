import React from 'react'
import axios from 'axios'
import RequestComponent from '../../components/request/request_component'

export default class RequestContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      postTitle: 'DummyPost',
      hostUser: 'DummyUser',
      game: 'CoolGame',
      platform: 'DummyBox 4',
      tags: [],
      locationName: 'DummyTown',
      maxPlayers: 2,
      currentPlayers: [],
      isActive: false
    }
  }
/*
  componentDidMount () {
    axios.get('/requests').then((data) => {
      this.setState({
        postTitle: data.title,
        hostUser: data.user.username,
        game: data.game.name,
        platform: data.platform,
        tags: data.tags,
        locationName: data.location,
        maxPlayers: data.maxPlayers,
        currentPlayers: data.currentPlayers,
        isActive: data.isActive
      })
    }, (err) => {
      console.log(err)
    }).catch((err) => {
      console.log(err)
    })
  }
*/
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

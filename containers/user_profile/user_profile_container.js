import React from 'react'
import axios from 'axios'
import UserProfileComponent from '../../components/user_profile/user_profile_component'
import { inject } from 'mobx-react'

@inject('authStore')
export default class UserProfileContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      profilePic: '',
      subscribedTags: '',
      discordId: '',
      steamId: '',
      battleNetId: '',
      serverAddress: 'https://tangled.michaelbeaver.info'
    }
  }

  componentDidMount () {
    const { params } = this.props.navigation.state
    console.log('About to request: ', params.username)
    const axiosOptions = {
      method: 'GET',
      url: 'https://tangled.michaelbeaver.info/users/' + params.username,
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    }
    console.log('Axios Options', axiosOptions)
    axios(axiosOptions).then((response) => {
      console.log('Responded!')
      const user = response.data.user
      this.setState({
        username: user.username,
        email: user.email,
        discordId: user.discordId,
        steamId: user.steamId,
        battleNetId: user.battleNetId,
        subscribedTags: user.subscribedTags
      })
    }).catch((err) => {
      console.log(err.message)
    })
  }

  render () {
    console.log('Profile State: ', this.state)
    return (
      <UserProfileComponent
        username={this.state.username}
        email={this.state.email}
        discordId={this.state.discordId}
        steamId={this.state.steamId}
        battleNetId={this.state.battleNetId}
        subscribedTags={this.state.subscribedTags}
        navigation={this.props.navigation}
      />
    )
  }
}

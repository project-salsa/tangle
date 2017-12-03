import React from 'react'
import axios from 'axios'
import UserProfileComponent from '../../components/user_profile/user_profile_component'
import { inject } from 'mobx-react'

@inject('authStore')
export default class UserProfileContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profilePic: '',
      username: '',
      email: '',
      discord: '',
      steam: '',
      battleNet: '',
      gameTags: '',
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
    console.log('Axios OPtions', axiosOptions)
    axios(axiosOptions).then((response) => {
      console.log('Responded!')
      const user = response.data.user
      this.setState({
        username: user.username,
        email: user.email,
        discord: user.discordId,
        steam: user.steamId,
        battleNet: user.battleNetId,
        gameTags: user.subscribedTags
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
        userEmail={this.state.email}
        discord={this.state.discord}
        userSteam={this.state.steam}
        userBattlenet={this.state.battleNet}
        gameTags={this.state.gameTags}
        navigation={this.props.navigation}
      />
    )
  }
}

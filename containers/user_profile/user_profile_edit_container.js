import React from 'react'
import axios from 'axios'
import UserProfileEdit from '../../components/user_profile/user_profile_edit'
import { inject } from 'mobx-react'

@inject('authStore')
export default class UserProfileEditContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: this.props.authStore.user.username,
      email: this.props.authStore.user.email,
      profilePic: this.props.authStore.user.profilePic,
      subscribedTags: this.props.authStore.user.subscribedTags,
      discordId: this.props.authStore.user.discordId,
      steamId: this.props.authStore.user.steamId,
      battleNetId: this.props.authStore.user.battleNetId,
      password: this.props.authStore.user.password
    }
  }

  componentDidMount () {
    axios.get('https://tangled.michaelbeaver.info/users').then((data) => {
      this.setState({
        profilePic: data.user.profilePic,
        username: data.user.username,
        password: data.user.password,
        email: data.user.email,
        discordId: data.user.discordId,
        steamId: data.user.steamId,
        battleNetId: data.user.battlenetId,
        subscribedTags: data.user.subscribedTags
       })
     }, (err) => {
       console.log(err)
     }).catch((err) => {
       console.log(err)
     })
  }

  render () {
    return (
      <UserProfileEdit
        profilePic={this.profilePic}
        username={this.username}
        password={this.password}
        email={this.email}
        discordId={this.discordId}
        steamId={this.steamId}
        battleNetId={this.battleNetId}
        subscribedTags={this.subscribedTags}
        navigation={this.props.navigation}
      />
    )
  }
}
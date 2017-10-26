import React from 'react'
import axios from 'axios'
import UserProfileComponent from '../../components/user_profile/user_profile_component'

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
    axios.get(this.state.serverAddress + '/users/' + this.props.username).then((response) => {
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
      console.log(err)
    })
  }

  render () {
    return (
      <UserProfileComponent
        username={this.state.username}
        userEmail={this.state.email}
        discord={this.state.discord}
        userSteam={this.state.steam}
        userBattlenet={this.state.battleNet}
        gameTags={this.state.gameTags} />
    )
  }
}

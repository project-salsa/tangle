import React from 'react'
import axios from 'axios'
import UserProfileEdit from '../../components/user_profile/user_profile_edit'

export default class UserProfileEditContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profilePic: '',
      username: '',
      password: '',
      email: '',
      discord: '',
      steam: '',
      battlenet: '',
      gameTags: []
    }
  }

  componentDidMount () {
    axios.get('https://tangled.michaelbeaver.info/users').then((data) => {
      this.setState({
        profilePic: data.user.profilePic,
        username: data.user.username,
        password: data.user.password,
        email: data.user.email,
        discord: data.user.discord,
        steam: data.user.steam,
        battlenet: data.user.battlenet,
        gameTags: data.user.gameTags
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
        userPassword={this.password}
        userEmail={this.email}
        discord={this.discord}
        userSteam={this.steam}
        userBattlenet={this.battlenet}
        gameTags={this.gameTags}
        navigation={this.props.navigation}
      />
    )
  }
}
import React from 'react'
import LoginComponent from '../../components/login/login_component'

export default class LoginContainer extends React.Component {
  render () {
    return (
      <LoginComponent navigation={this.props.navigation} />
    )
  }
}

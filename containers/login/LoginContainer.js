import React from 'react';
import { View } from 'native-base';
import LoginComponent from '../../components/login/login_component'

export default class LoginContainer extends React.Component {
  render () {
    console.log('State for Login Container: ', this.state)
    return (
      <View>
        <LoginComponent />
      </View>
    )
  }
}
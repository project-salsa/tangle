import React from 'react';
import { View } from 'native-base';
import LoginComponent from '../../components/login/login_component'

export default class LoginContainer extends React.Component {
  render () {
    return (
      <View>
        <LoginComponent />
      </View>
    )
  }
}
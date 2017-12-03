import { StackNavigator } from 'react-navigation'
import LoginContainer from './containers/login/LoginContainer'
import Router from './router'
import LoginComponent from './components/login/login_component'
import { View } from 'native-base'
import React from 'react'

export default StackNavigator({
  Login: { screen: LoginComponent },
  Router: { screen: Router }
}, {
  headerMode: 'none'
})
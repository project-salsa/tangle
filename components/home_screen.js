import React from 'react'
import {View, Text, Button} from 'react-native'
// here to prevent Expo font error
import Expo from 'expo'

export default class HomeComponent extends React.Component {
  // here to prevent Expo font error
  async componentWillMount () {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
    })
    this.setState({ isReady: true })
  }
  render () {
    const { navigate } = this.props.navigation

    return (
      <View>
        <Text>This screen is for development: it will not be included in the main app at all.</Text>
        <Button
          onPress={() => navigate('Dashboard', {navigation: this.props.navigation})}
          title='Go to Dashboard'
        />
        <Button
          onPress={() => navigate('Request', {navigation: this.props.navigation})}
          title='Go to Request'
        />
        <Button
          onPress={() => navigate('UserProfile')}
          title='Go to User Profile'
        />
        <Button
          onPress={() => navigate('Login')}
          title='Go to Login'
        />
        <Button
          onPress={() => navigate('UserPreferences')}
          title='Go to User Prefs.'
        />
        <Button
          onPress={() => navigate('CreateRequest')}
          title='Go to Create Request'
        />
        <Button
          onPress={() => navigate('FirstTime')}
          title='Go to First Time'
        />
      </View>
    )
  }
}

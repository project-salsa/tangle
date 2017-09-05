import React from 'react';
import {View, Text, Button} from 'react-native';

export default class HomeComponent extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Text>This screen is for development: it will not be included in the main app at all.</Text>
        <Button
          onPress={() => navigate('Dashboard')}
          title="Go to Dashboard"
        />
        <Button
          onPress={() => navigate('Request')}
          title="Go to Request"
        />
        <Button
          onPress={() => navigate('UserProfile')}
          title="Go to User Profile"
        />
        <Button
          onPress={() => navigate('Login')}
          title="Go to Login"
        />
        <Button
          onPress={() => navigate('UserPreferences')}
          title="Go to User Prefs."
        />
        <Button
          onPress={() => navigate('CreateRequest')}
          title="Go to Create Request"
        />
      </View>
    )
  }
}
import React from 'react';
import { View } from 'native-base';
import FirstTimeComponent from '../../components/first_time/first_time_component'

export default class FirstTimeContainer extends React.Component {
  render () {
    return (
      <View>
        <FirstTimeComponent />
      </View>
    )
  }
}
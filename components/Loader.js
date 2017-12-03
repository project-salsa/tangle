import React from 'react'
import { View, Text } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Loader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFFFFF'}} />
      </View>
    );
  }
}
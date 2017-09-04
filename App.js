import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Test from './components/test';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Here is some text
        </Text>
        <Test />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

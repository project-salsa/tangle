import React, { Component } from 'react';
import { Text, View, AppRegistry, TextInput, Button } from 'react-native';

export default class FirstTimeComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: 'beige', alignItems: 'center'}}>
              <View style={{height:15}}/>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>Welcome!</Text>
              <View style={{height:15}}/>
              <Text style={{textAlign: 'justify'}}>Insert a general summary of the app and what it does in here.</Text>
              <View style={{height:25}}/>
              <Text>Enter your data value!</Text>
              <TextInput
                  style={{backgroundColor: 'white', height: 40, width:200, borderColor: 'gray', borderWidth: 1}}
                  placeholder="Field Placeholder"
                  selectTextOnFocus={true}
              />
              <View style ={{height:25}} />
              <Text>Enter your data value!</Text>
              <TextInput
                  style={{backgroundColor: 'white', height: 40, width:200, borderColor: 'gray', borderWidth: 1}}
                  placeholder="Field Placeholder"
                  selectTextOnFocus={true}
              />
              <View style ={{height:25}} />
              <Text>Enter your data value!</Text>
              <TextInput
                  style={{backgroundColor: 'white', height: 40, width:200, borderColor: 'gray', borderWidth: 1}}
                  placeholder="Field Placeholder"
                  selectTextOnFocus={true}
              />
              <Button
                  onPress={() => alert("Ideally, I'd submit information. Probably.")}
                  title="Next"
              />
            </View>
        );
    }
}

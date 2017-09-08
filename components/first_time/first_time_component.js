import React, { Component } from 'react';
import { Text, View, AppRegistry, TextInput, Button, ScrollView } from 'react-native';

export default class FirstTimeComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView
                pagingEnabled={true}
            >
              <View style={{height: 700, flexDirection:'row'}}>
                <View style={{flex:1, backgroundColor: 'beige'}}/>
                <View style={{flex:10, flexDirection:'column', backgroundColor: 'beige', alignItems: 'center'}}>
                  <View style={{flex:3}}/>
                  <Text style={{fontSize: 30, fontWeight: 'bold'}}>Welcome!</Text>
                  <View style={{flex:3}}/>
                  <Text style={{textAlign: 'justify'}}>
                    Insert a general summary of the app and what it does in here.
                    So much text here.
                    So many lines.
                  </Text>
                  <View style={{flex:5}}/>
                  <Text>Enter your data value!</Text>
                  <View style={{flex:5, flexDirection:'row'}}>
                    <TextInput
                        style={{backgroundColor: 'white', flex:1, height:40, borderColor: 'gray', borderWidth: 1}}
                        placeholder="Field Placeholder"
                        selectTextOnFocus={true}
                    />
                  </View>
                  <View style={{flex:5}} />
                  <Text>Enter your data value!</Text>
                  <View style={{flex:5, flexDirection:'row'}}>
                    <TextInput
                        style={{backgroundColor: 'white', flex:1, height:40, borderColor: 'gray', borderWidth: 1}}
                        placeholder="Field Placeholder"
                        selectTextOnFocus={true}
                    />
                  </View>
                  <View style={{flex:5}} />
                  <Text>Enter your data value!</Text>
                  <View style={{flex:5, flexDirection:'row'}}>
                    <TextInput
                        style={{backgroundColor: 'white', flex:1, height:40, borderColor: 'gray', borderWidth: 1}}
                        placeholder="Field Placeholder"
                        selectTextOnFocus={true}
                    />
                  </View>
                  <View style={{flex:5}} />
                  <Text>Enter your data value!</Text>
                  <View style={{flex:5, flexDirection:'row'}}>
                    <TextInput
                        style={{backgroundColor: 'white', flex:1, height:40, borderColor: 'gray', borderWidth: 1}}
                        placeholder="Field Placeholder"
                        selectTextOnFocus={true}
                    />
                  </View>
                  <View style={{flex:5}} />
                  <Text>Enter your data value!</Text>
                  <View style={{flex:5, flexDirection:'row'}}>
                    <TextInput
                        style={{backgroundColor: 'white', flex:1, height:40, borderColor: 'gray', borderWidth: 1}}
                        placeholder="Field Placeholder"
                        selectTextOnFocus={true}
                    />
                  </View>
                  <View style={{flex:3}} />
                  <Button
                      color="red"
                      onPress={() => alert("Ideally, I'd submit information. Probably.")}
                      title="Next"
                  />
                  <View style={{flex:10}} />
                </View>
                <View style={{flex:1, backgroundColor: 'beige'}}/>
              </View>
            </ScrollView>
        );
    }
}

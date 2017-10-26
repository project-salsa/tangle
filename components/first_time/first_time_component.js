import React, { Component } from 'react'
import { Text, View, AppRegistry, StyleSheet, TextInput, ScrollView, Button, TouchableOpacity } from 'react-native'

export default class FirstTimeComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      field1: ' ',
      field2: ' ',
      field3: ' ',
      field4: ' ',
      field5: ' '
    }
  }

  render () {
    return (
      <ScrollView pagingEnabled>
        <View style={{height: 700, flexDirection: 'row'}}>
          <View style={{flex: 1, backgroundColor: 'beige'}} />
          <View style={{flex: 10, flexDirection: 'column', backgroundColor: 'beige', alignItems: 'center'}}>
            <View style={{flex: 3}} />
            <Text style={{fontSize: 32, fontWeight: 'bold'}}>Welcome!</Text>
            <View style={{flex: 3}} />
            <Text style={{textAlign: 'justify'}}>
                            Insert a general summary of the app and what it does in here.
                            Ideally, we would have multiple of these paragraphs, prompting different sections of inputs.
                            For now, this paragraph will serve as an example header.
                        </Text>
            <View style={{flex: 5}} />
            <Text>Enter your data value!</Text>
            <View style={{flex: 5, flexDirection: 'row'}}>
              <TextInput
                style={styles.genericTextBox}
                placeholder='  Field Placeholder'
                selectTextOnFocus
                onChangeText={(field_input) => this.setState({field1: field_input})}
                            />
            </View>
            <View style={{flex: 5}} />
            <Text>Enter your data value!</Text>
            <View style={{flex: 5, flexDirection: 'row'}}>
              <TextInput
                style={styles.genericTextBox}
                placeholder='  Field Placeholder'
                selectTextOnFocus
                onChangeText={(field_input) => this.setState({field2: field_input})}
                            />
            </View>
            <View style={{flex: 5}} />
            <Text>Enter your data value!</Text>
            <View style={{flex: 5, flexDirection: 'row'}}>
              <TextInput
                style={styles.genericTextBox}
                placeholder='  Field Placeholder'
                selectTextOnFocus
                onChangeText={(field_input) => this.setState({field3: field_input})}
                            />
            </View>
            <View style={{flex: 5}} />
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Subsection Header!</Text>
            <View style={{flex: 3}} />
            <Text>Enter your data value!</Text>
            <View style={{flex: 5, flexDirection: 'row'}}>
              <TextInput
                style={styles.genericTextBox}
                placeholder='  Field Placeholder'
                selectTextOnFocus
                onChangeText={(field_input) => this.setState({field4: field_input})}
                            />
            </View>
            <View style={{flex: 5}} />
            <Text>Enter your data value!</Text>
            <View style={{flex: 5, flexDirection: 'row'}}>
              <TextInput
                style={styles.genericTextBox}
                placeholder='  Field Placeholder'
                selectTextOnFocus
                onChangeText={(field_input) => this.setState({field5: field_input})}
                            />
            </View>
            <View style={{flex: 7}} />
            <View style={{flex: 7, flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.contButton}
                onPress={() => alert(
                                    'Printing out input fields: \n' +
                                    'Field 1: ' + this.state.field1 + '\n' +
                                    'Field 2: ' + this.state.field2 + '\n' +
                                    'Field 3: ' + this.state.field3 + '\n' +
                                    'Field 4: ' + this.state.field4 + '\n' +
                                    'Field 5: ' + this.state.field5 + '\n'
                                )}>
                <Text style={styles.contButtonText}>CONTINUE</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 7}} />
          </View>
          <View style={{flex: 1, backgroundColor: 'beige'}} />
        </View>
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  genericTextBox: {
    backgroundColor: 'white',
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 2
  },
  contButton: {
    backgroundColor: 'blue',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  }
})

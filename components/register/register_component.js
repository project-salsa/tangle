import React from 'react'
import {Container, Header, Body, Title, Text, Form, Content, View, Button, Icon, Item, Input, Label, Toast} from 'native-base'
import { inject } from 'mobx-react'
import Loader from '../Loader'
import GlobalStyleSheet from '../../style'
import axios from 'axios'

@inject('authStore')
export default class RegisterComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      isLoading: '',
      showToast: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    const { navigate } = this.props.navigation
    if (this.state.username === '' || this.state.email === '' || this.state.password === '') {
      Toast.show({
        text: 'Please complete all fields to register.',
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000
      })
    }
    else if (this.state.password !== this.state.confirmPassword) {
      Toast.show({
        text: 'Please check that your passwords match.',
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000
      })
    }
    else {
      this.setState({ isLoading: true })
      axios.post('https://tangled.michaelbeaver.info/users',
        {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        }
      ).then(() => {
        this.setState({isLoading: false})
        navigate('Login')
      }).catch((err) => {
        // TODO: Error handling
        this.setState({isLoading: false})
        console.log('Error while creating account: ' + err.message)
        Toast.show({
          text: 'Something went wrong. Please try again.',
          position: 'bottom',
          buttonText: 'Okay',
          duration: 5000
        })
      })
    }
  }

  render () {
    const { navigate } = this.props.navigation
    if (this.state.isLoading) { return ( <Loader /> ) }
    return (
      <Container>
        <Header style={{backgroundColor: '#3c3cc1', marginTop: 24}}>
          <Body>
            <Title style={GlobalStyleSheet.headerText}>Registration</Title>
          </Body>
        </Header>
        <Content padder>
          <Form style={GlobalStyleSheet.bgColor}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(input) => this.setState({username: input})} />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={(input) => this.setState({email: input})} />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry onChangeText={(input) => this.setState({password: input})} />
            </Item>
            <Item floatingLabel>
              <Label>Confirm Password</Label>
              <Input secureTextEntry onChangeText={(input) => this.setState({confirmPassword: input})} />
            </Item>
          </Form>
          <View style={GlobalStyleSheet.secondaryColor} />
          <View style={{height: 10}} />
          <View>
            <Button full primary onPress={this.handleSubmit}>
              <Text>Register</Text>
            </Button>
            <View style={{height: 15}} />
          </View>
        </Content>
      </Container>
    )
  }
}

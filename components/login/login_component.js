import React from 'react'
import {Container, Header, Body, Title, Text, Form, Content, View, Button, Icon, Item, Input, Label, Toast} from 'native-base'
import { inject } from 'mobx-react'
import Loader from '../Loader'
import GlobalStyleSheet from '../../style'

@inject('authStore')
export default class LoginComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLoading: '',
      showToast: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    const { navigate } = this.props.navigation
    if (this.state.username === '' || this.state.password === '') {
      Toast.show({
        text: 'Please complete both fields to log in.',
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000
      })
    }
    else {
      this.setState({ isLoading: true })
      this.props.authStore.logUserIn(this.state.username, this.state.password).then(() => {
        navigate('Router')
        this.setState({ isLoading: false })
      }).catch((err) => {
        this.setState({ isLoading: false })
        if (err.request.status === 401) {
          Toast.show({
            text: 'Incorrect username or password.',
            position: 'bottom',
            buttonText: 'Okay',
            duration: 5000
          })
        }
        else if (err.request.status === 500) {
          Toast.show({
            text: 'Something went wrong.',
            position: 'bottom',
            buttonText: 'Okay',
            duration: 5000
          })
        }
        this.setState({username: '', password: ''})
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
            <Title style={GlobalStyleSheet.headerText}>Welcome to Tangle!</Title>
          </Body>
        </Header>
        <Content padder>
          <Form style={GlobalStyleSheet.bgColor}>
            <Item floatingLabel>
              <Icon active name='bulb' />
              <Label>  Enter Username</Label>
              <Input onChangeText={(input) => this.setState({username: input})} />
            </Item>
            <Item floatingLabel>
              <Icon active name='lock' />
              <Label>  Enter Password</Label>
              <Input secureTextEntry onChangeText={(input) => this.setState({password: input})} />
            </Item>
          </Form>
          <View style={GlobalStyleSheet.secondaryColor} />
          <View style={{height: 10}} />
          <View>
            <Button full primary onPress={this.handleSubmit}>
              <Text>Login</Text>
            </Button>
            <View style={{height: 15}} />
            <Button full danger onPress={() => navigate('Register')}>
              <Text>Need to Register?</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

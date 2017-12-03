import React from 'react'
import {Container, Header, Body, Title, Text, Form, Content, View, Button, Icon, Item, Input, Label} from 'native-base'
import { inject } from 'mobx-react'
import GlobalStyleSheet from '../../style'

@inject('authStore')
export default class LoginComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    const { navigate } = this.props.navigation
    this.props.authStore.logUserIn(this.state.username, this.state.password).then(() => {
      navigate('Dashboard')
    }).catch((err) => {
      // TODO: Login Errors
      console.log('Error while logging in: ' + err)
    })
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Header style={GlobalStyleSheet.primaryColor}>
          <Body>
            <Title style={GlobalStyleSheet.headerText}>Welcome to Tangle!</Title>
          </Body>
        </Header>
        <Content padder>
          <Form style={GlobalStyleSheet.backgroundColor}>
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
            <Button full danger onPress={() => navigate('UserProfile')}>
              <Text>Need to Register?</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

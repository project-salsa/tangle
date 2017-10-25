import React from 'react'
import {Container, Header, Body, Title, Text, Form, Left, Content, Picker, Button, Icon, Item, Label} from 'native-base'
import TextBox from './textbox/textbox'
import axios from 'axios'

export default class CreateRequestComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      postTitle: '',
      hostUser: 'DummyUser', // TODO change when we can track current user
      gameSelection: '',
      platform: '',
      tags: [],
      locationName: '',
      maxPlayers: 2
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const val = target.type
    const name = target.name

    this.setState({
      [name]: val
    })
  }

  handleSubmit () {
    const { navigate } = this.props.navigation
    axios.post(this.props.serverAddress + '/requests', {
      title: this.state.postTitle,
      user: this.state.hostUser,
      game: this.state.gameSelection,
      platform: this.state.platform,
      tags: this.state.tags,
      location: this.state.locationName,
      maxPlayers: this.state.maxPlayers
    })
    .then((resp) => {
      if (resp.success) {
        navigate('Dashboard')
      }
      console.log(resp)
    }, (err) => {
      console.log(err)
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Create Game Request</Title>
          </Body>
        </Header>
        <Content padder>
          <Form>

            <Item floatingLabel>
              <Label>Post Title</Label>
              <TextBox padder
                name='postTitle'
                onChangeText={this.handleInputChange} />
            </Item>

            <Text>Select a Game</Text>
            <Picker
              iosHeader='Select a Game'
              placeholder={'Choose...'}
              mode='dialog'
              prompt='Select a Game'
              onValueChange={this.handleInputChange}>
              {this.props.gamesList.map((item, index) => {
                return (<Item label={item} value={index} key={index} />)
              })}
            </Picker>

            <Item floatingLabel>
              <Icon active ios='ios-happy' android='md-happy' />
              <Label>Number of Players</Label>
              <TextBox padder
                name='maxPlayers'
                type='number'
                keyboardType='numeric'
                value={this.state.maxPlayers}
                onChangeText={this.handleInputChange} />
            </Item>

            <Item floatingLabel>
              <Icon active ios='ios-pin' android='md-pin' />
              <Label>Location</Label>
              <TextBox padder
                name='locationName'
                onChangeText={this.handleInputChange} />
              {/* User input for now, consider using map data in the future */}
            </Item>

          </Form>

          <Button full primary
            onPress={this.handleSubmit}>
            <Text>Send Request</Text>
          </Button>

        </Content>
      </Container>
    )
  }
}

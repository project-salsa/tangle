import React from 'react'
import {Container, Header, Body, Title, Text, Form, Left, Content, Picker, Button, Icon, Item, Label, Input} from 'native-base'
import axios from 'axios'
import { inject } from 'mobx-react'

@inject('authStore')
export default class CreateRequestComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      postTitle: '',
      hostUser: 'DummyUser', // TODO: change when we can track current user
      gameSelection: '',
      platform: 'PC',
      tags: [],
      locationName: '',
      maxPlayers: 2
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    console.log(this.state)
    const { navigate } = this.props.navigation
    // TODO: In the data section here, I think we can make this less verbose using some ES6 spread syntax.
    // Not a big deal since it's a code style issue, but worth looking into later.
    const axiosOptions = {
      method: 'POST',
      url: this.props.serverAddress + '/requests',
      data: {
        title: this.state.postTitle,
        user: this.state.hostUser,
        game: this.state.gameSelection,
        platform: this.state.platform,
        tags: this.state.tags,
        location: this.state.locationName,
        maxPlayers: this.state.maxPlayers,
        currentPlayers: []
      },
      headers: {
        Authorization: `Bearer ${this.props.authStore.token}`
      },
      json: true
    };
    axios(axiosOptions).then((resp) => {
      if (resp.data.success) {
        navigate('Request', {requestId: resp.data.requestId})
      }
      console.log(resp.data)
    }).catch((err) => {
      console.log(JSON.stringify(err))
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
              <Input
                name='postTitle'
                onChangeText={(text) => this.setState({postTitle: text})} />
            </Item>

            <Text>Select a Game</Text>
            <Picker
              iosHeader='Select a Game'
              placeholder={'Choose...'}
              mode='dialog'
              prompt='Select a Game'
              selectedValue={this.state.gameSelection}
              onValueChange={(value) => this.setState({gameSelection: value})}>
              {this.props.gamesList.map((item, index) => {
                return (<Item label={item} value={item} key={index} />)
              })}
            </Picker>

            <Item floatingLabel>
              <Icon active ios='ios-happy' android='md-happy' />
              <Label>Number of Players</Label>
              <Input padder
                name='maxPlayers'
                type='number'
                keyboardType='numeric'
                maxLength={1}
                onChangeText={(text) => this.setState({maxPlayers: text})} />
            </Item>

            <Item floatingLabel>
              <Icon active ios='ios-pin' android='md-pin' />
              <Label>Location</Label>
              <Input padder
                name='locationName'
                onChangeText={(text) => this.setState({locationName: text})} />
              {/* TODO User input for now, consider using map data in the future */}
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

import React from 'react'
import {Container, Header, Body, Title, Text, Form, Left, Right, Content, Picker, Button, Icon, Item, Label} from 'native-base'
import TextBox from './textbox/textbox'

export default class CreateRequestComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      postTitle: undefined,
      gameSelection: undefined,
      playerCount: undefined,
      locationName: undefined,
      games: []
    }
  }

  onValueChange (value: string) {
    if (value !== 'none') {
      this.setState({
        gameSelection: value
      })
    }
  }

  render () {
    const { navigate } = this.props.navigation;
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
                     onChangeText={(input) => this.setState({postTitle: input})} />
            </Item>

            <Text>Select a Game</Text>
            let gameList = ["League of Legends", "Overwatch"];
            <Picker
              iosHeader='Select a Game'
              placeholder={'Choose...'}
              mode='dialog'
              prompt='Select a Game'
              selectedValue={this.state.gameSelection}
              onValueChange={this.onValueChange.bind(this)}>

              {gameList.map((item, index) => {
                return(<Item label={item} value={index} key={index}/>)
              })}
            </Picker>

            <Item floatingLabel>
              <Icon active ios='ios-happy' android='md-happy' />
              <Label>Number of Players</Label>
              <TextBox padder
                keyboardType = 'numeric'
                onChangeText={(input) => this.setState({playerCount: input})}
                            />
              {/* Would like to make this a NumberPicker, but manual input is fine for now */}
            </Item>

            <Item floatingLabel>
              <Icon active ios='ios-pin' android='md-pin' />
              <Label>Location</Label>
              <TextBox padder
                onChangeText={(input) => this.setState({locationName: input})} />
              {/* User input for now, consider using map data in the future */}
            </Item>
          </Form>
          <Button full primary
            onPress={() => navigate('Dashboard')}
                    >
            {/*
                            Right now, this just goes to the Dashboard
                            This will need to send the state data to the server
                        */}
            <Text>Send Request</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

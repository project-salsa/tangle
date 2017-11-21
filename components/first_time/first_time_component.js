import React from 'react'
import {Container, Header, Body, Title, Text, Form, Content, View, Button, Item, Input, Label} from 'native-base'
import axios from 'axios'
import DisplayMap from '../DisplayMap'

export default class FirstTimeComponent extends React.Component {
  constructor (props) {
    super(props)
    // TODO: Make these more descriptive as we figure out how this page works.
    this.state = {
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: ''
    }
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Header style={{backgroundColor: 'black'}}>
          <Body>
            <Title style={{fontWeight: 'bold', fontSize: 30}}>First-Time Setup</Title>
          </Body>
        </Header>
        <Content padder>
          <DisplayMap mark_lat={38} mark_long={-92} />
          <Form style={{backgroundColor: '#AAAAAA'}}>
            <Item inlineLabel>
              <Label>  Display Name: </Label>
              <Input onChangeText={(input) => this.setState({field1: input})} />
            </Item>
            <Item inlineLabel>
              <Label>  Date of Birth: </Label>
              <Input onChangeText={(input) => this.setState({field2: input})} />
            </Item>
            <Item inlineLabel>
              <Label>  Discord Tag: </Label>
              <Input onChangeText={(input) => this.setState({field3: input})} />
            </Item>
            <Item inlineLabel>
              <Label>  Misc Attribute1: </Label>
              <Input onChangeText={(input) => this.setState({field4: input})} />
            </Item>
            <Item inlineLabel>
              <Label>  Misc Attribute2: </Label>
              <Input onChangeText={(input) => this.setState({field5: input})} />
            </Item>
          </Form>
          <View style={{backgroundColor: '#999999', height: 15}} />
          <View style={{height: 10}} />
          <View>
            <Button full primary
              onPress={() => {
                axios({
                  method: 'post',
                  url: 'https://tangled.michaelbeaver.info',
                  data: {
                    username: this.state.field1,
                    d_o_b: this.state.field2,
                    discord_tag: this.state.field3,
                    misc1: this.state.field4,
                    misc2: this.state.field5
                  }
                })
                navigate('UserProfile')
              }} >
              <Text>CONTINUE</Text>
            </Button>
          </View>
          <View style={{height: 25}} />
        </Content>
      </Container>
    )
  }
}

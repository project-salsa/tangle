import React, {Component} from 'react'
import {Container, Text, Input} from 'native-base'

export default class TextBox extends Component {
  error () {
    if (this.props.error) {
      return <Text>{this.props.error}</Text>
    }
    return null
  }

  render () {
    return (
      <Container>
        <Input />
        {this.error()}
      </Container>
    )
  }
}

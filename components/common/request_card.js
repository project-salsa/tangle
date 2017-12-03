import React from 'react'
import { Card, CardItem, Left, Text } from 'native-base'

export default class RequestCard extends React.Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <Card>
        <CardItem button onPress={() => navigate('Request', { requestId: this.props.requestId })}>
            <Left>
            <Text>
              {this.props.title}
              {'\n'}
              {this.props.user}
            </Text>
          </Left>
          <Text>
            {this.props.game}
          </Text>
        </CardItem>
      </Card>
    )
  }
}

RequestCard.defaultProps = {
  requestId: '',
  title: '',
  user: '', // maybe this should be userId and we can grab info?
  tags: [], // may need to be changed based on what we want to do w/ the tag system
  game: '', // probably just a temporary prop
  location: '' // issa string now but this should be some sort of location data type
}

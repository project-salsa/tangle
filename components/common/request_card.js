import React from 'react'
import { Card, CardItem, Icon, View, Text } from 'native-base'

export default class RequestCard extends React.Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <Card>
        <CardItem button style={{backgroundColor: '#EEEEEE'}}
                  onPress={() => navigate('Request', { requestId: this.props.requestId })}>
          <View style={{flex:1, backgroundColor: '#887C87'}}>
            <View style={{flex: 1}} />
            <View style={{flex: 20, flexDirection: 'row'}}>
              <View style={{flex: 2}}>
                <View style={{height: 1}} />
                <Icon active name='man' style={{padding: 10}} />
              </View>
              <View style={{flex: 20, flexDirection: 'row'}}>
                <View style={{flex: 3}}>
                  <View style={{height: 5}} />
                  <Text>
                    {this.props.user}
                  </Text>
                </View>
                <View style={{flex: 8}}>
                  <View style={{height: 5}} />
                  <Text>
                    {this.props.game} {'\n'}
                    "{this.props.title}"
                  </Text>
                </View>
              </View>
              <View style={{flex: 1}} />
            </View>
            <View style={{flex: 1}} />
          </View>
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
  location: ''
}

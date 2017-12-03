import React from 'react'
import { Container, Content, View, Text } from 'native-base'
import RequestList from './request_list'
import { inject } from 'mobx-react'

@inject('authStore')
export default class DashboardComponent extends React.Component {
  render () {
    return (
      <Container style={{backgroundColor: '#FFFFFF'}}>
        <Content>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 40}}>Dashboard</Text>
          </View>
          <RequestList requests={this.props.requests} navigation={this.props.navigation} />
        </Content>
      </Container>
    )
  }
}

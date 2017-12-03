import React from 'react'
import { Container, Content, View, Text } from 'native-base'
import RequestList from './request_list'
import { inject } from 'mobx-react'
import Header from '../common/header'

@inject('authStore')
export default class DashboardComponent extends React.Component {
  render () {
    return (
      <Container>
        <Header title='Dashboard' navigation={this.props.navigation} />
        <Content>
          <RequestList requests={this.props.requests} navigation={this.props.navigation} />
        </Content>
      </Container>
    )
  }
}

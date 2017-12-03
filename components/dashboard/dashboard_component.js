import React from 'react'
import { Container, Content, H1 } from 'native-base'
import RequestList from './request_list'
import { inject } from 'mobx-react'
import Header from '../common/header'

@inject('authStore')
export default class DashboardComponent extends React.Component {
  render () {
    return (
      <Container>
        <Header title='Dashboard' />
        <Content>
          <H1>Dashboard</H1>
          <RequestList requests={this.props.requests} navigation={this.props.navigation} />
        </Content>
      </Container>
    )
  }
}

import React from 'react'
import { Container, Content, H1 } from 'native-base'
import RequestList from './request_list'
import { inject } from 'mobx-react'

@inject('authStore')
export default class DashboardComponent extends React.Component {
  render () {
    console.log('The token! ', this.props.authStore.token)

    return (
      <Container>
        <Content>
          <H1>Dashboard</H1>
          <RequestList requests={this.props.requests} navigation={this.props.navigation} />
        </Content>
      </Container>
    )
  }
}

import React from 'react'
import { Container, Content, H1 } from 'native-base'
import RequestList from './request_list'

export default class Dashboard extends React.Component {
  render () {
    return (
      <Container>
        <Content>
          <H1>Dashboard</H1>
          <RequestList navigation={this.props.navigation} />
        </Content>
      </Container>
    )
  }
}

import React from 'react'
import { Container, Content, View, Left, Button, Title, Icon } from 'native-base'
import RequestList from './request_list'
import { inject } from 'mobx-react'

@inject('authStore')
export default class DashboardComponent extends React.Component {
  render () {
    return (
      <Content>
        <RequestList requests={this.props.requests} navigation={this.props.navigation} />
      </Content>
    )
  }
}

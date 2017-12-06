import React from 'react'
import { Container, Content, View, Text, Left, Button, Body, Title, Icon } from 'native-base'
import RequestList from './request_list'
import { inject } from 'mobx-react'
import GlobalStyleSheet from '../../style'

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

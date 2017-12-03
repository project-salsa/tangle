import React from 'react'
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem } from "native-base";

export default class HeaderComponent extends React.Component {
  render () {
    let onPressAction
    // switch (this.props.action) {
    //   case 'Drawer':
    //     onPressAction = () => this.props.navigation.navigate('DrawerOpen')
    //     break
    //   case 'Back':
    //     onPressAction = () => this.props.navigation.goBack
    // }

    return (
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
        <Title>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    )
  }
}

HeaderComponent.defaultProps = {
  title: '',
  action: 'Drawer'
}
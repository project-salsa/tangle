import React from 'react'
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem } from "native-base";

export default class HeaderComponent extends React.Component {
  render () {
    let onPressAction
    let iconName
    switch (this.props.action) {
      case 'Drawer':
        onPressAction = () => this.props.navigation.navigate('DrawerOpen')
        iconName = 'menu'
        break
      case 'Back':
        onPressAction = () => this.props.navigation.goBack()
        iconName = 'md-arrow-back'
        break
    }

    return (
      <Header style={{marginTop: 24}}>
        <Left>
          <Button
            transparent
            onPress={onPressAction}>
            <Icon name={iconName} />
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
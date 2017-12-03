import React from "react"
import { Image } from "react-native"
import { Container, Content, Text, List, ListItem } from "native-base"
import { inject } from 'mobx-react'

const routes = [
  { name: 'Dashboard', screen: 'Dashboard' },
  { name: 'Create Request', screen: 'CreateRequest' },
  { name: 'My Profile', screen: 'UserProfile' }
]

@inject('authStore')
export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Image
              square
              style={{ height: 80, width: 70 }}
              source={{
                uri: "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
              }}
            />
          </Image>
          <List
            dataArray={routes}
            renderRow={(data) => {
              if (data.name === 'My Profile') {
                return (
                  <ListItem
                    button
                    onPress={() => this.props.navigation.navigate(data.screen, { username: this.props.authStore.user.username })}>
                    <Text>{data.name}</Text>
                  </ListItem>
                )
              }
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data.screen)}>
                  <Text>{data.name}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
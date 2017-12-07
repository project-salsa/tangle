import React from "react"
import { Image } from "react-native"
import { Container, Content, Text, List, ListItem, Thumbnail } from "native-base"
import { inject } from 'mobx-react'

const routes = [
  { name: 'Dashboard', screen: 'Dashboard' },
  { name: 'Create Request', screen: 'CreateRequest' },
  { name: 'My Profile', screen: 'UserProfile' }
]

@inject('authStore')
export default class SideBar extends React.Component {
  render() {
    let welcomeMessage = 'Welcome ' + this.props.authStore.user.username + '!'

    return (
      <Container>
        <Content>
          <Image
            source={{
              uri: "http://cdn.shopify.com/s/files/1/0213/0448/products/large-procion-dye-rust-orange_grande.jpg"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Thumbnail large source={{uri: this.props.authStore.user.profilePicUrl}} />
          </Image>
          <Text
            style={{textAlign: 'center'}}>
            {welcomeMessage}
          </Text>
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
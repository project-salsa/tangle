import { Text, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon,
  Thumbnail, List, ListItem } from 'native-base'
import { inject } from 'mobx-react'

@inject('authStore')
export default class UserProfileComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: this.props.authStore.user.username,
      email: this.props.authStore.user.email,
      profilePic: this.props.authStore.user.profilePic,
      subscribedTags: this.props.authStore.user.subscribedTags,
      discordId: this.props.authStore.user.discordId,
      steamId: this.props.authStore.user.steamId,
      battleNetId: this.props.authStore.user.battleNetId
    }
  }

  render () {
    const { navigate } = this.props.navigation

    let styles = StyleSheet.create({
      title: {
        fontSize: 12
      },
      userValues: {
        fontSize: 24
      }
    })
    let canEdit
    if (this.props.authStore.user.username == this.state.username){
        canEdit = <Button rounded light onPress={() => navigate('EditUserProfile', { navigation: this.props.navigation })}>
          <Text fontSize={4}>
            Edit Profile
          </Text>
        </Button>
    }
    return (
      <Container>
        <Header style={{marginTop: 24}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>User Profile</Title>
          </Body>
          <Right>
            {canEdit}
          </Right>
        </Header>
        <Content>
          <Body>
            <Text style={styles.userValues}>
              {'\n'}
            </Text>
            {/* Thumbnail for Profile Picture */}
            <Thumbnail large source={this.state.profilePic} />
            {/* Display Username */}
            <Text style={styles.title}>
              {'\n'}
              Username
            </Text>
            <Text style={styles.userValues}>
              {this.state.username}
            </Text>
          </Body>
          <Text style={styles.title}>
            Email
          </Text>
          <Text style={styles.userValues}>
            {this.state.email}
          </Text>
          <Text style={styles.title}>
            Discord
          </Text>
          <Text style={styles.userValues}>
            {this.state.discordId}
          </Text>
          <Text style={styles.title}>
            Steam
          </Text>
          <Text style={styles.userValues}>
            {this.state.steamId}
          </Text>
          <Text style={styles.title}>
            BattleNet
          </Text>
          <Text style={styles.userValues}>
            {this.state.battleNetId}
          </Text>
          <Text style={styles.title}>
            {'\n'}
            Game Tags
          </Text>
          {/* /* Display Game Tags */}
          <List dataArray={this.state.subscribedTags}
            // style={ styles.userValues}
            renderRow={(item) =>
              <ListItem>
                <Text>{item}</Text>
              </ListItem>
            } />
        </Content>
      </Container>
    )
  }
}

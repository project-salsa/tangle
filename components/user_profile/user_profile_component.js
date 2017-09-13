import {View, Text, StyleSheet} from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right,
    Body, Icon, Thumbnail, Item, Input, List, ListItem } from 'native-base';

//import Request from 'react-http-request';

export default class UserProfileComponent extends Component {
    constructor(props)
    {
        super(props);
        this.state = {

            username: "DummyUser",
            //This profilePic will grab the users image stored on database, for now is empty string
            profilePic: {uri: "http://brand.mst.edu/media/universityadvancement/communications/images/logos/logo/Logo_356.jpg"},
            gameTags: ['game1', 'game2', 'game3', 'game4'],
            discord: "DummyDiscord"
        }
    }

    render() {
        let styles = StyleSheet.create({
            title: {
                fontSize: 12,
            },
            userValues: {
                fontSize: 24,
            },
        });

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>User Profile</Title>
                    </Body>
                    <Right>
                        <Button rounded light>
                            <Text fontSize={4}>
                                Edit Profile
                            </Text>
                            {/*TODO Make Edit Profile, only for user*/}
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Body>
                        <Text style={ styles.userValues}>
                            {"\n"}
                        </Text>
                        {/*Thumbnail for Profile Picture*/}
                        <Thumbnail large source={this.state.profilePic} />
                        {/*/* Display Username */}
                        <Text style={ styles.title}>
                            {"\n"}
                            Username
                        </Text>
                        <Text style={ styles.userValues}>
                            {this.state.username}
                        </Text>
                    </Body>
                    <Text style={ styles.title}>
                        Discord
                    </Text>
                    <Text style={ styles.userValues}>
                        {this.state.discord}
                    </Text>
                    <Text style={ styles.title}>
                        {"\n"}
                        Game Tags
                    </Text>
                    {/*/* Display Game Tags */}
                    <List dataArray={this.state.gameTags}
                          // style={ styles.userValues}
                          renderRow={(item) =>
                              <ListItem>
                                  <Text>{item}</Text>
                              </ListItem>
                          }>
                    </List>
            </Content>
            </Container>
        );
    }
}
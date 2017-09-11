import React from 'react';
import {Container, Header, Body, Title, Text, Form, Left, Right, Content, Picker, Button, Icon, Item, Input, Label} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class CreateRequestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameSelection: undefined,
            playerCount: undefined,
            locationName: undefined
        };
    }

    onValueChange(value: string) {
        if (value !== "none") {
            this.setState({
                gameSelection: value
            });
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() =>this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Create Game Request</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Form>
                        <Text>Select a Game</Text>
                        <Picker
                            iosHeader="Select a Game"
                            mode="dialog"
                            prompt="Select a Game"
                            selectedValue={this.state.gameSelection}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Item label="No Game Selected" value="none" />
                            <Item label="League of Legends" value="game0" />
                            <Item label="Overwatch" value="game1" />
                            <Item label="Super Smash Bros. Melee" value="game2" />
                            <Item label="Super Smash Bros. for Wii U" value="game3" />
                        </Picker>
                        <Item floatingLabel>
                            <Icon active ios='ios-happy' android='md-happy' />
                            <Label>Number of Players</Label>
                            <Input
                                onChangeText={(input) => this.setState({playerCount:input})}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Icon active ios='ios-pin' android='md-pin' />
                            <Label>Location</Label>
                            <Input
                                onChangeText={(input) => this.setState({locationName:input})}
                            />
                        </Item>
                    </Form>
                    <Button full primary
                            onPress={() => navigate('Dashboard')}
                    >
                        <Text>Send Request</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

import React from 'react';
import {Container, Header, Body, Title, Text, Form, Left, Right, Content, Picker, Button, Icon, Item, Input, Label} from "native-base";


export default class CreateRequestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: undefined
        };
    }

    onValueChange(value: string) {
        this.setState({
           selected: value
        });
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
                        <Picker
                            mode="dropdown"
                            placeholder="Select a Game"
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Item label="League of Legends" value="game0" />
                            <Item label="Overwatch" value="game1" />
                            <Item label="Super Smash Bros. Melee" value="game2" />
                            <Item label="Super Smash Bros. for Wii U" value="game3" />
                        </Picker>
                        <Item floatingLabel>
                            <Icon active ios='ios-pin' android='md-pin' />
                            <Label>Location</Label>
                            <Input />
                        </Item>
                        <Body>
                            <Button full primary
                                onPress={() => navigate('Dashboard')}
                            >
                                <Text>Send Request</Text>
                            </Button>
                        </Body>
                    </Form>
                </Content>
            </Container>
        );
    }
}

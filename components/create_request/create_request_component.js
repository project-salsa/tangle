import React from 'react';
import {Container, Header, Body, Title, Form, Text, Left, Center, Content, Picker, Button} from "native-base";


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
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() =>this.props.navigation.goBack()}>
                            <Icon name="back-arrow" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Create Game Request</Title>
                    </Body>
                </Header>
                <Content>
                    <Body>
                        <Form>
                            <Picker
                                mode="dropdown"
                                placeholder="Select a Game"
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Item label="League of Legends" value="lol" />
                                <Item label="Overwatch" value="ow" />
                                <Item label="Super Smash Bros. Melee" value="melee" />
                                <Item label="Super Smash Bros. for Wii U" value="smash4" />
                            </Picker>
                        </Form>
                    </Body>
                </Content>
            </Container>
        );
    }
}

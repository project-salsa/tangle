import React from 'react'
import {Container, Header, Body, Title, Text, Form, Content, View, Button, Icon, Item, Input, Label} from 'native-base'

export default class CreateRequestComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            field1: undefined,
            field2: undefined,
            field3: undefined,
            field4: undefined,
            field5: undefined
        }
    }

    render () {
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <Header style={{backgroundColor: "black"}}>
                    <Body>
                    <Title style={{fontWeight: "bold", fontSize: 30}}>First-Time Setup</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Form style={{backgroundColor: "#AAAAAA"}}>
                        <Item inlineLabel>
                            <Label>  Display Name: </Label>
                            <Input onChangeText={(input) => this.setState({field1: input})} />
                        </Item>
                        <Item inlineLabel>
                            <Label>  Date of Birth: </Label>
                            <Input onChangeText={(input) => this.setState({field2: input})} />
                        </Item>
                        <Item inlineLabel>
                            <Label>  Discord Tag: </Label>
                            <Input onChangeText={(input) => this.setState({field3: input})} />
                        </Item>
                        <Item inlineLabel>
                            <Label>  Misc Attribute1: </Label>
                            <Input onChangeText={(input) => this.setState({field4: input})} />
                        </Item>
                        <Item inlineLabel>
                            <Label>  Misc Attribute2: </Label>
                            <Input onChangeText={(input) => this.setState({field5: input})} />
                        </Item>
                    </Form>
                    <View style={{backgroundColor: "#999999", height: 15}}/>
                    <View style={{height: 10}}/>
                    <View>
                        <Button full primary
                                onPress={() => {
                                    alert("Printing out input fields: \n" +
                                          "Field 1: " + this.state.field1 + "\n" +
                                          "Field 2: " + this.state.field2 + "\n" +
                                          "Field 3: " + this.state.field3 + "\n" +
                                          "Field 4: " + this.state.field4 + "\n" +
                                          "Field 5: " + this.state.field5 + "\n");
                                    navigate('UserProfile');
                                }}
                        >
                            <Text>CONTINUE</Text>
                        </Button>
                    </View>
                    <View style={{height: 25}}/>
                </Content>
            </Container>
        )
    }
}
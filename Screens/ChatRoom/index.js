import React, { Component } from 'react';
import { Container, Header, Left, Right, Body, Title, Thumbnail, Item, Icon, Input, Subtitle, Footer, FooterTab } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, Platform, Image, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { BaseColor, db, auth } from '../../config/index';
import { MessageItem } from '../../Components/index'
export default class ChatRoom extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            user: {
                date: "3/4/2020",
                email: "usama@gmail.com",
                image: "https://firebasestorage.googleapis.com/v0/b/chat-app-react-native-ee70d.appspot.com/o/Users%2Ft4a91wKfdaRjVbiCZJePMx19jck1?alt=media&token=ad14c9d3-ab7b-4cfe-bcae-355809eb5834",
                name: "Muhammad Usama",
                pass: "usama@gmail.com",
                time: "23:21:16",
                uid: "t4a91wKfdaRjVbiCZJePMx19jck1",
            },

        };
    };

    componentDidMount() {
        // this.setState({
        //     user: this.props.navigation.state.params.userData
        // })
        // console.log("particular user props___________________", this.props.navigation.state.params.userData)
    }
    render() {
        const { user } = this.state;
        return (
            // { user== null &&}
            <Container>
                <Header style={{ height: 80, backgroundColor: BaseColor.primaryColor }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("Home") }}>
                        <Icon name="arrow-back" style={{ padding: 8, color: "white", marginTop: 15 }} />
                    </TouchableOpacity>
                    <Left >
                        <Thumbnail source={{ uri: user.image }} />
                    </Left>
                    <Body>
                        <Title>{user.name}</Title>
                        <Subtitle>Online</Subtitle>
                    </Body>
                    <Right >
                        {/* <Thumbnail style={{ width: 35, height: 35 }} source={require('../../assets/images/recievecall.png')} /> */}
                    </Right>
                </Header>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <Grid style={{ display: "flex", flexDirection: "column" }}>
                        <ScrollView
                            style={{
                                // backgroundColor: 'pink',
                                marginHorizontal: 2,
                            }}
                        >

                            <MessageItem
                                sender={true}
                                text={"Hey Usama how r u?"}
                                date={"20/20/2020"}
                            />
                            <MessageItem
                                sender={false}
                                text={"I m good what about you?"}
                                date={"20/20/2020"}
                            />
                            <MessageItem
                                sender={true}
                                text={"I m fine..."}
                                date={"20/20/2020"}
                            />
                            <MessageItem
                                sender={false}
                                text={"What are you doing"}
                                date={"20/20/2020"}
                            />
                            <MessageItem
                                sender={true}
                                text={"Nothing special"}
                                date={"20/20/2020"}
                            />
                            <MessageItem
                                sender={false}
                                text={"Have a great day :)"}
                                date={"20/20/2020"}
                            />
                            <MessageItem
                                sender={true}
                                text={"thanks same to you"}
                                date={"20/20/2020"}
                            />
                            <MessageItem
                                sender={true}
                                text={"Hey there"}
                                date={"20/20/2020"}
                            />
                            <MessageItem
                                sender={true}
                                text={"Hey there"}
                                date={"20/20/2020"}
                            />
                            <MessageItem
                                sender={true}
                                text={"Hey there"}
                                date={"20/20/2020"}
                            />
                        </ScrollView>
                    </Grid>
                </TouchableWithoutFeedback>
                <KeyboardAvoidingView
                    behavior={Platform.Os == "ios" ? "padding" : "height"}
                // style={styles.container}
                >
                    <Item style={{ padding: 10, borderWidth: 3, borderColor: BaseColor.grayColor, marginBottom: 20 }} rounded>
                        <Icon active name='ios-flower' />
                        <Input placeholder='Icon Textbox' />
                        <Right style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: 'center' }}>
                            {/* <Icon active name='microphone' size={30} style={{ color: BaseColor.grayColor, }} /> */}
                            <Icon active name='ios-arrow-dropright' size={35} style={{ color: BaseColor.darkPrimaryColor, marginLeft: 10 }} />
                        </Right>
                    </Item>
                </KeyboardAvoidingView>
            </Container >
        );
    }
}


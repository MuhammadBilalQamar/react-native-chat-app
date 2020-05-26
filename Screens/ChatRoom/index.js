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
            targetUser: null,
            currentUser: null,
            currentChatId: "",
            chats: [],
            messageText: "",
            date: this.getDate(),
            time: this.getTime()
        };
    };

    async componentDidMount() {
        // let currentUser = {
        //     date: "26/5/2020",
        //     email: "hadeed@gmail.com",
        //     image: "https://firebasestorage.googleapis.com/v0/b/chat-app-react-native-ee70d.appspot.com/o/Users%2F9Zq7xSgMNHcmLxXtd9UMcQSKc7r1?alt=media&token=e50eda72-9f85-4ec9-937c-369e383c357b",
        //     name: "Hadeed Abid hussain",
        //     pass: "1234567",
        //     time: "21: 23: 46",
        //     uid: "9Zq7xSgMNHcmLxXtd9UMcQSKc7r1"
        // }
        // let targetUser = {
        //     date: "3/4/2020",
        //     email: "bilal@gmail.com",
        //     image: "https://firebasestorage.googleapis.com/v0/b/chat-app-react-native-ee70d.appspot.com/o/Users%2FyEosYWIFkXUvMoQ5OEmTU3t3GdQ2?alt=media&token=88c218ba-98e7-4e9e-a941-01ce652c0c29",
        //     name: "Muhammad Bilal  Qamar",
        //     pass: "bilal@gmail.com",
        //     time: "2:17:39",
        //     uid: "yEosYWIFkXUvMoQ5OEmTU3t3GdQ2"
        // }
        console.log(this.props.route.params)
        let { currentUser, targetUser } = this.props.route.params;
        this.setState({ currentUser, targetUser }, () => {
            this.decideCurrentChatId();
            this.fetchMessage();
        });

        // this.setState({
        //     user: this.props.navigation.state.params.userData
        // })
        // console.log("particular user props___________________", this.props.navigation.state.params.userData)
    }
    getDate(date = new Date()) {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let formatedDate = month + '/' + day + '/' + year;
        return formatedDate
    }

    getTime() {
        var d = new Date();
        let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        return time;
    }
    ///Messsage Functionality

    async fetchMessage() {
        let { currentUser, targetUser, currentChatId, messageText, date, chats } = this.state;
        chats = []
        try {
            if (currentUser && targetUser) {
                let tempChats = [];
                db.ref(`chats/${currentChatId}/`).on('value', (snap) => {
                    tempChats = snap.val();
                    if (tempChats) {
                        let newArrayDataOfOjbect = Object.values(tempChats)[0];
                        let filteredChats = Object.values(newArrayDataOfOjbect);
                        // this.setChats(filteredChats)
                        this.setState({ chats: filteredChats });
                    }
                });

            }
        } catch (error) {
            console.log("Error in fetching chats kindly check firebase api in config folder")
        }
    }


    async sendMessage() {
        // console.log("state--------------", this.state.chats)
        let { currentUser, targetUser, currentChatId, messageText, date, time, chats } = this.state;

        if (currentUser && targetUser) {
            if (messageText != "") {
                let messageKey = db.ref(`chats/${currentChatId}/`).push().key
                db.ref(`chats/${currentChatId}/${messageKey}/`).set({
                    name: currentUser.name,
                    message: messageText,
                    date,
                    time,
                    uid: currentUser.uid,
                    currentChatId,
                    messageKey
                });
                this.setState({ messageText: "" });
            }
            else {
            }
        }
    }


    async decideCurrentChatId() {
        // console.log("enter in decide chat id------------------")
        let { currentUser, targetUser, messageText, date } = this.state;
        let currentChatId = `${currentUser.uid}${targetUser.uid}`;
        db.ref(`chats/${currentChatId}`).on('value', snap => {
            if (snap.val()) {
                this.setState({ currentChatId })
            }
            else {
                let newCurrentChatId = `${targetUser.uid}${currentUser.uid}`;
                db.ref(`chats/${newCurrentChatId}`).on('value', snap => {
                    // console.log(snap.val())
                    if (snap.val()) {
                        this.setState({ currentChatId: newCurrentChatId })
                    }
                    else {
                        this.setState({ currentChatId: newCurrentChatId })
                    }
                });
            }
        })
    }



    render() {
        const { targetUser, chats, currentUser } = this.state;
        return (
            // { user== null &&}
            <Container>
                <Header style={{ height: 80, backgroundColor: BaseColor.primaryColor }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("Home") }}>
                        <Icon name="arrow-back" style={{ padding: 8, color: "white", marginTop: 15 }} />
                    </TouchableOpacity>
                    <Left >
                        {targetUser && <Thumbnail source={{ uri: targetUser.image }} />}
                    </Left>
                    <Body>
                        {targetUser && <Title>{targetUser.name}</Title>}
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
                                marginHorizontal: 2,
                            }}
                        >
                            {chats.length != 0 &&
                                chats.map((item, index) => {
                                    if (item.uid == currentUser.uid) {
                                        return (
                                            <MessageItem
                                                key={index}
                                                sender={true}
                                                text={item.message}
                                                date={item.time}
                                            />
                                        )
                                    }
                                    else {
                                        return (
                                            <MessageItem
                                                key={index}
                                                sender={false}
                                                text={item.message}
                                                date={`${item.time}`}
                                            />)
                                    }
                                })
                            }
                        </ScrollView>
                    </Grid>
                </TouchableWithoutFeedback>
                <KeyboardAvoidingView
                    behavior={Platform.Os == "ios" ? "padding" : "height"}
                // style={styles.container}
                >
                    <Item style={{ padding: 10, borderWidth: 3, borderColor: BaseColor.grayColor, marginBottom: 20 }} rounded>
                        <Icon active name='ios-flower' />
                        <Input placeholder='Type Here...'
                            onChangeText={(text) => this.setState({ messageText: text })}
                            value={this.state.messageText}
                        />
                        <Right style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: 'center' }}>

                            <TouchableOpacity onPress={() => { this.sendMessage() }}>
                                <Icon active name='ios-arrow-dropright' size={35} style={{ color: BaseColor.darkPrimaryColor, marginLeft: 10 }} />
                            </TouchableOpacity>
                        </Right>
                    </Item>
                </KeyboardAvoidingView>
            </Container >
        );
    }
}


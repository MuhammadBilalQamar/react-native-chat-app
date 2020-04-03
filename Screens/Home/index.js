import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, Left, Right, Body, Title, Button, ScrollableTab, TabHeading, Icon, Text, View } from 'native-base';
import { BaseColor, db, auth } from '../../config/index';
import { AsyncStorage } from 'react-native';
import Profile from '../Profile/index';
import RenderUsers from '../RenderUsers/index';

export default class Home extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            uid: null
        };
    }

    componentDidMount = async () => {
        // console.log("home props-------", this.props.route.params.uid)
        // if (this.props.route.params.uid) {
        //     this.setState({ uid: this.props.route.params.uid });
        // }
        // else {
        //     this.props.navigation.navigate("Login")
        // }


    }





    _retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
        } catch (error) {
            console.log(error)
        }
    }

    logOut = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            // this.props.navigation.navigate("Login")
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        return (
            <Container >
                <Header hasTabs style={{ height: 80, backgroundColor: BaseColor.primaryColor }}>
                    <Left>
                        <Title style={{ marginLeft: 20, fontSize: 25, fontStyle: "italic" }}>Live Chat</Title>
                    </Left>

                    <Right >
                        <Button full primary rounded
                            style={{ backgroundColor: BaseColor.navyBlue, padding: 10 }}
                            onPress={() => { this.logOut('uid') }}>
                            <Text> logOut </Text>
                        </Button>
                    </Right>
                </Header>
                <Tabs backgroundColor="white" renderTabBar={() => <ScrollableTab style={{ backgroundColor: BaseColor.primaryColor }} />}>
                    <Tab name={"allUsers"} heading={<TabHeading style={{ backgroundColor: BaseColor.primaryColor }}><Icon name="ios-chatbubbles" /><Text>Chats</Text></TabHeading>}>
                        {/* <Chat chatHomeNavProps={this.props.navProps} /> */}
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: BaseColor.primaryColor }}><Icon name="paper" /><Text>All Users</Text></TabHeading>}>
                        <RenderUsers currentUser={"hey"} />
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: BaseColor.primaryColor }}><Icon name="person" /><Text>Profile</Text></TabHeading>}>
                        <Profile />

                    </Tab>
                </Tabs>

            </Container>

        );
    }
}

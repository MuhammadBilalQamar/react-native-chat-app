import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, Left, Right, Body, Title, Button, ScrollableTab, TabHeading, Icon, Text, View } from 'native-base';
import { BaseColor, db, auth } from '../../config/index';
import { AsyncStorage } from 'react-native';
import Profile from '../Profile/index';
import RenderUsers from '../RenderUsers/index';
import MyChats from '../MyChats/index';
import { connect } from "react-redux"
import fetchUsers from "../../redux/actions/fetchUsers"
class Home extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            uid: null,
            currentUser: null,
            allUsers: [],
            isFetching: true
        };
    }

    componentDidMount = async () => {
        let { uid } = this.props;
        if (uid) {
            await this.props.fetchUsers(uid)
            this.setState({ isFetching: false })
        }
        else {
            this.props.navigation.navigate("Login")
        }
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
            this.props.navigation.navigate("Login")
        } catch (error) {
            console.log(error);
        }
    }



    render() {
        // console.log("HOME PROPS-----------", this.props)
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
                        <MyChats chatHomeNavProps={this.props} />
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: BaseColor.primaryColor }}><Icon name="paper" /><Text>All Users</Text></TabHeading>}>
                        {this.props.allUsers && <RenderUsers currentUser={"hey"} allUsers={this.props.allUsers} />}
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: BaseColor.primaryColor }}><Icon name="person" /><Text>Profile</Text></TabHeading>}>
                        {this.props.currentUser && <Profile currentUser={this.props.currentUser} />}

                    </Tab>
                </Tabs>

            </Container>

        );
    }
}

const mapStateToProps = (state) => {
    // console.log("home redux state-------", state)
    try {
        return {
            currentUser: state.currentUser,
            uid: state.uid,
            allUsers: state.allUsers
        }
    } catch (error) {
        console.log("error in home from mapStatetoPorps---------", error)
        return {

        }
    }
}

const mapDispatchToProps = (dispatch) => {
    // console.log("home redux dispatch-------", dispatch)
    try {
        return {
            fetchUsers: (id) => { dispatch(fetchUsers(id)) },
        }
    } catch (error) {
        console.log("error in home from mapStatetoPorps---------", error)
        return {

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
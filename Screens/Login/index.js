import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text, H1, H3, View } from 'native-base';
import { BaseColor, auth, db } from '../../config/index';
import { AsyncStorage, StyleSheet, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from "react-redux";
// import fetchUsers from "../../redux/actions/fetchUsers"

class Login extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            email: 'bilal@gmail.com',
            pass: 'bilal@gmail.com',
            uid: null,
            spinner: false
        };
    }

    componentDidMount() {

        // this._removeData('uid')
        // this._retrieveData('uid').then((uid) => {
        //     if (uid) {
        //         this.props.navigation.navigate("Home", { uid })
        //     }
        //     else {
        //         console.log("user not exists")
        //     }
        // }).catch((error) => {
        //     console.log('Promise is rejected with error: ' + error);
        // });

    }

    Login = async () => {
        let { email, pass, uid } = this.state;
        this.setState({ spinner: true })
        auth.signInWithEmailAndPassword(email, pass)
            .then(res => {
                let uid = res.user.uid;
                let currentUser = null;
                let dbRef = db.ref('Users/' + uid);
                dbRef.on('value', (users) => {
                    currentUser = users.val();

                    if (currentUser) {
                        this._storeData(uid);
                        this.setState({ spinner: false })
                        this.props.updateUser(currentUser);
                        this.props.navigation.navigate("Home")
                    }
                    else {
                        console.log("errorr--------", currentUser)
                        alert("Something went wrong please check your network connection and login again")
                        this.setState({ spinner: false })
                    }
                });
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                alert(errorMessage)
                this.setState({ spinner: false })
            });
    }


    navigateToSignup() {
        this.props.navigation.navigate("SignUp")
    }


    //LOCAL STORAGE METHODS

    _storeData = async (value) => {
        try {
            await AsyncStorage.setItem('uid', value);
        } catch (error) {
            console.log(error)
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

    _removeData = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        // console.log(this.props)
        return (
            <Container>
                {/* <Header /> */}
                <Spinner
                    visible={this.state.spinner}
                    textContent={"Please Wait"}
                    textStyle={styles.spinnerTextStyle}
                />
                <Content style={{ backgroundColor: BaseColor.fieldColor }}>
                    <KeyboardAvoidingView
                        behavior={Platform.Os == "ios" ? "padding" : "height"}
                    // style={styles.container}
                    >
                        <Form style={{ marginTop: 150, alignItems: 'center' }}>
                            <H1 style={{ fontStyle: "italic", fontSize: 30, fontWeight: "bold", color: BaseColor.darkPrimaryColor }}>Login</H1>
                            <View style={{ width: "100%", paddingHorizontal: 25 }}>
                                <Item floatingLabel>
                                    <Label>Email</Label>
                                    <Input
                                        onChangeText={(text) => this.setState({ email: text })}
                                        value={this.state.email}
                                        style={{ marginBottom: 7, borderColor: BaseColor.darkPrimaryColor, borderBottomWidth: 2, color: BaseColor.primaryColor }}
                                    />
                                </Item>
                                <Item floatingLabel style={{ marginTop: 10 }}>
                                    <Label>Password</Label>
                                    <Input
                                        onChangeText={(text) => this.setState({ pass: text })}
                                        value={this.state.pass}
                                        secureTextEntry={true}
                                        style={{ marginBottom: 7, borderColor: BaseColor.darkPrimaryColor, borderBottomWidth: 2, color: BaseColor.primaryColor }}
                                    />
                                </Item>
                            </View>
                            <View style={{ width: "100%", paddingHorizontal: 30, alignItems: "center" }}>
                                <Button full primary style={{ backgroundColor: BaseColor.primaryColor, padding: 10, marginTop: 45 }} onPress={() => { this.Login() }}>
                                    <Text> Login </Text>
                                </Button>
                                <Button full primary style={{ backgroundColor: BaseColor.primaryColor, padding: 10, marginTop: 45 }} onPress={() => { this._removeData(this.state.email) }}>
                                    <Text> SignIn with facebook </Text>
                                </Button>
                                <Text style={{ padding: 15, fontSize: 18 }}> If you'r new signup from <H3 onPress={() => { this.navigateToSignup() }} style={{ color: BaseColor.primaryColor, textDecorationLine: "underline", }} >Here</H3> </Text>
                                {/* <Button full light primary><Text> Sign Up </Text></Button> */}
                            </View>
                        </Form>
                    </KeyboardAvoidingView>

                </Content>
            </Container >
        );
    }
}



const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

const mapStateToProps = (state) => {
    return {
        // name: state.name,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => { dispatch({ type: "UPDATE_USER", payload: user }) },
        // fetchUsers: (id) => { dispatch(fetchUsers(id)) },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
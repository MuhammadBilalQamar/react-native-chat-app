import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text, H1, H3, View } from 'native-base';
import { BaseColor, auth, db } from '../../config/index';
import { AsyncStorage } from 'react-native';

export default class Login extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            uid: null
        };
    }

    componentDidMount() {

        // this._removeData('uid')
        this._retrieveData('uid').then((uid) => {
            if (uid) {
                this.props.navigation.navigate("Home", { uid })
            }
            else {
                console.log("user not exists")
            }
        }).catch((error) => {
            console.log('Promise is rejected with error: ' + error);
        });

    }

    Login = async () => {
        let { email, pass, uid } = this.state;
        // this.props.navigation.navigate("Home")
        auth.signInWithEmailAndPassword(email, pass)
            .then(res => {
                let uid = res.user.uid;
                this._storeData(uid);
                this.props.navigation.navigate("Home", { uid })
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                alert(errorMessage)
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
        return (
            <Container>
                {/* <Header /> */}
                <Content style={{ backgroundColor: BaseColor.fieldColor }}>
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
                </Content>
            </Container >
        );
    }
}
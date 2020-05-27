import React, { Component } from 'react';
import { Container, Header, Content, Form, Picker, Item, Input, Label, Thumbnail, Button, Text, H1, H3, Icon } from 'native-base';
import { db, auth, BaseColor, storage } from '../../config/index';
import { View, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Analytics from 'expo-firebase-analytics';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu'
});

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            pass: '',
            repeatPass: '',
            image: null,
            date: '',
            time: '',
            selected2: "Karachi",
            uid: null,
            isUploading: false,
            imageUrl: null,
            spinner: false
        };
    }

    componentDidMount() {
        // console.log( this.props.navigation.state.params.hi)
        this.getDateAndTime();
        this.getPermissionAsync();
    }

    getDateAndTime() {
        var d = new Date();
        var today = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
        var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        this.setState({ date: today, time })
        // console.log(today)
    }
    navigateToLogin() {
        this.props.navigation.navigate("Login")
    }


    async uploadImage(file) {
        let { name, image, email, pass, repeatPass, date, time } = this.state;

        const response = await fetch(file);
        const blob = await response.blob();

        let storageRef = storage.ref("Users/");

        let uploadTask = storageRef.child(this.state.newUserUid).put(blob);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion\
        this.setState({ spinner: true });
        uploadTask.on('state_changed', (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            this.setState({ uploadPercentage: parseInt(progress) });
            switch (snapshot.state) {
                case storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, (error) => {
            console.log("error in uploading-----", error)
            alert(error);
            this.setState({ spinner: false });
            // Handle unsuccessful uploads
        }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                // this.setState({ imageUrl: downloadURL });
                if (downloadURL) {
                    db.ref("Users/" + this.state.newUserUid + "/").set({
                        name,
                        email,
                        pass,
                        date,
                        time,
                        image: downloadURL,
                        uid: this.state.newUserUid
                    }).then(() => {
                        alert("Conguratulations You Have Been Successfully Registered,please login and continue");
                        this.setState({ spinner: false })
                        Analytics.logEvent('SignUp', {
                            userId: uid,
                            screen: 'SignUp',
                            purpose: 'A new user signUp in our app',
                            userEmail: email
                        });
                        this.props.navigation.navigate("Login")
                    });

                }
            });
        });
    }


    Signup = async () => {

        // let blob = new Blob(

        let { name, image, email, pass, repeatPass, date, time } = this.state;


        if (name != "" && email != "" && pass != '' && repeatPass != '' && image != null) {

            if (pass === repeatPass) {

                auth.createUserWithEmailAndPassword(email, pass).then((e) => {
                    // console.log("user uid******", e.user.uid);
                    this.setState({ newUserUid: e.user.uid })
                    this.uploadImage(this.state.image);

                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // console.log(errorMessage);
                    alert(errorMessage);
                });
            }
            else {
                alert("Your Password Must Be Same");
            }

        }
        else {
            alert("Please fill all the fields");
        }

    }

    render() {
        let { image } = this.state;

        return (
            <Container>
                <Spinner
                    visible={this.state.spinner}
                    textContent={` wait image is uploading ${this.state.uploadPercentage}%`}
                    textStyle={styles.spinnerTextStyle}
                />

                <Content style={{ backgroundColor: BaseColor.fieldColor }}>

                    <Form style={{ marginTop: 150, alignItems: 'center' }}>

                        <H1 style={{ fontStyle: "italic", fontSize: 30, fontWeight: "bold", color: BaseColor.darkPrimaryColor }}>SignUp</H1>
                        <View style={{ width: "100%", paddingHorizontal: 25 }}>
                            <Item floatingLabel>
                                <Label>Name</Label>
                                <Input
                                    onChangeText={(text) => this.setState({ name: text })}
                                    value={this.state.name}
                                    style={{ marginBottom: 7, borderColor: BaseColor.darkPrimaryColor, borderBottomWidth: 2, color: BaseColor.primaryColor }
                                    } />
                            </Item>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input
                                    onChangeText={(text) => this.setState({ email: text })}
                                    value={this.state.email}
                                    style={{ marginBottom: 7, borderColor: BaseColor.darkPrimaryColor, borderBottomWidth: 2, color: BaseColor.primaryColor }
                                    } />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({ pass: text })}
                                    value={this.state.pass}
                                    style={{ marginBottom: 7, borderColor: BaseColor.darkPrimaryColor, borderBottomWidth: 2, color: BaseColor.primaryColor }
                                    } />
                            </Item>
                            <Item floatingLabel>
                                <Label>Repeat Password</Label>
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({ repeatPass: text })}
                                    value={this.state.repeatPass}
                                    style={{ marginBottom: 7, borderColor: BaseColor.darkPrimaryColor, borderBottomWidth: 2, color: BaseColor.primaryColor }
                                    } />
                            </Item>
                            {!image &&
                                <TouchableOpacity onPress={this._pickImage} style={{ textAlign: "center", alignItems: "center" }}>
                                    <Thumbnail source={require('../../assets/images/av1.jpg')} style={{ marginTop: 20, width: 100, height: 100 }} />
                                    <Text style={{ fontSize: 18, color: BaseColor.primaryColor }}>Pick Image</Text>

                                    {/* {image &&
                                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                                </TouchableOpacity>
                            }
                            {image &&
                                <TouchableOpacity onPress={this._pickImage} style={{ textAlign: "center", alignItems: "center" }}>
                                    <Thumbnail source={{ uri: image }} style={{ marginTop: 20, width: 100, height: 100 }} />
                                    <Text style={{ fontSize: 18, color: BaseColor.primaryColor }}>Pick Image</Text>

                                    {/* {image &&
                            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                                </TouchableOpacity>

                            }

                        </View>
                        <View style={{ width: "100%", paddingHorizontal: 30, alignItems: "center" }}>
                            <Button full primary style={{ padding: 10, marginTop: 30, backgroundColor: BaseColor.primaryColor }} onPress={() => this.Signup()}>
                                <Text> Sign Up </Text>
                            </Button>
                            <Text style={{ padding: 15, fontSize: 18 }}> If you already have an account: <H3 onPress={() => { this.navigateToLogin() }} style={{ color: BaseColor.primaryColor, textDecorationLine: "underline" }} >Login</H3> </Text>
                        </View>

                    </Form>
                </Content>
            </Container>
        );
    }



    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            // const response = await fetch(result.uri);
            // console.log(response)
            this.setState({
                image: result.uri,
                imageResult: result
            });
        }
    };
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
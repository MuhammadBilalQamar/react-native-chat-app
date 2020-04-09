import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Button, Item, Icon, Toast, Input, Text, View, Thumbnail } from 'native-base';
import { BaseColor, auth, db, storage } from '../../config/index';
import { AsyncStorage, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Spinner from 'react-native-loading-spinner-overlay';


export default class Profile extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userNewName: "",
            image: "",
            uid: "yEosYWIFkXUvMoQ5OEmTU3t3GdQ2",
            spinner: false,
            uploadPercentage: null,
            showToast: false

        };
    }

    async componentDidMount() {
        console.log(this.props.currentUser)

        if (this.props.currentUser) {
            let { currentUser } = this.props;
            this.setState({ user: currentUser, userNewName: currentUser.name, image: currentUser.image, uid: currentUser.uid })
        }
        // let User;
        // User = {
        //     date: "3/4/2020",
        //     email: "bilal@gmail.com",
        //     image: "https://firebasestorage.googleapis.com/v0/b/chat-app-react-native-ee70d.appspot.com/o/Users%2FyEosYWIFkXUvMoQ5OEmTU3t3GdQ2?alt=media&token=20c7a7c7-5604-42f4-b68c-f5554b1ce08c",
        //     name: "Muhammad Bilal Qamar",
        //     pass: "bilal@gmail.com",
        //     time: "2:17:39",
        //     uid: "yEosYWIFkXUvMoQ5OEmTU3t3GdQ2",
        // }
        // this.setState({ user: User, userNewName: User.name, image: User.image, uid: User.uid });

    }

    async updateUserData() {
        let { userNewName, user, image } = this.state;
        if (user.image != image) {
            this.uploadImage(image);
        }
        else if (user.name != userNewName) {
            user.name = userNewName
            db.ref("Users/" + this.state.uid + "/").set({
                name: user.name,
                email: user.email,
                pass: user.pass,
                date: user.date,
                time: user.time,
                image: image,
                uid: user.uid
            }).then(() => {
                alert("Your Information Successfully Updated");
                this.setState({ spinner: false, userNewName })
                // this.props.navigation.navigate("Login")
            });
        }
        else {
            alert("please modify name or image then continue")
        }

    }

    async uploadImage(file) {
        let { userNewName, user } = this.state;
        user.name = userNewName;
        let response = await fetch(file);
        let blob = await response.blob();
        let storageRef = storage.ref("Users/");
        let uploadTask = storageRef.child(this.state.uid).put(blob);

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
                    user.image = downloadURL;
                    db.ref("Users/" + this.state.uid + "/").set({
                        name: user.name,
                        email: user.email,
                        pass: user.pass,
                        date: user.date,
                        time: user.time,
                        image: downloadURL,
                        uid: user.uid
                    }).then(() => {
                        alert("Your Information Successfully Updated");
                        this.setState({ spinner: false, image: downloadURL })
                        // this.props.navigation.navigate("Login")
                    });
                }
            });
        });
    }

    render() {
        let { user, image } = this.state
        return (
            this.state.user &&
            <Container style={{ margin: 20, marginTop: 30 }}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={` wait image is uploading ${this.state.uploadPercentage}%`}
                    textStyle={styles.spinnerTextStyle}
                />
                <Content padder >
                    <Card>
                        <CardItem header>
                            <View style={{
                                flex: 1,
                                alignItems: "center",
                            }}>
                                <TouchableOpacity onPress={this._pickImage} style={{ textAlign: "center", alignItems: "center" }}>
                                    <Thumbnail placeholderColor='#b3e5fc' source={{ uri: image }} style={{ marginTop: 20, width: 100, height: 100 }} />

                                </TouchableOpacity>

                                <Item regular style={{ marginTop: 20 }}>
                                    <Input placeholder='Muhammad Bilal'
                                        onChangeText={(text) => this.setState({ userNewName: text })}
                                        value={this.state.userNewName}
                                    />
                                </Item>

                                <Item regular disabled style={{ marginTop: 20 }}>
                                    <Button
                                        transparent
                                        style={{ width: "100%", height: "100%" }}
                                        onPress={() =>
                                            Toast.show({
                                                text: "Sorry email is not editable",
                                                buttonText: "Okay",
                                                textStyle: { color: BaseColor.primaryColor },

                                            })}
                                    >
                                        <Input disabled placeholder='Muhammad Bilal'
                                            value={this.state.user.email}
                                        />
                                        <Icon name='information-circle' />
                                    </Button>
                                </Item>

                                <Item regular disabled style={{ marginTop: 20 }}>
                                    <Button
                                        transparent
                                        style={{ width: "100%", height: "100%" }}
                                        onPress={() =>
                                            Toast.show({
                                                text: "Sorry date is not editable",
                                                buttonText: "Okay",
                                                textStyle: { color: BaseColor.primaryColor },

                                            })}
                                    >
                                        <Input disabled placeholder='Muhammad Bilal'
                                            value={`Joined On ${this.state.user.date}`}
                                        />
                                        <Icon name='information-circle' color={"yellow"} />
                                    </Button>
                                </Item>
                                <Button full primary style={{ padding: 10, marginTop: 30, backgroundColor: BaseColor.primaryColor }} onPress={() => this.updateUserData()}>
                                    <Text> Update </Text>
                                </Button>
                            </View>
                        </CardItem>
                    </Card>
                </Content>
            </Container >

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
import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text, H1, H3, View } from 'native-base';
import { BaseColor, db, auth } from '../../config/index';
import { AsyncStorage } from 'react-native';

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
        // // console.log("home props-------",this.props.route.params.uid)
        // if (this.props.route.params.uid) {

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


    render() {
        return (
            <Container>

            </Container >
        );
    }
}
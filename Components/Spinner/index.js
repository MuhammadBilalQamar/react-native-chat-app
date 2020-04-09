
import React, { Component } from 'react';
import { Container } from 'native-base';
import { Platform, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu'
});

export default class Spiner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: true
        };

    }



    render() {

        return (
                <Spinner
                    visible={this.state.spinner}
                    textContent={this.props.text}
                    textStyle={styles.spinnerTextStyle}
                />
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
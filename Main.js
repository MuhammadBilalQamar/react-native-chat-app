import React, { Component } from 'react';
import AppNavigator from './Navigation'
import { Root } from "native-base";

class Main extends Component {

    render() {
        return (
            <Root>
                <AppNavigator />
            </Root>
        )
    }

}

export default Main;
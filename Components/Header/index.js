import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { StatusBar, Platform } from 'react-native';
import { BaseColor } from '../../config/index'
// if (Platform.OS === 'android') StatusBar.setHidden(true);

export default class Head extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Container>
                <Header hasTabs style={{ marginTop: 0, backgroundColor: BaseColor.primaryColor, ...this.props.style }}>
                    <Left>
                        <Button transparent onPress={() => this.props.leftBtnPress}>
                            <Icon name={this.props.leftIconName} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.title}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.rightBtnPress}>
                            <Icon name={this.props.rightIconName} />
                        </Button>
                    </Right>
                </Header>
            </Container>
        );
    }
}

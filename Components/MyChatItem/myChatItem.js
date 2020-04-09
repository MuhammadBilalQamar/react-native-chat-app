import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class MyChatItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.listItemClicked}>
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail square source={{ uri: this.props.imageUri }} />
                    </Left>
                    <Body>
                        <Text>{this.props.userName}</Text>
                        <Text note numberOfLines={1}>{`Joined on ${this.props.joinedDate}`}</Text>
                    </Body>
                    <Right>
                        {/* <TouchableOpacity onPress={this.props.inviteBtnClicked}>

                            <Button transparent>
                                <Text>Invite</Text>
                            </Button>
                        </TouchableOpacity> */}
                    </Right>
                </ListItem>
            </TouchableOpacity>
        );
    }
}
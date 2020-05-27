import React, { Component } from 'react';
import { Container, Content, List } from 'native-base';
import { ListUserItem } from '../../Components/index';

export default class RenderUsers extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            uid: null,
            allUsers: [],
            spinner: false
        };

    }

    async componentDidMount() {
        // console.log("render user props------", this.props);
        if (this.props.allUsers && this.props.allUsers != 0) {
            let users = await this.removeDuplicates(this.props.allUsers, "uid");
            this.setState({ allUsers: users })
        }
    }

    navigateToParticularUser(i) {
        let { allUsers } = this.state;
        let { currentUser, navigate } = this.props;
        let targetUser = allUsers[i];
        navigate.navigate("ChatRoom", { currentUser, targetUser })
        // console.log("all userss me hy -----------",currentUser)
    }

    async removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject = {};
        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }
        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }

    render() {
        let { allUsers } = this.state;

        return (
            allUsers &&
            <Container style={{ marginTop: 30 }}>
                <Content >
                    <List>
                        {allUsers.map((item, i) => {
                            return (
                                <ListUserItem
                                    key={i}
                                    imageUri={item.image}
                                    userName={item.name}
                                    joinedDate={item.date}
                                    userPressed={() => { this.navigateToParticularUser(i) }}
                                // isInviteShow={true}
                                />
                            )
                        })}
                    </List>
                </Content>
            </Container >

        );
    }

}


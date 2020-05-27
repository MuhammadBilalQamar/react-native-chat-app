import React, { Component } from 'react';
import { Container, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { MyChatItem } from "../../Components/index"
// import chat from './tabOne';
// import Tab5 from './tabFive';
export default class MyChats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userDetail: [{
                name: "Bilal Qamar",
                status: "don't judge a book by its cover",
                img: require('../../assets/images/av1.jpg'),
                time: "3:43 pm"
            },
            {
                name: "Muhammad Umer",
                status: "A creative man is motivated by desire to achieve.",
                img: require('../../assets/images/av2.png'),
                time: "4:43 pm"
            },
            {
                name: "Muhammad Bilal",
                status: "A creative man is motivated by desire to achieve.",
                img: require('../../assets/images/av3.jpg'),
                time: "5:43 pm"
            },
            ]
        };
    }

    componentDidMount() {
        // console.log("my chat props",this.props)
        // this.props.navigation.navigate("ChatToParticularUser")
    }
    navigateToChat = (index) => {
        // console.log(index)
        const { userDetail } = this.state;
        var userData = userDetail[index];
        this.props.chatHomeNavProps.navigate("ChatToParticularUser", {
            userData,
            chatNavProps: this.props.chatHomeNavProps
        })
        // console.log(userData)

    }
    render() {
        const { userDetail } = this.state;
        return (
            // <Icon name="apps" size={20} style={{ color: "blue" }} />
            <Container style={{ marginTop: 10 }}>
                <List>

                    {/* {userDetail.map((item, i) => {
                        return (
                            <MyChatItem
                                key={i}
                                // imageUri={item.img}
                                userName={item.name}
                                joinedDate={item.status}
                                listItemClicked={() => { console.log(i) }}
                            />
                        )
                    })} */}

                </List>
            </Container>
        );
    }
}
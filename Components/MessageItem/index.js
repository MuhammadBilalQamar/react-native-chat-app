import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { moderateScale } from 'react-native-size-matters';
import { BaseColor } from '../../config/index';

export default class MessageItem extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

    };

    render() {
        let { sender, text, date } = this.props
        return (
            sender ?
                <View style={[styles.item, styles.itemOut, { alignSelf: 'flex-end' }]}>
                    <View style={[styles.balloon, { backgroundColor: BaseColor.primaryColor }]}>
                        <Text style={{ fontSize: 18, paddingTop: 5, color: 'white' }}>{text}</Text>
                        <Text style={{ fontSize: 10, paddingTop: 5, color: 'white', alignSelf: 'flex-end' }}>{date}</Text>
                    </View>
                </View>
                :
                <View style={[styles.item, styles.itemOut, { alignSelf: 'flex-start', marginLeft: 20 }]}>
                    <View style={[styles.balloon, { backgroundColor: BaseColor.fieldColor }]}>
                        <Text style={{ fontSize: 18, paddingTop: 5, color: 'black' }}>{text}</Text>
                        <Text style={{ fontSize: 10, paddingTop: 5, color: 'black', alignSelf: 'flex-end' }}>{date}</Text>
                    </View>
                </View>
        )
    }
}


const styles = StyleSheet.create({
    item: {
        marginVertical: moderateScale(7, 2),
        flexDirection: 'row'
    },
    itemIn: {
        marginLeft: 20
    },
    itemOut: {
        alignSelf: 'flex-end',
        marginRight: 20
    },
    balloon: {
        maxWidth: moderateScale(250, 2),
        paddingHorizontal: moderateScale(10, 2),
        paddingTop: moderateScale(5, 2),
        paddingBottom: moderateScale(7, 2),
        borderRadius: 20,
    },

});

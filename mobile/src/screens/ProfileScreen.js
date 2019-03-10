/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 20:28:10
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 21:03:15
 */

//@flow

import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { material, systemWeights } from 'react-native-typography';
import { connect } from 'react-redux';
import NavigationScreenProps from 'react-navigation';
import { Icon } from 'react-native-elements';

import { logout } from '@actions';

type Props = NavigationScreenProps & {};

class ProfileScreen extends Component<Props> {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, marginHorizontal: 20, marginTop: 60 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                    <Text style={styles.titleStyle}>Profile</Text>
                    <TouchableOpacity onPress={() => this.props.logout()}>
                        <Icon iconStyle={{ marginTop: -20 }} type="material-community" name="exit-to-app" size={40} />
                    </TouchableOpacity>
                </View>
                <Image
                    style={{ width: 80, height: 80, borderRadius: 40, resizeMode: 'contain' }}
                    source={{ url: this.props.currentUser.avatarUrl }}
                />
                <Text style={styles.descriptionStyle}>{this.props.currentUser.username}</Text>
                <Text style={styles.descriptionStyle}>{this.props.currentUser.email}</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        ...material.display2Object,
        ...systemWeights.semibold,
        color: 'black'
    },
    descriptionStyle: {
        ...material.headlineObject,
        ...systemWeights.thin
    }
});

const mapStateToProps = ({ user }) => {
    const { currentUser } = user;

    return {
        currentUser
    };
};

export default connect(
    mapStateToProps,
    { logout }
)(ProfileScreen);

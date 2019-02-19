/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:50:26
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-02-19 14:57:07
 */

//@flow

import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Button } from 'react-native-elements';

type Props = NavigationScreenProps & {};

export default class SignInUpScreen extends Component<Props> {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Text>SignInUp Screen</Text>
                <Button title="SIGN IN" onPress={() => this.props.navigation.navigate('Home')} />
            </SafeAreaView>
        );
    }
}

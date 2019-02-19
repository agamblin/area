/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:50:09
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-02-19 15:15:36
 */

//@flow

import React, { Component } from 'react';
import { SafeAreaView, View, ActivityIndicator, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

type Props = NavigationScreenProps & {};

export default class LoadingScreen extends Component<Props> {
    render() {
        setTimeout(() => this.props.navigation.navigate('Auth'), 5000);
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Loading App...</Text>
            </SafeAreaView>
        );
    }
}

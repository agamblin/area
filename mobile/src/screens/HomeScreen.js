/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:50:42
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-02-19 15:05:07
 */

//@flow

import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

type Props = NavigationScreenProps & {};

export default class HomeScreen extends Component<Props> {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Text>HOME SCREEN</Text>
            </SafeAreaView>
        );
    }
}

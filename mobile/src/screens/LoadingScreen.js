/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:50:09
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-02-20 13:55:49
 */

//@flow

import React, { Component } from 'react';
import { SafeAreaView, View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { systemWeights } from 'react-native-typography';

type Props = NavigationScreenProps & {};

export default class LoadingScreen extends Component<Props> {
    render() {
        setTimeout(() => this.props.navigation.navigate('Auth'), 2000);
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'space-around', backgroundColor: 'white' }}>
                <Text style={styles.titleStyle}>TRIBE</Text>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        ...systemWeights.thin,
        fontSize: 68,
        textAlign: 'center',
        marginVertical: 40
    }
});

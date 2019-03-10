/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:50:26
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-02-20 13:42:45
 */

//@flow

import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Button } from 'react-native-elements';
import { systemWeights } from 'react-native-typography';

type Props = NavigationScreenProps & {};

export default class SignInUpScreen extends Component<Props> {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'space-evenly' }}>
                <Text style={styles.titleStyle}>WELCOME TO TRIBE</Text>
                <View>
                    <Button
                        title="SIGN IN"
                        onPress={() => this.props.navigation.navigate('SignIn')}
                        containerStyle={styles.buttonStyle}
                        buttonStyle={{ backgroundColor: 'black', marginBottom: 15 }}
                    />
                    <Button
                        title="SIGN UP"
                        onPress={() => this.props.navigation.navigate('SignUp')}
                        containerStyle={styles.buttonStyle}
                        buttonStyle={{ backgroundColor: 'black' }}
                    />
                </View>
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
    },
    buttonStyle: {
        marginHorizontal: 30,
        marginBottom: 30
    }
});

/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-20 12:45:35
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 19:57:28
 */

//@flow

import React, { Component } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { material, systemWeights } from 'react-native-typography';
import { connect } from 'react-redux';

import { Input } from '@components';
import { signIn, linkProviders, getProjects } from '@actions';

type Props = NavigationScreenProps & {};

type State = {
    email: string,
    password: string
};

class SignInScreen extends Component<Props, State> {
    usernameRef: any;
    passwordRef: any;

    constructor(props: Props, state: State) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.currentUser) {
            this.props.navigation.navigate('Main');
        } else if (nextProps.error) {
            alert(nextProps.error);
        }
    }

    onSignIn: Function = () => {
        const { email, password } = this.state;
        this.props.signIn(email, password).then(() => {
            this.props.linkProviders();
            this.props.getProjects();
        });
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={styles.titleStyle}>Sign In to Tribe</Text>
                <Input
                    label="EMAIL"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    onSubmitEditing={() => this.usernameRef.focus()}
                />
                <Input
                    label="PASSWORD"
                    placeholder="Enter your password"
                    autoCapitalize="none"
                    autoComplete="off"
                    value={this.state.password}
                    secureTextEntry
                    onChangeText={password => this.setState({ password })}
                    onSubmitEditing={this.onSignIn}
                    ref={ref => (ref = this.passwordRef)}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        ...material.display2Object,
        ...systemWeights.thin,
        marginVertical: 30,
        marginLeft: 15
    }
});

const mapStateToProps = ({ user }) => {
    const { currentUser, isLoading, error } = user;
    return {
        currentUser,
        isLoading,
        error
    };
};

export default connect(
    mapStateToProps,
    { signIn, linkProviders, getProjects }
)(SignInScreen);

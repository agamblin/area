/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-20 12:45:35
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 19:35:54
 */

//@flow

import React, { Component } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { material, systemWeights } from 'react-native-typography';
import { connect } from 'react-redux';

import { Input } from '@components';
import { signUp } from '@actions';

type Props = NavigationScreenProps & {};

type State = {
    email: string,
    username: string,
    password: string,
    token: string
};

class SignUpScreen extends Component<Props, State> {
    usernameRef: any;
    passwordRef: any;

    constructor(props: Props, state: State) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            token: ''
        };
        this.onSignUp = this.onSignUp.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.currentUser) {
            this.props.navigation.navigate('Main');
        } else if (nextProps.error) {
            alert(nextProps.error);
        }
    }

    onSignUp: Function = () => {
        const { email, password } = this.state;
        this.props.signUp(email, password);
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={styles.titleStyle}>Sign Up to Tribe</Text>
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
                    label="USERNAME"
                    placeholder="Enter your username"
                    autoCapitalize="none"
                    autoComplete="username"
                    value={this.state.username}
                    onChangeText={username => this.setState({ username })}
                    onSubmitEditing={() => this.passwordRef.focus()}
                    ref={ref => (ref = this.usernameRef)}
                />
                <Input
                    label="PASSWORD"
                    placeholder="Enter your password"
                    autoCapitalize="none"
                    autoComplete="off"
                    value={this.state.password}
                    secureTextEntry
                    onChangeText={password => this.setState({ password })}
                    onSubmitEditing={this.onSignUp}
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
    { signUp }
)(SignUpScreen);

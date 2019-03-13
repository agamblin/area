/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-20 12:45:35
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-13 18:37:32
 */

//@flow

import React, { Component } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { material, systemWeights } from 'react-native-typography';
import { connect } from 'react-redux';

import { Input } from '@components';
import { signUp, getUser } from '@actions';
import { changeBaseURL } from '@store';

type Props = NavigationScreenProps & {};

type State = {
    email: string,
    username: string,
    password: string,
    ip: string
};

class SignUpScreen extends Component<Props, State> {
    emailRef: any;
    usernameRef: any;
    passwordRef: any;

    constructor(props: Props, state: State) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            ip: ''
        };
        this.onSignUp = this.onSignUp.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.currentUser && nextProps.currentUser.token) {
            this.props.navigation.navigate('Main', { ip: this.state.ip });
        } else if (!this.props.error && nextProps.error) {
            alert(nextProps.error);
        }
    }

    onSignUp: Function = () => {
        const { email, password, username, ip } = this.state;
        const ipRegex = /([0-9]{1,3}\.){3}[0-9]{1,3}/;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!ipRegex.test(ip)) {
            alert('Please provide a valid IP Address');
            return;
        }
        if (!emailRegex.test(email)) {
            alert('Please provide a valid email');
            return;
        }
        if (!password) {
            alert('Please provide a 6 characters minimum password');
            return;
        }
        if (!username) {
            alert('Please provide a username');
            return;
        }
        changeBaseURL(ip);
        this.props.signUp(email, username, password).then(() => this.props.getUser());
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={styles.titleStyle}>Sign Up to Tribe</Text>
                <Input
                    label="IP ADDRESS"
                    placeholder="Enter the server ip"
                    autoCapitalize="none"
                    value={this.state.ip}
                    onChangeText={ip => this.setState({ ip })}
                    onSubmitEditing={() => this.emailRef.focus()}
                    blurOnSubmit={false}
                />
                <Input
                    label="EMAIL"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    onSubmitEditing={() => this.usernameRef.focus()}
                    ref={ref => (this.emailRef = ref)}
                    blurOnSubmit={false}
                />
                <Input
                    label="USERNAME"
                    placeholder="Enter your username"
                    autoCapitalize="none"
                    autoComplete="username"
                    value={this.state.username}
                    onChangeText={username => this.setState({ username })}
                    onSubmitEditing={() => this.passwordRef.focus()}
                    ref={ref => (this.usernameRef = ref)}
                    blurOnSubmit={false}
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
                    ref={ref => (this.passwordRef = ref)}
                />
                <Button
                    title="SIGN UP"
                    onPress={this.onSignUp}
                    containerStyle={styles.buttonStyle}
                    buttonStyle={{ backgroundColor: 'black' }}
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
    },
    buttonStyle: {
        marginHorizontal: 30,
        marginBottom: 30
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
    { signUp, getUser }
)(SignUpScreen);

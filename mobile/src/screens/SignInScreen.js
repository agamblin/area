/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-20 12:45:35
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-13 17:31:06
 */

//@flow

import React, { Component } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { material, systemWeights } from 'react-native-typography';
import { connect } from 'react-redux';

import { Input } from '@components';
import { signIn, linkProviders, getProjects, getUser } from '@actions';
import { changeBaseURL } from '@store';

type Props = NavigationScreenProps & {};

type State = {
    email: string,
    password: string,
    ip: string
};

class SignInScreen extends Component<Props, State> {
    emailRef: any;
    passwordRef: any;

    constructor(props: Props, state: State) {
        super(props);

        this.state = {
            email: '',
            password: '',
            ip: ''
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.currentUser && nextProps.currentUser.token) {
            this.props.navigation.navigate('Main', { ip: this.state.ip });
        } else if (!this.props.error && nextProps.error) {
            alert(nextProps.error);
        }
    }

    onSignIn: Function = () => {
        const { email, password, ip } = this.state;
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
        changeBaseURL(ip);
        this.props.signIn(email, password).then(() => {
            this.props.linkProviders();
            this.props.getProjects();
            this.props.getUser();
        });
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={styles.titleStyle}>Sign In to Tribe</Text>
                <Input
                    label="IP ADDRESS"
                    placeholder="Enter the server ip"
                    autoCapitalize="none"
                    value={this.state.ip}
                    onChangeText={ip => this.setState({ ip })}
                    onSubmitEditing={() => {
                        this.emailRef.focus();
                    }}
                />
                <Input
                    label="EMAIL"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    onSubmitEditing={() => this.passwordRef.focus()}
                    ref={ref => (this.emailRef = ref)}
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
                    ref={ref => (this.passwordRef = ref)}
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
    { signIn, linkProviders, getProjects, getUser }
)(SignInScreen);

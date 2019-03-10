/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-06 18:26:01
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 20:02:24
 */

//@flow

import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavigationScreenProps from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import { systemWeights, material } from 'react-native-typography';
import { connect } from 'react-redux';

import { remove } from '@utils';
import { linkProviders, logout } from '@actions';
import { Loading } from '@components';

type Props = NavigationScreenProps & {};

class ServicesScreen extends Component<Props> {
    _navListener: Function;

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => this.props.linkProviders());
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.currentUser) {
            this.props.currentUser = nextProps.currentUser;
        }
        if (nextProps.currentProviders) {
            this.props.currentProviders = nextProps.currentProviders;
        }
    }

    render() {
        const { googleToken, githubToken, trelloToken } = this.props.currentProviders;

        return (
            <SafeAreaView style={{ flex: 1, marginTop: 60, marginHorizontal: 15 }}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.titleStyle}>Services</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.linkProviders();
                            }}
                        >
                            <Icon
                                iconStyle={{ transform: [{ rotateZ: '-45deg' }], marginTop: -20 }}
                                type="material-community"
                                name="sync"
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.descriptionStyle}>
                        Connect to Google, Trello and Github to power-up your productivity !
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 50 }}>
                    <View>
                        <View
                            style={[styles.iconBox, { opacity: !!trelloToken ? 0.5 : 1, backgroundColor: '#006BA7' }]}
                        >
                            <Icon type="material-community" name="trello" color="white" />
                        </View>
                    </View>
                    <View>
                        <View
                            style={[styles.iconBox, { opacity: !!githubToken ? 0.5 : 1, backgroundColor: '#23292d' }]}
                        >
                            <Icon type="material-community" name="github-circle" color="white" />
                        </View>
                    </View>
                    <View>
                        <View
                            style={[styles.iconBox, { opacity: !!googleToken ? 0.5 : 1, backgroundColor: '#dd4b39' }]}
                        >
                            <Icon type="font-awesome" name="google" color="white" />
                        </View>
                    </View>
                </View>
                <Button
                    onPress={() => {
                        this.props.logout();
                        this.props.navigation.navigate('Auth');
                    }}
                />
                <Loading visible={this.props.isLoading} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    iconBox: {
        height: 80,
        width: 80,
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
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

const mapStateToProps = ({ user, providers }) => {
    const { currentUser, isLoading, error } = user;
    const { currentProviders } = providers;
    return {
        currentUser,
        isLoading,
        error,
        currentProviders
    };
};

export default connect(
    mapStateToProps,
    { linkProviders, logout }
)(ServicesScreen);

/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-06 18:26:01
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 04:15:33
 */

//@flow

import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, StyleSheet } from 'react-native';
import NavigationScreenProps from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import { systemWeights, material } from 'react-native-typography';
import { connect } from 'react-redux';

import { remove } from '@utils';
import { linkProviders, logout } from '@actions';

type Props = NavigationScreenProps & {};

class ServicesScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);

        this.props.linkProviders();
    }

    render() {
        console.log(this.props.currentUser);
        const { googleToken, githubToken, trelloToken } = this.props.currentUser;

        return (
            <SafeAreaView style={{ flex: 1, marginTop: 60, paddingHorizontal: 20 }}>
                <View>
                    <Text style={styles.titleStyle}>Services</Text>
                    <Text style={styles.descriptionStyle}>
                        Connect to Google, Trello and Github to power-up your productivity !
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 50 }}>
                    <View>
                        <View
                            style={[
                                styles.iconBox,
                                { opacity: trelloToken !== '' ? 0.5 : 1, backgroundColor: '#006BA7' }
                            ]}
                        >
                            <Icon type="material-community" name="trello" color="white" />
                        </View>
                    </View>
                    <View>
                        <View
                            style={[
                                styles.iconBox,
                                { opacity: githubToken !== '' ? 0.5 : 1, backgroundColor: '#23292d' }
                            ]}
                        >
                            <Icon type="material-community" name="github-circle" color="white" />
                        </View>
                    </View>
                    <View>
                        <View
                            style={[
                                styles.iconBox,
                                { opacity: googleToken !== '' ? 0.5 : 1, backgroundColor: '#dd4b39' }
                            ]}
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
    { linkProviders, logout }
)(ServicesScreen);

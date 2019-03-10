/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:50:42
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 20:03:11
 */

//@flow

import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { material, systemWeights } from 'react-native-typography';

import { getProjects } from '@actions';

type Props = NavigationScreenProps & {};

class HomeScreen extends Component<Props> {
    _navListener: Function;

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => this.props.getProjects());
    }

    componentWillUnmount() {
        this._navListener.remove();
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, marginTop: 60, paddingHorizontal: 20 }}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.titleStyle}>Projects</Text>
                        <TouchableOpacity onPress={() => this.props.getProjects()}>
                            <Icon
                                iconStyle={{ transform: [{ rotateZ: '-45deg' }], marginTop: -20 }}
                                type="material-community"
                                name="sync"
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
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

const mapStateToProps = ({ projects }) => {
    const { list, isLoading, error } = projects;
    return {
        projects: list,
        error,
        isLoading
    };
};

export default connect(
    mapStateToProps,
    { getProjects }
)(HomeScreen);

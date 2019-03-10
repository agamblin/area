/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:50:42
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 22:48:07
 */

//@flow

import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { material, systemWeights } from 'react-native-typography';
import { Button } from 'react-native-elements';

import { CardItem } from '@components';
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
            <SafeAreaView style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 60 : 30, paddingHorizontal: 20 }}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewProject')}>
                            <Icon iconStyle={{ marginTop: -20 }} type="material" name="add" size={40} />
                        </TouchableOpacity>
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
                <FlatList
                    data={this.props.projects}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardItem item={item} />}
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
    },
    buttonStyle: {
        alignSelf: 'center',
        color: 'black'
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

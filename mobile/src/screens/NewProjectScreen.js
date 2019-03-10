/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 21:37:32
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 23:01:00
 */

//@flow

import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import NavigationScreenProps from 'react-navigation';
import { connect } from 'react-redux';
import { material, systemWeights } from 'react-native-typography';

import { createProject } from '@actions';
import { Input } from '@components';

type State = {
    title: string,
    description: string
};

type Props = NavigationScreenProps & {};

class NewProjectScreen extends Component<Props, State> {
    descRef: any;

    constructor(props: Props, state: State) {
        super(props);

        this.state = {
            title: '',
            description: ''
        };
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescChange = this.onDescChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoading) {
            if (nextProps.error) {
                alert('Title must be at least 3 characters and description 20\nOr check your services');
            } else {
                this.props.navigation.goBack();
            }
        }
    }

    onTitleChange: Function = (title: string) => {
        this.setState({ title });
    };

    onDescChange: Function = (description: string) => {
        this.setState({ description });
    };

    create: Function = () => {
        this.props.createProject(this.state.title, this.state.description);
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 60 : 30, marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.titleStyle}>{'Create\na new Project'}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                    >
                        <Icon iconStyle={{ marginTop: -20 }} name="close" size={40} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Input
                        label="TITLE"
                        placeholder="Provide a title (min. 3 characters)"
                        value={this.state.title}
                        onChangeText={this.onTitleChange}
                        onSubmitEditing={() => this.descRef.focus()}
                    />
                    <Input
                        label="DESCRIPTION"
                        placeholder="Please provide a description (min. 20 characters)"
                        value={this.state.description}
                        onChangeText={this.onDescChange}
                        onSubmitEditing={this.create}
                        containerStyle={{ flexGrow: 1 }}
                        multiline
                        ref={ref => (this.descRef = ref)}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        ...material.display2Object,
        ...systemWeights.semibold,
        color: 'black'
    }
});

const mapStateToProps = ({ projects }) => {
    const { isLoading, error } = projects;

    return {
        isLoading,
        error
    };
};

export default connect(
    mapStateToProps,
    { createProject }
)(NewProjectScreen);

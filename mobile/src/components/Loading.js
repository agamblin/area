/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 15:01:14
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 15:05:43
 */

//@flow

import React, { Component } from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

type Props = {
    visible: boolean
};

type State = {
    visible: boolean
};

class Loading extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            visible: this.props.visible
        };

        this._renderSpinner = this._renderSpinner.bind(this);
    }

    static getDerivedStateFromProps(props: Props, state: State) {
        const newState = {};
        if (state.visible !== props.visible) newState.visible = props.visible;
        return newState;
    }

    _renderSpinner: Function = () => {
        if (!this.state.visible) return null;

        return (
            <Modal
                animationType="fade"
                transparent
                visible={this.state.visible}
                onRequestClose={() => this.setState({ visible: false })}
            >
                <View style={[styles.container, { backgroundColor: '#00000070' }]}>
                    <ActivityIndicator color={'black'} size={'large'} style={styles.activityIndicator} />
                </View>
            </Modal>
        );
    };

    render() {
        return this._renderSpinner();
    }
}

const transparent = 'transparent';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: transparent,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        elevation: 999
    },
    activityIndicator: {
        flex: 1
    }
});

export { Loading };

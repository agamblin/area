/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-20 12:48:50
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-02-20 15:25:12
 */

//@flow

import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { material, systemWeights } from 'react-native-typography';

type Props = {
    ...TextInput.prototype,
    label: string,
    containerStyle?: any
};

class Input extends Component<Props> {
    render() {
        return (
            <View style={[{ borderBottomWidth: 1, margin: 10 }, this.props.containerStyle]}>
                <Text style={styles.labelStyle}>{this.props.label}</Text>
                <TextInput {...this.props} underlineColorAndroid="transparent" style={{ paddingVertical: 5 }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    labelStyle: {
        ...material.subheadingObject,
        textAlign: 'left'
    }
});

export { Input };

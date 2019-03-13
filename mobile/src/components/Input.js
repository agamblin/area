/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-20 12:48:50
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-13 17:10:24
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
    inputRef: any;

    blur() {
        this.inputRef.blur();
    }

    focus() {
        this.inputRef.focus();
    }
    render() {
        return (
            <View style={[{ borderBottomWidth: 1, margin: 10 }, this.props.containerStyle]}>
                <Text style={styles.labelStyle}>{this.props.label}</Text>
                <TextInput
                    {...this.props}
                    underlineColorAndroid="transparent"
                    style={{ paddingVertical: 5 }}
                    ref={ref => (this.inputRef = ref)}
                />
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

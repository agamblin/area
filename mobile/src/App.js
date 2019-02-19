/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:20:33
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-02-19 15:13:03
 */

//@flow

import React, { Component } from 'react';

import AppNavigator from './navigation/AppNavigator';
type Props = {};

export default class App extends Component<Props> {
    render() {
        return <AppNavigator />;
    }
}

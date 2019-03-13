/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:20:33
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 23:53:06
 */

//@flow

import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import AppNavigator from './navigation/AppNavigator';
import { store, persistor } from './store';
import NavigationService from './navigation/NavigationService';

type Props = {};

export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
                    <AppNavigator
                        ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef);
                        }}
                    />
                </PersistGate>
            </Provider>
        );
    }
}

/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:25:52
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-02-19 15:24:44
 */

//@flow

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthenticationNavigator from './AuthenticationNavigator';
import MainNavigator from './MainNavigator';
import { LoadingScreen } from '@screens';

const RootStack = createSwitchNavigator(
    {
        Loading: LoadingScreen,
        App: MainNavigator,
        Auth: AuthenticationNavigator
    },
    {
        initialRouteName: 'Loading',
        headerMode: 'none'
    }
);

export default createAppContainer(RootStack);

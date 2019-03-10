/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:37:41
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-09 19:34:27
 */

//@flow

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { HomeScreen, ServicesScreen } from '@screens';

const MainStack = createBottomTabNavigator(
    {
        Services: ServicesScreen,
        Home: HomeScreen
    },
    {
        headerMode: 'none'
    }
);

export default createStackNavigator(
    {
        Main: MainStack
    },
    {
        headerMode: 'none'
    }
);

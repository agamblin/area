/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:37:41
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 17:40:50
 */

//@flow

import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { HomeScreen, ServicesScreen } from '@screens';

const MainStack = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: <Icon name="home" type="material-community" size={30} />
            }
        },
        Services: {
            screen: ServicesScreen,
            navigationOptions: {
                tabBarIcon: <Icon name="link" size={40} />
            }
        }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'grey'
        }
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

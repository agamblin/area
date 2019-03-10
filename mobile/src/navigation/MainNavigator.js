/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:37:41
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 21:11:51
 */

//@flow

import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { HomeScreen, ServicesScreen, ProfileScreen } from '@screens';

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
                tabBarIcon: <Icon name="link" size={30} />
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: <Icon name="person" type="ionicons" size={30} />
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

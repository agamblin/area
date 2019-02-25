/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:37:41
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-02-19 16:20:37
 */

//@flow

import { createStackNavigator } from 'react-navigation';

import { HomeScreen } from '@screens';

const MainStack = createStackNavigator(
    {
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

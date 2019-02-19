/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:29:38
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-02-19 14:34:46
 */

//@flow

import { createStackNavigator } from 'react-navigation';

import { SignInUpScreen } from '@screens';

const AuthStack = createStackNavigator({
    SignInUp: SignInUpScreen
});
export default createStackNavigator({
    Auth: {
        screen: AuthStack,
        navigationOptions: {
            header: null
        }
    }
});

/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 12:29:38
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-02-20 15:07:54
 */

//@flow

import { createStackNavigator } from 'react-navigation';

import { SignInUpScreen, SignInScreen, SignUpScreen } from '@screens';

const AuthStack = createStackNavigator(
    {
        SignInUp: SignInUpScreen,
        SignIn: SignInScreen,
        SignUp: SignUpScreen
    },
    {
        headerMode: 'none'
    }
);
export default createStackNavigator(
    {
        Auth: AuthStack
    },
    {
        headerMode: 'none'
    }
);

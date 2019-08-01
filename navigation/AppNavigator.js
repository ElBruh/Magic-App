import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const AuthStack = createStackNavigator({
  LogIn: LoginScreen, 
  SignUp: SignUpScreen
},{
  headerMode: "float",
  mode: "card",
  headerTransitionPreset: "fade-in-place",
} 
)

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthLoadingScreen,
  Main: MainTabNavigator,
  Auth: AuthStack,
},
{
  initialRouteName: 'AuthLoading',
}
));

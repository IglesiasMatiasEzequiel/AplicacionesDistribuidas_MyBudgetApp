import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../screens/LoginScreen';
import AppStack from './AppStack';

const Stack = createStackNavigator();

export default function LoginStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="App" component={AppStack}/>
    </Stack.Navigator>
  );
}
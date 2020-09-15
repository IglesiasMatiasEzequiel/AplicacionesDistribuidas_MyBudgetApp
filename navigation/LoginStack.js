import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import AppStack from "./AppStack";
import { Header } from '../components';

const Stack = createStackNavigator();

export default function LoginStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          header: () => <View />,
        }}
      />
      <Stack.Screen
        name="App"
        component={AppStack}
        options={{
          header: () => <View />,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          header: ({ navigation }) => (
            <Header title="Registro" navigation={navigation} back/>
          ),
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          header: ({ navigation }) => (
            <Header title="Olvidé mi contraseña" navigation={navigation} back/>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

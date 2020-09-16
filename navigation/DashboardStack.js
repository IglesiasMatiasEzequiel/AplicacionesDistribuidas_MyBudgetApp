import React from 'react';
import { DashboardScreen } from '../screens/index';
import { Header } from '../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function DashboardStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          header: ({ navigation }) => (
            <Header title="Home" navigation={navigation}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

import React from 'react';
import NuevoEgresoScreen from '../screens/NuevoEgresoScreen';
import { Header } from '../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function NuevoEgresoStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="NuevoEgreso"
          component={NuevoEgresoScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Nuevo Egreso" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
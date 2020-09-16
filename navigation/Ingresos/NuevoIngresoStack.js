import React from 'react';
import { NuevoIngresoScreen } from '../../screens/index';
import { Header } from '../../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function NuevoIngresoStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="NuevoIngreso"
          component={NuevoIngresoScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Nuevo Ingreso" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
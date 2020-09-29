import React from 'react';
import { EgresosScreen, BorrarEgresoScreen, NuevoEgresoScreen } from '../screens';
import { Header } from '../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function EgresosStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="Egresos"
          component={EgresosScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Egresos" scene={scene} navigation={navigation} />
            )
          }}
        />
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
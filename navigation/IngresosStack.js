import React from 'react';
import { IngresosScreen, NuevoIngresoScreen, BorrarIngresoScreen } from '../screens/index';
import { Header } from '../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function IngresosStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="Ingresos"
          component={IngresosScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Ingresos" scene={scene} navigation={navigation} />
            )
          }}
        />
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
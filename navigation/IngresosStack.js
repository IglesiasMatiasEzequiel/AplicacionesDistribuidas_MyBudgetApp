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
            header: ({ route, navigation }) => (
              <Header title="Ingresos" route={route} navigation={navigation} />
            )
          }}
        />
        <Stack.Screen
          name="NuevoIngreso"
          component={NuevoIngresoScreen}
          options={{
            header: ({ route, navigation }) => (
              <Header title="Nuevo Ingreso" route={route} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
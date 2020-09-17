import React from 'react';
import { CuentasBancariasScreen, NuevaTarjetaScreen, BorrarTarjetaScreen } from '../screens/index';
import { Header } from '../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function CuentasBancariasStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="CuentasBancarias"
          component={CuentasBancariasScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Cuentas" scene={scene} navigation={navigation} />
            )
          }}
        />
        <Stack.Screen
          name="NuevaTarjeta"
          component={NuevaTarjetaScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Nueva Cuenta" scene={scene} navigation={navigation} />
            )
          }}
        />
        <Stack.Screen
          name="BorrarTarjeta"
          component={BorrarTarjetaScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Borrar Cuenta" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
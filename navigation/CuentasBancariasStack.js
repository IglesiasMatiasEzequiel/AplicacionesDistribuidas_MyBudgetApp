import React from 'react';
import { CuentasBancariasScreen, NuevaCuentaScreen, AdministrarCuentaScreen } from '../screens/index';
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
              <Header title="Cuentas Bancarias" scene={scene} navigation={navigation} />
            )
          }}
        />
        <Stack.Screen
          name="NuevaCuenta"
          component={NuevaCuentaScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Nueva Cuenta" scene={scene} navigation={navigation} />
            )
          }}
        />
        <Stack.Screen
          name="AdministrarCuenta"
          component={AdministrarCuentaScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Administrar Cuenta" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
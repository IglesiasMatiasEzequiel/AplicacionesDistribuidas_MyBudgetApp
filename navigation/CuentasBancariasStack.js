import React from 'react';
import { CuentasBancariasScreen, NuevaCuentaScreen, EditarCuentaScreen, MovimientosCuentaScreen } from '../screens/index';
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
          name="EditarCuenta"
          component={EditarCuentaScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Editar Cuenta" scene={scene} navigation={navigation} />
            )
          }}
        />
        <Stack.Screen
          name="MovimientosCuenta"
          component={MovimientosCuentaScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Movimientos Cuenta" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
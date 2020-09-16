import React from 'react';
import { TarjetasScreen, NuevaTarjetaScreen, GastosTarjetaScreen, BorrarTarjetaScreen } from '../screens/index';
import { Header } from '../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function TarjetasStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="Tarjetas"
          component={TarjetasScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Tarjetas" scene={scene} navigation={navigation} />
            )
          }}
        />
        <Stack.Screen
          name="NuevaTarjeta"
          component={NuevaTarjetaScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Nueva Tarjeta" scene={scene} navigation={navigation} />
            )
          }}
        />
        <Stack.Screen
          name="GastosTarjeta"
          component={GastosTarjetaScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Gastos Tarjeta" scene={scene} navigation={navigation} />
            )
          }}
        />
        <Stack.Screen
          name="BorrarTarjeta"
          component={BorrarTarjetaScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Borrar Tarjeta" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
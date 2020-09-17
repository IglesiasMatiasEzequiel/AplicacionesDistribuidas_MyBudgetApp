import React from 'react';
import { PrestamosScreen, NuevoPrestamoScreen, BorrarPrestamoScreen } from '../screens/index';
import { Header } from '../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function PrestamosStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="Prestamos"
          component={PrestamosScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Prestamos" scene={scene} navigation={navigation} />
            )
          }}
        />
        <Stack.Screen
          name="NuevoPrestamo"
          component={NuevoPrestamoScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Nuevo Prestamo" scene={scene} navigation={navigation} />
            )
          }}
        />
        <Stack.Screen
          name="BorrarPrestamo"
          component={BorrarPrestamoScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Borrar Prestamo" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
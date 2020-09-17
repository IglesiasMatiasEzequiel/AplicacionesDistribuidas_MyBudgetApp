import React from 'react';
import { InversionesScreen, NuevaInversionScreen, BorrarInversionScreen } from '../screens/index';
import { Header } from '../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function InversionesStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="Inversiones"
          component={InversionesScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Inversiones" scene={scene} navigation={navigation} />
            )
          }}
        />
        <Stack.Screen
          name="NuevaInversion"
          component={NuevaInversionScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Nueva Inversion" scene={scene} navigation={navigation} />
            )
          }}
        />
        <Stack.Screen
          name="BorrarInversion"
          component={BorrarInversionScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Borrar Inversion" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
import React from 'react';
import { PresupuestosScreen, NuevoPresupuestoScreen } from '../screens/index';
import { Header } from '../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function PresupuestosStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="Presupuestos"
          component={PresupuestosScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Presupuestos" scene={scene} navigation={navigation} />
            )
          }}
        />
        <Stack.Screen
          name="NuevoPresupuesto"
          component={NuevoPresupuestoScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Nuevo Presupuesto" scene={scene} navigation={navigation} />
            )
          }}
        />        
      </Stack.Navigator>
    );
  }
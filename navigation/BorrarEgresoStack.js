import React from 'react';
import BorrarEgresoScreen from '../screens/BorrarEgresoScreen';
import { Header } from '../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function BorrarEgresoStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="BorrarEgreso"
          component={BorrarEgresoScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Borrar Egreso" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
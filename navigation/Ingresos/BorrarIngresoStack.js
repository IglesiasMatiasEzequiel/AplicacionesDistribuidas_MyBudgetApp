import React from 'react';
import { BorrarIngresoScreen } from '../../screens/index';
import { Header } from '../../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function BorrarIngresoStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="BorrarIngreso"
          component={BorrarIngresoScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Borrar Ingreso" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
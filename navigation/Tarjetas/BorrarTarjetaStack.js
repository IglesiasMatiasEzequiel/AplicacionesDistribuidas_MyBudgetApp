import React from 'react';
import { BorrarTarjetaScreen } from '../../screens/index';
import { Header } from '../../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function BorrarTarjetaStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
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
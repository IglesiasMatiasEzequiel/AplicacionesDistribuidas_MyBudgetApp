import React from 'react';
import { GastosTarjetaScreen } from '../../screens/index';
import { Header } from '../../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function GastosTarjetaStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="GastosTarjeta"
          component={GastosTarjetaScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Gastos Tarjeta" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
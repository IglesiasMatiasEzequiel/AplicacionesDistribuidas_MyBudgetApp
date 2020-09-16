import React from 'react';
import NuevaTarjetaScreen from '../screens/NuevaTarjetaScreen';
import { Header } from '../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function NuevaTarjetaStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="NuevaTarjeta"
          component={NuevaTarjetaScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="NuevaTarjeta" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
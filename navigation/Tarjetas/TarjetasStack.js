import React from 'react';
import { TarjetasScreen } from '../../screens/index';
import { Header } from '../../components';
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
      </Stack.Navigator>
    );
  }
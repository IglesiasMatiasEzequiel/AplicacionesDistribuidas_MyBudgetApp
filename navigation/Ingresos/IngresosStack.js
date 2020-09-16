import React from 'react';
import { IngresosScreen } from '../../screens/index';
import { Header } from '../../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function IngresosStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="Ingresos"
          component={IngresosScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Ingresos" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
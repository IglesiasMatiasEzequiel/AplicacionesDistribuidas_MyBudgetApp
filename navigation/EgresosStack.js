import React from 'react';
import EgresosScreen from '../screens/EgresosScreen';
import { Header } from '../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function EgresosStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="Egresos"
          component={EgresosScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Egresos" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
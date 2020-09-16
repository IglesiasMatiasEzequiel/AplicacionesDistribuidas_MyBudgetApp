import React from 'react';
import CuentasBancariasScreen from '../screens/CuentasBancariasScreen';
import { Header } from '../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function CuentasBancariasStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="CuentasBancarias"
          component={CuentasBancariasScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Cuentas" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
    );
  }
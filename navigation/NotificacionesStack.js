import React from 'react';
import { Header } from '../components';
import { NotificacionesScreen } from '../screens';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function NotificacionesStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="Notificaciones"
          component={NotificacionesScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Mis Notificaciones" scene={scene} navigation={navigation} hideNotificationsButton={true}/>
            )
          }}
        />
      </Stack.Navigator>
    );
  }
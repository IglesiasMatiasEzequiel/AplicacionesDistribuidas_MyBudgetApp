import React from 'react';
import { BackupScreen } from '../screens';
import { Header } from '../components';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function BackupStack(props) {
    return (
      <Stack.Navigator mode="card" headerMode="screen">
        <Stack.Screen
          name="Backup"
          component={BackupScreen}
          options={{
            header: ({ navigation, scene }) => (
              <Header title="Backup" scene={scene} navigation={navigation} />
            )
          }}
        />
      </Stack.Navigator>
      
    );
  }
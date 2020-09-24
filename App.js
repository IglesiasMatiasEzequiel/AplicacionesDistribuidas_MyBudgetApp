import React from "react";
import { Platform, StatusBar, Image } from "react-native";
import { Block, GalioProvider } from "galio-framework";

import { materialTheme } from "./constants/";

import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./navigation/LoginStack";

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

import { createTables, deleteTables } from './components/DataBase';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    //deleteTables();
    createTables();
  }

  render() {
    return (
      <NavigationContainer>
        <GalioProvider theme={materialTheme}>
          <Block flex>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <LoginStack />
          </Block>
        </GalioProvider>
      </NavigationContainer>
    );
  }
}

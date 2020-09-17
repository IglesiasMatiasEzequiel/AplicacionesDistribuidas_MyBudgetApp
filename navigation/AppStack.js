import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";

import { LoginScreen } from '../screens/index';
import 
{ 
  Menu, 
  DashboardStack, 
  IngresosStack, 
  EgresosStack,
  TarjetasStack,
  InversionesStack,
  PrestamosStack,
  CuentasBancariasStack
}
from '../navigation/index';

const { width } = Dimensions.get("screen");

const Drawer = createDrawerNavigator();

export default function AppStack(props) {
  
  const { profile } = props.route.params;

  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => (
        <Menu {...props} profile={profile} />
      )}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      initialRouteName="Dashboard"
    >
      <Drawer.Screen name="Dashboard" component={DashboardStack} />
      <Drawer.Screen name="Ingresos" component={IngresosStack} />
      <Drawer.Screen name="Egresos" component={EgresosStack} />
      <Drawer.Screen name="Tarjetas" component={TarjetasStack} />
      <Drawer.Screen name="Inversiones" component={InversionesStack} />
      <Drawer.Screen name="Prestamos" component={PrestamosStack} />
      <Drawer.Screen name="CuentasBancarias" component={CuentasBancariasStack}/>
      <Drawer.Screen name="Cerrar Sesión" component={LoginScreen}/>
      
    </Drawer.Navigator>
  );
}

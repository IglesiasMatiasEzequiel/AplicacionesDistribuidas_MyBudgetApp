import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Block, Text, theme } from "galio-framework";

import MenuIcon from "./MenuIcon";
import materialTheme from "../constants/Theme";

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: materialTheme.COLORS.ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  }
});

export default function MenuItem({ navigation, title, focused }) {
  renderIcon = () => {

    switch (title) {
      case "Home":
        return <MenuIcon name="md-home" focused={focused} />;
      case "Ingresos":
        return <MenuIcon name="md-arrow-round-forward" focused={focused} />;
      case "Egresos":
        return <MenuIcon name="md-arrow-round-back" focused={focused} />;
      case "Tarjetas":
        return <MenuIcon name="md-card" focused={focused} />;
      case "CuentasBancarias":
        return <MenuIcon name="md-briefcase" focused={focused} />;
      case "Inversiones":
        return <MenuIcon name="md-trending-up" focused={focused} />;
      case "Prestamos":
        return <MenuIcon name="md-contacts" focused={focused} />;
      case "Presupuesto":
        return <MenuIcon name="md-today" focused={focused} />;
      case "Cerrar Sesión":
        return <MenuIcon name="md-log-out" focused={focused} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={{ height: 55 }}
      onPress={() => {
        navigation.navigate(title);
      }}
    >
      <Block
        flex
        row
        style={[
          styles.defaultStyle,
          focused ? [styles.activeStyle, styles.shadow] : null,
        ]}
      >
        <Block middle flex={0.1} style={{ marginRight: 28 }}>
          {renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text size={18} color={focused ? "white" : "black"}>
            {title}
          </Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
}

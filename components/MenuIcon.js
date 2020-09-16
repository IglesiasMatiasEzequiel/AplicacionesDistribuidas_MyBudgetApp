import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import materialTheme from "../constants/Theme";

export default function MenuIcon({ name, focused }) {
  return (
    <Icon
      size={16}
      name={name}
      color={focused ? "white" : materialTheme.COLORS.MUTED}
    />
  );
}

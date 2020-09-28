import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

export default function CustomIcon({ name, size }) {
  return (
    <Icon
      size={size}
      name={name}
      color="white"
    />
  );
}

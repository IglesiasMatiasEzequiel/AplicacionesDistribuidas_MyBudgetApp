import React from "react";
import { Text, View } from "react-native";
import { alertStyles } from "./Styles";

export default function Alert({
  type,
  message
}) {

  return (
    <View style={[alertStyles.alertContainer, 
        type === "success" ? alertStyles.alertContainerSuccess 
        : type === "warning" ? alertStyles.alertContainerWarning 
        : type === "danger" ? alertStyles.alertContainerDanger
        : type === "info" ? alertStyles.alertContainerInfo 
        : {}]}>
      <Text style={[
        type === "success" ? alertStyles.alertTextSuccess 
        : type === "warning" ? alertStyles.alertTextWarning 
        : type === "danger" ? alertStyles.alertTextDanger
        : type === "info" ? alertStyles.alertTextInfo 
        : {}]}>{message}</Text>
    </View>
  );
}

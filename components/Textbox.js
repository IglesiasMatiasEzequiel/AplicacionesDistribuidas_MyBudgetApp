import React from "react";
import { TextInput, Text, View } from "react-native";
import { theme } from "galio-framework";
import { textboxStyles } from "./Styles";

export default function Textbox({
  placeholder,
  handleChange,
  value,
  isValid,
  validationMessage,
  isPassword
}) {

  isValid = isValid != null && isValid != undefined ? isValid : true;
  isPassword = isPassword != null && isPassword != undefined ? isPassword : false;

  return (
    <View style={isValid ? { marginBottom: 15 } : {}}>
      <View
        style={[
          textboxStyles.textboxContainer,
          !isValid ? textboxStyles.textboxContainerError : {},
        ]}
      >
        <TextInput
          style={textboxStyles.textbox}
          placeholder={placeholder}
          placeholderTextColor={ isValid ? theme.COLORS.PLACEHOLDER : "red" }
          onChangeText={(text) => handleChange(text)}
          value={value}
          secureTextEntry={isPassword}
        />
      </View>
      {!isValid && <Text style={textboxStyles.validationText}>{validationMessage ?? "El campo no es válido..."}</Text>}
    </View>
  );
}

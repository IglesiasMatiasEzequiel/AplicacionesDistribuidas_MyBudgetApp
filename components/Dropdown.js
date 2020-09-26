import React from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { dropdownStyles, textboxStyles } from "./Styles";

export default function Dropdown({
  propName,
  items,
  defaultValue,
  placeholder,
  handleChange,
  isValid,
  validationMessage
}) {

  isValid = isValid != null && isValid != undefined ? isValid : true;

  return (
    <View style={isValid ? { marginBottom: 15 } : {}}>
      <DropDownPicker
          items={items}
          defaultValue={defaultValue}
          placeholder={placeholder}
          containerStyle={dropdownStyles.dropdownContainer}
          style={[dropdownStyles.dropdown, !isValid ? dropdownStyles.dropdownError: {}]}
          placeholderStyle={!isValid ? dropdownStyles.dropdownLabelError : {}}
          itemStyle={dropdownStyles.dropdownItem}
          onChangeItem={(item) => handleChange(propName, item.value)}
        />
    {!isValid && <Text style={textboxStyles.validationText}>{validationMessage ?? "El campo no es válido..."}</Text>}
    </View>
  );
}

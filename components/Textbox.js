import React from "react";
import { TextInput, Text, View, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from "galio-framework";
import { textboxStyles } from "./Styles";
import { formatDateToString, formatStringToDate } from "../components/Formatters";
import { isNullOrEmpty } from "../components/Validations";

export default function Textbox({
  propName,
  placeholder,
  handleChange,
  value,
  isValid,
  validationMessage,
  isPassword,
  isDate,
  keyboardType
}) {

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  isValid = isValid != null && isValid != undefined ? isValid : true;
  isPassword = isPassword != null && isPassword != undefined ? isPassword : false;
  isDate = isDate != null && isDate != undefined ? isDate : false;

  keyboardType = keyboardType != null && keyboardType != undefined ? keyboardType : 'default';

  handleChangeDatePicker = (event, selectedDate) => { 
    setShowDatePicker(Platform.OS === 'ios');
    handleChange(propName, formatDateToString(selectedDate));
  }
  
  return (
    <View style={isValid ? { marginBottom: 15 } : {}}>
      <View
        style={[
          textboxStyles.textboxContainer,
          !isValid ? textboxStyles.textboxContainerError : {},
        ]}
      >
        {!isDate && (
          <TextInput
            style={textboxStyles.textbox}
            placeholder={placeholder}
            placeholderTextColor={isValid ? theme.COLORS.PLACEHOLDER : "red"}
            onChangeText={(text) => handleChange(propName, text)}
            value={value}
            secureTextEntry={isPassword}
            keyboardType={keyboardType}
          />
        )}

        {isDate && (
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={textboxStyles.textbox}
              placeholder={placeholder}
              placeholderTextColor={isValid ? theme.COLORS.PLACEHOLDER : "red"}
              onChangeText={(text) => handleChange(propName, text)}
              value={value}
              secureTextEntry={isPassword}
              editable={false}
            />
          </TouchableOpacity>
        )}

        {isDate && showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={
              !isNullOrEmpty(value)
                ? formatStringToDate(value)
                : new Date()
            }
            mode="date"
            display="default"
            onChange={(event, selectedDate) =>
              handleChangeDatePicker(propName, selectedDate)
            }
          />
        )}

      </View>
      {!isValid && (
        <Text style={textboxStyles.validationText}>
          {validationMessage ?? "El campo no es válido..."}
        </Text>
      )}
    </View>
  );
}

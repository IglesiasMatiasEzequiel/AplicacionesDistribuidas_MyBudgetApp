import React from "react";
import { TextInput, Text, View, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from "galio-framework";
import { textboxStyles } from "./Styles";
import { formatDateToString, formatStringToDate } from "./Formatters";
import { isNullOrEmpty } from "./Validations";

export default function TextboxDate({
  propName,
  placeholder,
  handleChange,
  value,
  isValid,
  validationMessage
}) {

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  isValid = isValid != null && isValid != undefined ? isValid : true;

  const handleChangeDatePicker = (event, selectedDate) => { 
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

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={textboxStyles.textbox}
            placeholder={placeholder}
            placeholderTextColor={isValid ? theme.COLORS.PLACEHOLDER : "red"}
            onChangeText={(text) => handleChange(propName, text)}
            value={value}
            editable={false}
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
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

import React from "react";
import { View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Text, theme } from "galio-framework";
import DropDownPicker from "react-native-dropdown-picker";
import { screenStyles, buttonStyles, textboxStyles, dropdownStyles } from '../../components/Styles';

export default function NuevoEgresoScren({ navigation }) {

  const [fecha, setFecha] = React.useState("");
  const [monto, setMonto] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [tipoIngreso, setTipoIngreso] = React.useState("");
  const [destino, setDestino] = React.useState("");

  const handleChangeFecha = (fecha) => setFecha(fecha);
  const handleChangeMonto = (monto) => setMonto(monto);
  const handleChangeDescripcion = (descripcion) => setDescripcion(descripcion);

  const onConfirmar = () => navigation.navigate("Ingresos");
  const onBack = () => navigation.navigate("Ingresos");

  const destinos = [
    { label: "Cuenta Bancaria", value: "1" },
    { label: "Efectivo", value: "2" },
  ];

  const tiposIngreso = [
    { label: "Periódico", value: "1" },
    { label: "Alquiler", value: "2" },
    { label: "Sueldo", value: "3" },
    { label: "Facturación", value: "4" },
    { label: "Extraordinario", value: "5" },
  ];

  return (
    <ScrollView style={screenStyles.screen}>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Fecha..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(fecha) => handleChangeFecha(fecha)}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Monto..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(monto) => handleChangeMonto(monto)}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Descripción ..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(descripcion) => handleChangeDescripcion(descripcion)}
        />
      </View>
      <View>
        <DropDownPicker
          items={tiposIngreso}
          defaultValue={tipoIngreso}
          placeholder="Seleccione un destino."
          containerStyle={dropdownStyles.dropdownContainer}
          style={dropdownStyles.dropdown}
          itemStyle={{ justifyContent: "flex-start" }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setTipoIngreso(item.value)}
        />
      </View>
      <View>
        <DropDownPicker
          items={destinos}
          defaultValue={destino}
          placeholder="Seleccione un destino."
          containerStyle={dropdownStyles.dropdownContainer}
          style={dropdownStyles.dropdown}
          itemStyle={{ justifyContent: "flex-start" }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setDestino(item.value)}
        />
      </View>

      <TouchableOpacity onPress={onConfirmar} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={buttonStyles.btnBack}>
        <Text style={buttonStyles.btnBackText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

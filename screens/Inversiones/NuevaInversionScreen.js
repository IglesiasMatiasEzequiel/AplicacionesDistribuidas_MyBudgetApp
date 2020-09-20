import React from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";

import { Text, theme } from "galio-framework";
import DropDownPicker from "react-native-dropdown-picker";
import { CustomSpinner, CustomModal } from "../../components";
import { tipoInversionData } from "../../components/Data";
import {
  screenStyles,
  buttonStyles,
  textboxStyles,
  dropdownStyles,
} from "../../components/Styles";

export default function NuevaInversionScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [tipo, setTipo] = React.useState(null);
  const [monto, setMonto] = React.useState("");
  const [origen, setOrigen] = React.useState("");
  const [fechaInicio, setFechaInicio] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [duracion, setDuracion] = React.useState("");

  const handleChangeTipo= (tipo) => setTipo(tipo);
  const handleChangeMonto = (monto) => setDinero(monto);
  const handleChangeOrigen = (origen) => setDinero(origen);
  const handleChangeFechaInicio = (fechaInicio) => setFechaInicio(fechaInicio);
  const handleChangeNombre = (nombre) => setNombre(nombre);
  const handleChangeDuracion = (duracion) => setDuracion(duracion);

  const limpiarState = () => {
    setIsLoading(false);
    setModalData({ ...modalData, isVisible: false });
    setTipo(null);
    setMonto("");
    setOrigen("");
    setFechaInicio("");
    setNombre("");
    setDuracion("");
  };

  const onConfirmar = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setModalData({
        message: "La inversion se guardó correctamente.",
        isVisible: true,
        isSuccess: true,
        successBtnText: "Aceptar",
      });
    }, 500);
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("Inversiones");
  };

  return (
    <ScrollView style={screenStyles.screen}>
      <View>
        <DropDownPicker
          items={tipoInversionData}
          defaultValue={tipo}
          placeholder="Seleccione un tipo de inversion."
          containerStyle={dropdownStyles.dropdownContainer}
          style={dropdownStyles.dropdown}
          itemStyle={dropdownStyles.dropdownItem}
          onChangeItem={(item) => handleChangeTipo(item.value)}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Monto..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(monto) => handleChangeMonto(monto)}
          value={monto}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Origen..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(origen) => handleChangeOrigen(origen)}
          value={origen}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Fecha de Inicio..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(fechaInicio) => handleChangeFechaInicio(fechaInicio)}
          value={fechaInicio}
        />
      </View>

      {tipo === "1" && (
        <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Nombre de la accion..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(nombre) => handleChangeNombre(nombre)}
          value={nombre}
        />  
        </View>
      )}
      {tipo === "2" && (
        <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Nombre del Plazo fijo..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(nombre) => handleChangeNombre(nombre)}
          value={nombre}
        />  
        </View>
      )}
      {tipo === "3" && (
        <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Nombre del Fondo Comun..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(nombre) => handleChangeNombre(nombre)}
          value={nombre}
        />  
        </View>
      )}
      {tipo === "4" && (
        <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Nombre del Bono..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(nombre) => handleChangeNombre(nombre)}
          value={nombre}
        />  
        </View>
      )}

      {tipo === "2" && (
        <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Duracion (30 a 365 dias)..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(duracion) => handleChangeDuracion(duracion)}
          value={duracion}
        />
        </View>
      )}
      

      <TouchableOpacity onPress={onConfirmar} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={buttonStyles.btnBack}>
        <Text style={buttonStyles.btnBackText}>Volver</Text>
      </TouchableOpacity>

      <CustomSpinner isLoading={isLoading} text={"Guardando Prestamo..."} />

      <CustomModal
        isSuccess={modalData?.isSuccess}
        title={modalData?.title}
        message={modalData?.message}
        isVisible={modalData?.isVisible}
        successBtnText={modalData?.successBtnText}
        handleBtnOnSuccess={onBack}
      />
    </ScrollView>
  );
}

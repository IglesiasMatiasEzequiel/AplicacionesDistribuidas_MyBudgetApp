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
  const [dinero, setDinero] = React.useState("");
  const [fechaInicio, setFechaInicio] = React.useState("");
  const [nombreAcccion, setNombreAcccion] = React.useState("");
  const [duracion, setDuracion] = React.useState("");

  const handleChangeTipo= (tipo) => setTipo(tipo);
  const handleChangeDinero = (dinero) => setDinero(dinero);
  const handleChangeFechaInicio = (fechaInicio) => setFechaInicio(fechaInicio);
  const handleChangeNombreAcccion = (nombreAcccion) => setCierreResumen(nombreAcccion);
  const handleChangeDuracion = (duracion) => setDuracion(duracion);

  const limpiarState = () => {
    setIsLoading(false);
    setModalData({ ...modalData, isVisible: false });
    setTipo(null);
    setDinero("");
    setFechaInicio("");
    setNombreAcccion("");
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
          placeholder="Dinero..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(dinero) => handleChangeDinero(dinero)}
          value={dinero}
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
          onChangeText={(nombreAcccion) => handleChangeNombreAcccion(nombreAcccion)}
          value={nombreAcccion}
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

      <CustomSpinner isLoading={isLoading} text={"Guardando Tarjeta..."} />

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

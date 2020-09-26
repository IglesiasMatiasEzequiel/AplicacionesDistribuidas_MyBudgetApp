import React from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";

import { Text, theme } from "galio-framework";
import DropDownPicker from "react-native-dropdown-picker";
import { CustomSpinner, CustomModal, Textbox } from "../../components";
import { tipoPrestamoData } from "../../components/Data";
import {
  screenStyles,
  buttonStyles,
  textboxStyles,
  dropdownStyles,
} from "../../components/Styles";

import { PrestamosQueries } from "../../database";
import { getUser} from '../../components/Session';

export default function NuevoPrestamoScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [tipo, setTipo] = React.useState(null);
  const [emisorDestinatario, setEmisorDestinatario] = React.useState("");
  const [monto, setMonto] = React.useState("");
  const [intereses, setIntereses] = React.useState("");
  const [vencimiento, setVencimiento] = React.useState("");

  const handleChangeTipo= (tipo) => setTipo(tipo);
  const handleChangeEmisorDestinatario = (emisorDestinatario) => setEmisorDestinatario(emisorDestinatario);
  const handleChangeMonto = (monto) => setMonto(monto);
  const handleChangeIntereses = (intereses) => setIntereses(intereses);
  const handleChangeVencimiento = (vencimiento) => setIntereses(vencimiento);

  const limpiarState = () => {
    setIsLoading(false);
    setModalData({ ...modalData, isVisible: false });
    setTipo(null);
    setEmisorDestinatario("");
    setMonto("");
    setIntereses("");
    setVencimiento("");
  };

  const onConfirmar = async () => {
    setIsLoading(true);
    const idUsuario = getUser().id;
    const Usuario = getUser();
    console.log(Usuario);
    // PrestamosQueries._insert(idUsuario, tipo, tipoPersona, monto, intereses, () => {
    //   setIsLoading(false);
    //   setModalData({
    //     message: "El prestamo se guardó correctamente.",
    //     isVisible: true,
    //     isSuccess: true,
    //     successBtnText: "Aceptar",
    //   });
    // }, () => {
    //   setIsLoading(false);
    //   console.log('Error creando presupuesto...')
    // });
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("Prestamos");
  };

  return (
    <ScrollView style={screenStyles.screen}>
      <View>
        <DropDownPicker
          items={tipoPrestamoData}
          defaultValue={tipo}
          placeholder="Seleccione un tipo de prestamo."
          containerStyle={dropdownStyles.dropdownContainer}
          style={dropdownStyles.dropdown}
          itemStyle={dropdownStyles.dropdownItem}
          onChangeItem={(item) => handleChangeTipo(item.value)}
        />
      </View>
      
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Emisor/Destinario..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(emisorDestinatario) => handleChangeEmisorDestinatario(emisorDestinatario)}
          value={emisorDestinatario}
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
        placeholder="Intereses..."
        placeholderTextColor={theme.COLORS.PLACEHOLDER}
        onChangeText={(Intereses) => handleChangeIntereses(Intereses)}
        value={intereses}
      />  
      </View>
      
      {tipo === "2" && (
        <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Fecha de Vencimiento..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(v) => handleChangeDuracion(vencimiento)}
          value={vencimiento}
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

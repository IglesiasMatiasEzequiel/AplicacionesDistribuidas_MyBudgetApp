import React from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";

import { Text, theme } from "galio-framework";
import DropDownPicker from "react-native-dropdown-picker";
import { Textbox,CustomSpinner, CustomModal } from "../../components";
import { categoriasEgresoData } from "../../components/Data";
import {
  screenStyles,
  buttonStyles,
  textboxStyles,
  dropdownStyles,
} from "../../components/Styles";

import { insertPresupuesto } from '../../components/DataBase';
import { getUser} from '../../components/Session';

export default function NuevoPresupuestoScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [tipo, setTipo] = React.useState(null);
  const [monto, setMonto] = React.useState("");
  const [fechaInicio, setFechaInicio] = React.useState("");

  const handleChangeTipo= (tipo) => setTipo(tipo);
  const handleChangeMonto = (monto) => setMonto(monto);
  const handleChangeFechaInicio = (fechaInicio) => setFechaInicio(fechaInicio);

  const limpiarState = () => {
    setIsLoading(false);
    setModalData({ ...modalData, isVisible: false });
    setTipo(null);
    setMonto("");
    setFechaInicio("");
  };

  const onConfirmar = async () => {
    setIsLoading(true);
    const idUsuario = 1;
    //console.log(idUsuario);
    insertPresupuesto(idUsuario, tipo, monto, fechaInicio, () => { 
      setIsLoading(false);
      setModalData({ 
        message: "El presupuesto se guardó correctamente.",
        isVisible: true,
        isSuccess: true,
        successBtnText: "Aceptar",
      });
    }, () => { 
      setIsLoading(false);
      console.log('Error creando presupuesto...')
    });
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("Presupuestos");
  };

  return (
    <ScrollView style={screenStyles.screen}>
      <View>
        <DropDownPicker
          items={categoriasEgresoData}
          defaultValue={tipo}
          placeholder="Seleccione un tipo de presupuestos."
          containerStyle={dropdownStyles.dropdownContainer}
          style={dropdownStyles.dropdown}
          itemStyle={dropdownStyles.dropdownItem}
          onChangeItem={(item) => handleChangeTipo(item.value)}
        />
      </View>
       <Textbox
          placeholder="Dinero..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          handleChange={handleChangeMonto}
          value={monto}
        />
       <Textbox
          placeholder="Fecha de Inicio..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          handleChange={handleChangeFechaInicio}
          value={fechaInicio}
        />   

      <TouchableOpacity onPress={onConfirmar} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={buttonStyles.btnBack}>
        <Text style={buttonStyles.btnBackText}>Volver</Text>
      </TouchableOpacity>

      <CustomSpinner isLoading={isLoading} text={"Guardando Presupuesto..."} />

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
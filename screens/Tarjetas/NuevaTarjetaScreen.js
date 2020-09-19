import React from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";

import { Text, theme } from "galio-framework";
import DropDownPicker from "react-native-dropdown-picker";
import { CustomSpinner, CustomModal } from "../../components";
import { bancosData, entidadesEmisorasData } from "../../components/Data";
import {
  screenStyles,
  buttonStyles,
  textboxStyles,
  dropdownStyles,
} from "../../components/Styles";

export default function NuevaTarjetaScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [banco, setBanco] = React.useState(null);
  const [entidadEmisora, setEntidadEmisora] = React.useState(null);
  const [tarjeta, setTarjeta] = React.useState("");
  const [vencimiento, setVencimiento] = React.useState("");
  const [cierreResumen, setCierreResumen] = React.useState("");
  const [vencimientoResumen, setVencimientoResumen] = React.useState("");

  const handleChangeBanco = (banco) => setBanco(banco);
  const handleChangeEntidadEmisora = (entidadEmisora) => setEntidadEmisora(entidadEmisora);
  const handleChangeTarjeta = (tarjeta) => setTarjeta(tarjeta);
  const handleChangeVencimiento = (vencimiento) => setVencimiento(vencimiento);
  const handleChangeCierreResumen = (cierreResumen) =>
    setCierreResumen(cierreResumem);
  const handleChangeVencimientoResumen = (vencimientoResumen) =>
    setVencimientoResumen(vencimientoResumem);

  const limpiarState = () => {
    setIsLoading(false);
    setModalData({ ...modalData, isVisible: false });
    setBanco(null);
    setEntidadEmisora(null);
    setTarjeta("");
    setVencimiento("");
    setCierreResumen("");
    setVencimientoResumen("");
  };

  const onConfirmar = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setModalData({
        message: "La tarjeta se guardó correctamente.",
        isVisible: true,
        isSuccess: true,
        successBtnText: "Aceptar",
      });
    }, 500);
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("Tarjetas");
  };

  return (
    <ScrollView style={screenStyles.screen}>
      <View>
        <DropDownPicker
          items={bancosData}
          defaultValue={banco}
          placeholder="Seleccione un banco."
          containerStyle={dropdownStyles.dropdownContainer}
          style={dropdownStyles.dropdown}
          itemStyle={dropdownStyles.dropdownItem}
          onChangeItem={(item) => handleChangeBanco(item.value)}
        />
      </View>
      <View>
        <DropDownPicker
          items={entidadesEmisorasData}
          defaultValue={entidadEmisora}
          placeholder="Seleccione una entidad emisora."
          containerStyle={dropdownStyles.dropdownContainer}
          style={dropdownStyles.dropdown}
          itemStyle={dropdownStyles.dropdownItem}
          onChangeItem={(item) => handleChangeEntidadEmisora(item.value)}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Número tarjeta..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(tarjeta) => handleChangeTarjeta(tarjeta)}
          value={tarjeta}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Fecha de Vencimiento..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(vencimiento) => handleChangeVencimiento(vencimiento)}
          value={vencimiento}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="F. Cierre del Resúmen..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(cierreResumen) =>
            handleChangeCierreResumen(cierreResumen)
          }
          value={cierreResumen}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="F. Vencimiento del Resúmen..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(vencimientoResumen) =>
            handleChangeVencimientoResumen(vencimientoResumen)
          }
          value={vencimientoResumen}
        />
      </View>

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

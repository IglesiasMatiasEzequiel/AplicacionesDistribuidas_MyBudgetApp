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
  titleStyles,
} from "../../components/Styles";

export default function NuevaCuentaScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [numeroCuenta, setNumeroCuenta] = React.useState("");
  const [cbu, setCbu] = React.useState("");
  const [alias, setAlias] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [monto, setMonto] = React.useState("");
  const [banco, setBanco] = React.useState(null);
  const [entidadEmisora, setEntidadEmisora] = React.useState(null);
  const [tarjeta, setTarjeta] = React.useState("");
  const [vencimiento, setVencimiento] = React.useState("");

  const handleChangeNumeroCuenta = (numeroCuenta) => setNumeroCuenta(numeroCuenta);
  const handleChangeCbu = (cbu) => setCbu(cbu);
  const handleChangeAlias = (alias) => setAlias(alias);
  const handleChangeDescripcion = (descripcion) => setDescripcion(descripcion);
  const handleChangeMonto = (monto) => setMonto(monto);
  const handleChangeBanco = (banco) => setBanco(banco);
  const handleChangeEntidadEmisora = (entidadEmisora) => setEntidadEmisora(entidadEmisora);
  const handleChangeTarjeta = (tarjeta) => setTarjeta(tarjeta);
  const handleChangeVencimiento = (vencimiento) => setVencimiento(vencimiento);

  const limpiarState = () => {
    setIsLoading(false);
    setModalData({ ...modalData, isVisible: false });
    setNumeroCuenta("");
    setCbu("");
    setAlias("");
    setDescripcion("");
    setMonto("");
    setBanco(null);
    setEntidadEmisora(null);
    setTarjeta("");
    setVencimiento("");
  };

  const onConfirmar = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setModalData({
        message: "La cuenta se guardó correctamente.",
        isVisible: true,
        isSuccess: true,
        successBtnText: "Aceptar",
      });
    }, 500);
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("CuentasBancarias");
  };

  return (
    <ScrollView style={screenStyles.screen}>
      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Cuenta
        </Text>
      </View>

      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Número cuenta..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(numeroCuenta) =>
            handleChangeNumeroCuenta(numeroCuenta)
          }
          value={numeroCuenta}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="CBU..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(cbu) => handleChangeCbu(cbu)}
          value={cbu}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Alias..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(alias) => handleChangeAlias(alias)}
          value={alias}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Descripción..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(descripcion) => handleChangeDescripcion(descripcion)}
          value={descripcion}
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

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Tarjeta de débito
        </Text>
      </View>

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

      <TouchableOpacity onPress={onConfirmar} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={buttonStyles.btnBack}>
        <Text style={buttonStyles.btnBackText}>Volver</Text>
      </TouchableOpacity>

      <CustomSpinner isLoading={isLoading} text={"Guardando Cuenta..."} />

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

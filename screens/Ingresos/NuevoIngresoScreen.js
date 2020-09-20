import React from "react";
import { View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Text, theme } from "galio-framework";
import DropDownPicker from "react-native-dropdown-picker";
import { CustomSpinner, CustomModal } from "../../components";
import {
  titleStyles,
  screenStyles,
  buttonStyles,
  textboxStyles,
  dropdownStyles,
} from "../../components/Styles";
import {
  destinosData,
  tiposIngresoData,
  categoriasIngresoData,
  cuentasData
} from "../../components/Data";

export default function NuevoIngresoScren({ navigation }) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [fecha, setFecha] = React.useState("");
  const [monto, setMonto] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [tipoIngreso, setTipoIngreso] = React.useState(null);
  const [categoriaIngreso, setCategoriaIngreso] = React.useState(null);
  const [destino, setDestino] = React.useState(null);
  const [cuenta, setCuenta] = React.useState(null);

  const handleChangeFecha = (fecha) => setFecha(fecha);
  const handleChangeMonto = (monto) => setMonto(monto);
  const handleChangeDescripcion = (descripcion) => setDescripcion(descripcion);
  const handleChangeTipoIngreso = (tipoIngreso) => {
    setTipoIngreso(tipoIngreso);
    setCategoriaIngreso(null);
  };
  const handleChangeCategoriaIngreso = (categoriaIngreso) =>
    setCategoriaIngreso(categoriaIngreso);
  const handleChangeDestino = (destino) => { 
    setDestino(destino);
    setCuenta(null);
  }
  const handleChangeCuenta = (cuenta) => setCuenta(cuenta);

  const limpiarState = () => {
    setIsLoading(false);
    setModalData({...modalData, isVisible: false});
    setFecha("");
    setMonto("");
    setDescripcion("");
    setTipoIngreso(null);
    setCategoriaIngreso(null);
    setDestino(null);
    setCuenta(null);
  };

  const onConfirmar = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setModalData({
        message: "El ingreso se guardó correctamente.",
        isVisible: true,
        isSuccess: true,
        successBtnText: "Aceptar",
      });
    }, 500);
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("Ingresos");
  };

  return (
    <ScrollView style={screenStyles.screen}>

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Ingreso
        </Text>
      </View>

      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Fecha..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(fecha) => handleChangeFecha(fecha)}
          value={fecha}
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
          placeholder="Descripción ..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(descripcion) => handleChangeDescripcion(descripcion)}
          value={descripcion}
        />
      </View>
      <View>
        <DropDownPicker
          items={tiposIngresoData}
          defaultValue={tipoIngreso}
          placeholder="Seleccione un tipo de ingreso."
          containerStyle={dropdownStyles.dropdownContainer}
          style={dropdownStyles.dropdown}
          itemStyle={dropdownStyles.dropdownItem}
          onChangeItem={(item) => handleChangeTipoIngreso(item.value)}
        />
      </View>
      {tipoIngreso === "1" && (
        <View>
          <DropDownPicker
            items={categoriasIngresoData}
            defaultValue={categoriaIngreso}
            placeholder="Seleccione una categoria."
            containerStyle={dropdownStyles.dropdownContainer}
            style={dropdownStyles.dropdown}
            itemStyle={dropdownStyles.dropdownItem}
            onChangeItem={(item) => handleChangeCategoriaIngreso(item.value)}
          />
        </View>
      )}

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Destino
        </Text>
      </View>

      <View>
        <DropDownPicker
          items={destinosData}
          defaultValue={destino}
          placeholder="Seleccione un destino."
          containerStyle={dropdownStyles.dropdownContainer}
          style={dropdownStyles.dropdown}
          itemStyle={dropdownStyles.dropdownItem}
          onChangeItem={(item) => handleChangeDestino(item.value)}
        />
      </View>
      {destino === "1" && (
        <View>
          <DropDownPicker
            items={cuentasData}
            defaultValue={cuenta}
            placeholder="Seleccione una cuenta."
            containerStyle={dropdownStyles.dropdownContainer}
            style={dropdownStyles.dropdown}
            itemStyle={dropdownStyles.dropdownItem}
            onChangeItem={(item) => handleChangeCuenta(item.value)}
          />
        </View>
      )}

      <TouchableOpacity onPress={onConfirmar} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={buttonStyles.btnBack}>
        <Text style={buttonStyles.btnBackText}>Volver</Text>
      </TouchableOpacity>

      <CustomSpinner isLoading={isLoading} text={"Guardando ingreso..."} />

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

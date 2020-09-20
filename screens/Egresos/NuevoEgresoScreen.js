import React from "react";
import { View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Text, theme } from "galio-framework";
import DropDownPicker from "react-native-dropdown-picker";
import { CustomSpinner, CustomModal } from "../../components";
import {
  screenStyles,
  buttonStyles,
  textboxStyles,
  dropdownStyles,
  titleStyles
} from "../../components/Styles";
import {
  categoriasEgresoData,
  mediosPagoData,
  tiposEgresoData,
  cuentasData,
  tarjetasData,
} from "../../components/Data";

export default function NuevoEgresoScren({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [fecha, setFecha] = React.useState("");
  const [monto, setMonto] = React.useState("");
  const [tipoEgreso, setTipoEgreso] = React.useState(null);
  const [categoriaEgreso, setCategoriaEgreso] = React.useState(null);
  const [detalleEgreso, setDetalleEgreso] = React.useState("");
  const [medioPago, setMedioPago] = React.useState(null);
  const [cuotas, setCuotas] = React.useState(null);
  const [cuenta, setCuenta] = React.useState(null);
  const [tarjeta, setTarjeta] = React.useState(null);

  const handleChangeFecha = (fecha) => setFecha(fecha);
  const handleChangeMonto = (monto) => setMonto(monto);
  const handleChangeDetalleEgreso = (detalleEgreso) => setDetalleEgreso(detalleEgreso);
  const handleChangeTipoEgreso = (tipoEgreso) => {
    setTipoEgreso(tipoEgreso);
    setCategoriaEgreso(null);
  };
  const handleChangeCategoriaEgreso = (categoriaEgreso) =>
    setCategoriaEgreso(categoriaEgreso);
  const handleChangeMedioPago = (medioPago) => {
    setMedioPago(medioPago);
    setCuotas(null);
    setCuenta(null);
  };
  const handleChangeCuotas = (cuotas) => setCuotas(cuotas);
  const handleChangeCuenta = (cuenta) => setCuenta(cuenta);
  const handleChangeTarjeta = (tarjeta) => setTarjeta(tarjeta);

  const limpiarState = () => {
    setIsLoading(false);
    setModalData({ ...modalData, isVisible: false });
    setFecha("");
    setMonto("");
    setDescripcion("");
    setTipoEgreso(null);
    setCategoriaEgreso(null);
    setMedioPago(null);
    setCuotas(null);
    setCuenta(null);
    setTarjeta(null);
  };

  const onConfirmar = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setModalData({
        message: "El egreso se guardó correctamente.",
        isVisible: true,
        isSuccess: true,
        successBtnText: "Aceptar",
      });
    }, 500);
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("Egresos");
  };

  return (
    <ScrollView style={screenStyles.screen}>

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Egreso
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
      <View>
        <DropDownPicker
          items={tiposEgresoData}
          defaultValue={tipoEgreso}
          placeholder="Seleccione un tipo de egreso."
          containerStyle={dropdownStyles.dropdownContainer}
          style={dropdownStyles.dropdown}
          itemStyle={dropdownStyles.dropdownItem}
          onChangeItem={(item) => handleChangeTipoEgreso(item.value)}
        />
      </View>
      {tipoEgreso === "1" && (
        <View>
          <DropDownPicker
            items={categoriasEgresoData}
            defaultValue={categoriaEgreso}
            placeholder="Seleccione una categoria."
            containerStyle={dropdownStyles.dropdownContainer}
            style={dropdownStyles.dropdown}
            itemStyle={dropdownStyles.dropdownItem}
            onChangeItem={(item) => handleChangeCategoriaEgreso(item.value)}
          />
        </View>
      )}
      {tipoEgreso === "2" && (
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Detalle del egreso..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(detalleEgreso) => handleChangeDetalleEgreso(detalleEgreso)}
          value={detalleEgreso}
        />
      </View>
      )}

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Medio de Pago
        </Text>
      </View>

      <View>
        <DropDownPicker
          items={mediosPagoData}
          defaultValue={medioPago}
          placeholder="Seleccione un medio de pago."
          containerStyle={dropdownStyles.dropdownContainer}
          style={dropdownStyles.dropdown}
          itemStyle={dropdownStyles.dropdownItem}
          onChangeItem={(item) => handleChangeMedioPago(item.value)}
        />
      </View>
      {medioPago === "2" && (
        <View>
          <DropDownPicker
            items={tarjetasData}
            defaultValue={tarjeta}
            placeholder="Seleccione una tarjeta de crédito."
            containerStyle={dropdownStyles.dropdownContainer}
            style={dropdownStyles.dropdown}
            itemStyle={dropdownStyles.dropdownItem}
            onChangeItem={(item) => handleChangeTarjeta(item.value)}
          />
        </View>
      )}
      {medioPago === "2" && (
        <View style={textboxStyles.textboxContainer}>
          <TextInput
            style={textboxStyles.textbox}
            placeholder="Cuotas ..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(item) => handleChangeCuotas(item.value)}
            value={cuotas}
          />
        </View>
      )}
      {medioPago === "3" || medioPago === "4" || medioPago === "5" && (
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

      <CustomSpinner isLoading={isLoading} text={"Guardando egreso..."} />

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

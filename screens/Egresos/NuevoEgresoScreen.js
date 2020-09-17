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
} from "../../components/Styles";
import {
  cantCuotasData,
  categoriasEgresoData,
  mediosPagoData,
  tiposEgresoData
} from "../../components/Data";

export default function NuevoEgresoScren({ navigation }) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [fecha, setFecha] = React.useState("");
  const [monto, setMonto] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [tipoEgreso, setTipoEgreso] = React.useState(null);
  const [categoriaEgreso, setCategoriaEgreso] = React.useState(null);
  const [medioPago, setMedioPago] = React.useState(null);
  const [cuotas, setCuotas] = React.useState(null);

  const handleChangeFecha = (fecha) => setFecha(fecha);
  const handleChangeMonto = (monto) => setMonto(monto);
  const handleChangeDescripcion = (descripcion) => setDescripcion(descripcion);
  const handleChangeTipoEgreso = (tipoEgreso) => { 
    setTipoEgreso(tipoEgreso);
    setCategoriaEgreso(null);
  }
  const handleChangeCategoriaEgreso = (categoriaEgreso) => setCategoriaEgreso(categoriaEgreso);
  const handleChangeMedioPago = (medioPago) => { 
    setMedioPago(medioPago);
    setCuotas(null);
  };
  const handleChangeCuotas = (cuotas) => setCuotas(cuotas);

  const limpiarState = () => {
    setIsLoading(false);
    setModalData({...modalData, isVisible: false});
    setFecha("");
    setMonto("");
    setDescripcion("");
    setTipoEgreso(null);
    setCategoriaEgreso(null);
    setMedioPago(null);
    setCuotas(null);
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
      {(medioPago === "2" || medioPago === "3") && (
        <View>
          <DropDownPicker
            items={cantCuotasData}
            defaultValue={cuotas}
            placeholder="Seleccione la cantidad de cuotas."
            containerStyle={dropdownStyles.dropdownContainer}
            style={dropdownStyles.dropdown}
            itemStyle={dropdownStyles.dropdownItem}
            onChangeItem={(item) => handleChangeCuotas(item.value)}
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
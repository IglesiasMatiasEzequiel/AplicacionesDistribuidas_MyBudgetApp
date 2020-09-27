import React from "react";
import { View, TextInput, TouchableOpacity, ScrollView, Platform} from "react-native";

import { Text, theme } from "galio-framework";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Textbox, Dropdown, CustomSpinner, CustomModal } from "../../components";

import {
  titleStyles,
  screenStyles,
  buttonStyles
} from "../../components/Styles";
import {
  categoriasEgresoData,
} from "../../components/Data";
import { validateRequired } from "../../components/Validations";

import { PresupuestosQueries } from "../../database";
import { getUser} from '../../components/Session';

export default function NuevoPresupuestoScreen({ navigation }) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [form, setForm] = React.useState({
    fecha: "",
    monto: "",
    tipo: null,
  });

  const [validations, setValidations] = React.useState({
    fecha: true,
    monto: true,
    tipo: true,
  });

  const [validationMessages, setValidationMessages] = React.useState({
    fecha: "",
    monto: "",
    tipo: "",
  });

  const handleChange = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value }));
  };

  const handleChangeTipo = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value }));
  };

  const limpiarState = () => {
    
    setForm({
      fecha: "",
      monto: "",
      tipo: null,
    });

    setValidations({
      fecha: true,
      monto: true,
      tipo: true,
    });

    setValidationMessages({
      fecha: "",
      monto: "",
      tipo: "",
    });

  };

  const onConfirmar = async () => {
    
    const isValidForm = await validateForm();

    if (isValidForm) {
      setIsLoading(true);
    
      var obj = {
        idUsuario: "1",
        fecha: form.fecha,
        monto: form.monto,
        tipo: form.tipo,
      }

      PresupuestosQueries._insert(obj,
        (data) => {
          setIsLoading(false);
          setModalData({
            message: "El presupuesto se guardó correctamente.",
            isVisible: true,
            isSuccess: true,
            successBtnText: "Aceptar",
          });
        },
        (error) => {
          console.log("Ocurrió un error al insertar el presupuesto. - " + error);
        }
      );
    }
  };

  const validateForm = async () => {
    const isFechaValid = await validateRequired(form.fecha);
    const isMontoValid = await validateRequired(form.monto);
    const isTipoValid = await validateRequired(form.tipo); 
    
     setValidations((prevState) => ({
      ...prevState,
      fecha: isFechaValid,
      monto: isMontoValid,
      tipo: isTipoValid,
    }));

    setValidationMessages((prevState) => ({
      ...prevState,
      fecha: !isFechaValid ? "La fecha es requerida..." : "",
      monto: !isMontoValid ? "El monto es requerido..." : "",
      tipo: !isTipoValid ? "Debe seleccionar un tipo de presupuesto..." : "",
    }));

    return isFechaValid && isMontoValid && isTipoValid;
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("Presupuestos");
  };

  return (
    <ScrollView style={screenStyles.screen}>
      <Dropdown
        propName="tipo"
        items={categoriasEgresoData}
        defaultValue={form.tipoIngreso}
        placeholder="Seleccione un tipo de presupuesto."
        handleChange={handleChangeTipo}
        isValid={validations.tipo}
        validationMessage={validationMessages.tipo}
      />
      <Textbox
        propName="fecha"
        placeholder="Fecha..."
        handleChange={handleChange}
        value={form.fecha}
        isValid={validations.fecha}
        validationMessage={validationMessages.fecha}
        keyboardType="date"
      />
      <Textbox
        propName="monto"
        placeholder="Monto..."
        handleChange={handleChange}
        value={form.monto}
        isValid={validations.monto}
        validationMessage={validationMessages.monto}
        keyboardType="numeric"
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
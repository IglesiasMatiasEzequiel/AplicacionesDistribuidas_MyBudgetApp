import React from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";

import { Text, theme } from "galio-framework";
import DropDownPicker from "react-native-dropdown-picker";
import { Textbox, Dropdown, CustomSpinner, CustomModal } from "../../components";

import {
  screenStyles,
  buttonStyles,
  textboxStyles,
  dropdownStyles,
} from "../../components/Styles";
import { tipoPrestamoData } from "../../components/Data";
import { validateRequired } from "../../components/Validations";

import { PrestamosQueries } from "../../database";
import { getUser} from '../../components/Session';

export default function NuevoPrestamoScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [form, setForm] = React.useState({
    tipo: null,
    emisorDestinatario: "",
    monto: "",
    intereses: "",
    vencimiento: "",
  });

  const [validations, setValidations] = React.useState({
    tipo: true,
    emisorDestinatario: true,
    monto: true,
    intereses: true,
    vencimiento: true,
  });

  const [validationMessages, setValidationMessages] = React.useState({
    tipo: "",
    emisorDestinatario: "",
    monto: "",
    intereses: "",
    vencimiento: "",
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
      tipo: null,
      emisorDestinatario: "",
      monto: "",
      intereses: "",
      vencimiento: "",
    });

    setValidations({
      tipo: true,
      emisorDestinatario: true,
      monto: true,
      intereses: true,
      vencimiento: true,
    });

    setValidationMessages({
      tipo: "",
      emisorDestinatario: "",
      monto: "",
      intereses: "",
      vencimiento: "",
    });

  };

  const onConfirmar = async () => {
    
    const isValidForm = await validateForm();

    if (isValidForm) {
      setIsLoading(true);
    
      var obj = {
        idUsuario: "1",
        tipo: form.tipo,
        emisorDestinatario: form.emisorDestinatario,
        monto: form.monto,
        intereses: form.intereses,
        vencimiento: form.vencimiento,
      }

      PrestamosQueries._insert(obj,
        (data) => {
          setIsLoading(false);
          setModalData({
            message: "El prestamo se guardó correctamente.",
            isVisible: true,
            isSuccess: true,
            successBtnText: "Aceptar",
          });
        },
        (error) => {
          console.log("Ocurrió un error al insertar el prestamos. - " + error);
        }
      );
    }
  };

  const validateForm = async () => {
    const isTipoValid = await validateRequired(form.tipo); 
    const isEmisorDestinatarioValid = await validateRequired(form.emisorDestinatario);
    const isMontoValid = await validateRequired(form.monto);
    const isInteresesValid = await validateRequired(form.intereses);
    //const isVencimientoValid = await validateRequired(form.vencimiento);

    var isVencimientoValid = true;
    if(form.tipo === "2"){ //Tomado
      isVencimientoValid = await validateRequired(form.vencimiento);
    }

     setValidations((prevState) => ({
      ...prevState,
      tipo: isTipoValid,
      emisorDestinatario: isEmisorDestinatarioValid,
      monto: isMontoValid,
      intereses: isInteresesValid,
      vencimiento: isVencimientoValid,
    }));

    setValidationMessages((prevState) => ({
      ...prevState,
      tipo: !isTipoValid ? "Debe seleccionar un tipo de prestamo..." : "",
      emisorDestinatario: !isEmisorDestinatarioValid ? "El emisor/destinatario es requerido..." : "",
      monto: !isMontoValid ? "El monto es requerido..." : "",
      intereses: !isInteresesValid ? "El interes es requerido..." : "",
      vencimiento: !isVencimientoValid ? "El vencimeinto es requerido..." : "",
    }));

    return isTipoValid && isEmisorDestinatarioValid && isMontoValid && isInteresesValid && isVencimientoValid;
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("Prestamos");
  };

  return (
    <ScrollView style={screenStyles.screen}>
      <Dropdown
        propName="tipo"
        items={tipoPrestamoData}
        defaultValue={form.tipo}
        placeholder="Seleccione un tipo de prestamo."
        handleChange={handleChangeTipo}
        isValid={validations.tipo}
        validationMessage={validationMessages.tipo}
      />
      <Textbox
        propName="emisorDestinatario"
        placeholder="Emisor/Destinario..."
        handleChange={handleChange}
        value={form.emisorDestinatario}
        isValid={validations.emisorDestinatario}
        validationMessage={validationMessages.emisorDestinatario}
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
      <Textbox
        propName="intereses"
        placeholder="Intereses..."
        handleChange={handleChange}
        value={form.intereses}
        isValid={validations.intereses}
        validationMessage={validationMessages.intereses}
        keyboardType="numeric"
      />
      
      {form.tipo === "2" && (
        <Textbox
          propName="vencimiento"
          placeholder="Fecha de Vencimiento..."
          handleChange={handleChange}
          value={form.vencimiento}
          isValid={validations.vencimiento}
          validationMessage={validationMessages.vencimiento}
          isDate={true}
        />
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

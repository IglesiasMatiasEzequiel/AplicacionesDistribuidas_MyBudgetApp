import React from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";

import { Text, theme } from "galio-framework";
import DropDownPicker from "react-native-dropdown-picker";
import { Textbox, TextboxDate, Dropdown, CustomSpinner, CustomModal } from "../../components";
import { bancosData, entidadesEmisorasData } from "../../components/Data";
import {
  screenStyles,
  buttonStyles,
  textboxStyles,
  dropdownStyles,
} from "../../components/Styles";

import { validateRequired } from "../../components/Validations";
import { TarjetasQueries } from "../../database";
import * as Session from "../../components/Session";

export default function NuevaTarjetaScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [form, setForm] = React.useState({
    banco: null,
    entidadEmisora: null,
    tarjeta:  "",
    vencimiento:  "",
    cierreResumen: "",
    vencimientoResumen: "",
  });

  const [validations, setValidations] = React.useState({
    banco: true,
    entidadEmisora: true,
    tarjeta: true,
    vencimiento: true,
    cierreResumen: true,
    vencimientoResumen: true,
  });

  const [validationMessages, setValidationMessages] = React.useState({
    banco: "",
    entidadEmisora: "",
    tarjeta:  "",
    vencimiento:  "",
    cierreResumen: "",
    vencimientoResumen: "",
  });

  const handleChange = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value }));
  };
  const handleChangeBanco = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value}));
  };
  const handleChangeEntidadEmisora = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value}));
  };

  const limpiarState = () => {
    
    setForm({
      banco: null,
      entidadEmisora: null,
      tarjeta:  "",
      vencimiento:  "",
      cierreResumen: "",
      vencimientoResumen: "",
    });

    setValidations({
      banco: true,
      entidadEmisora: true,
      tarjeta: true,
      vencimiento: true,
      cierreResumen: true,
      vencimientoResumen: true,
    });

    setValidationMessages({
      banco: "",
      entidadEmisora: "",
      tarjeta:  "",
      vencimiento:  "",
      cierreResumen: "",
      vencimientoResumen: "",
    });

  };

  const onConfirmar = async () => {
    
    const isValidForm = await validateForm();
    console.log(isValidForm);
    if (isValidForm) {
      setIsLoading(true);
      Session.getUser().then((usuario) => {
        var obj = {
          idUsuario: usuario.id,
          idBanco: form.banco,
          idEntidadEmisora: form.entidadEmisora,
          tarjeta: form.tarjeta,
          vencimiento: form.vencimiento,
          cierreResumem: form.cierreResumen,
          vencimientoResumem: form.vencimientoResumen,
        }
  
        TarjetasQueries._insert(obj,
          (data) => {
            setIsLoading(false);
            setModalData({
              message: "La tarjeta se guardó correctamente.",
              isVisible: true,
              isSuccess: true,
              successBtnText: "Aceptar",
            });
          },
          (error) => {
            console.log("Ocurrió un error al insertar la tarjeta. - " + error);
          }
        );
      });
    }
  };

  const validateForm = async () => {
    const isBancoValid = await validateRequired(form.banco);
    const isEntidadEmisoraValid = await validateRequired(form.entidadEmisora);
    const isTarjetaValid = await validateRequired(form.tarjeta); 
    const isVencimientoValid = await validateRequired(form.vencimiento); 
    const isCierreResumenValid = await validateRequired(form.cierreResumen); 
    const isVencimientoResumenValid = await validateRequired(form.vencimientoResumen); 
    
     setValidations((prevState) => ({
      ...prevState,
      banco: isBancoValid,
      entidadEmisora: isEntidadEmisoraValid,
      tarjeta: isTarjetaValid,
      vencimiento: isVencimientoValid,
      cierreResumen: isCierreResumenValid,
      vencimientoResumen: isVencimientoResumenValid,
    }));

    setValidationMessages((prevState) => ({
      ...prevState,
      banco: !isBancoValid ? "El banco es requerida..." : "",
      entidadEmisora: !isEntidadEmisoraValid ? "La entidad emisora es requerida..." : "",
      tarjeta: !isTarjetaValid ? "La tarjeta es requerida..." : "",
      vencimiento: !isVencimientoValid ? "El vencimiento es requerido..." : "",
      cierreResumen: !isCierreResumenValid ? "El cierre del resumen es requerido..." : "",
      vencimientoResumen: !isVencimientoResumenValid ? "El vencimiento del resumen es requerido..." : "",
    }));

    return isBancoValid && isEntidadEmisoraValid && isTarjetaValid && isVencimientoValid && isCierreResumenValid  && isVencimientoResumenValid;
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("Tarjetas");
  };

  return (
    <ScrollView style={screenStyles.screen}>
      <Dropdown
        propName="banco"
        items={bancosData}
        defaultValue={form.banco}
        placeholder="Seleccione un banco."
        handleChange={handleChangeBanco}
        isValid={validations.banco}
        validationMessage={validationMessages.banco}
      />
      <Dropdown
        propName="entidadEmisora"
        items={entidadesEmisorasData}
        defaultValue={form.entidadEmisoraIngreso}
        placeholder="Seleccione una entidadEmisora."
        handleChange={handleChangeEntidadEmisora}
        isValid={validations.entidadEmisora}
        validationMessage={validationMessages.entidadEmisora}
      />
      <Textbox
        propName="tarjeta"
        placeholder="Tarjeta..."
        handleChange={handleChange}
        value={form.tarjeta}
        isValid={validations.tarjeta}
        validationMessage={validationMessages.tarjeta}
        keyboardType="numeric"
      />
      <TextboxDate
        propName="vencimiento"
        placeholder="Fecha de Vencimiento..."
        handleChange={handleChange}
        value={form.vencimiento}
        isValid={validations.vencimiento}
        validationMessage={validationMessages.vencimiento}
      />
      <TextboxDate
        propName="cierreResumen"
        placeholder="Fecha de Cierre Resumen..."
        handleChange={handleChange}
        value={form.cierreResumen}
        isValid={validations.cierreResumen}
        validationMessage={validationMessages.cierreResumen}
      />
      <TextboxDate
        propName="vencimientoResumen"
        placeholder="Fecha de Vencimiento Resumen..."
        handleChange={handleChange}
        value={form.vencimientoResumen}
        isValid={validations.vencimientoResumen}
        validationMessage={validationMessages.vencimientoResumen}
      />

      <TouchableOpacity onPress={onConfirmar} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Confirmar</Text>
      </TouchableOpacity>

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <TouchableOpacity onPress={onBack} style={buttonStyles.btnBack}>
          <Text style={buttonStyles.btnBackText}>Volver</Text>
        </TouchableOpacity>
      </View>

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

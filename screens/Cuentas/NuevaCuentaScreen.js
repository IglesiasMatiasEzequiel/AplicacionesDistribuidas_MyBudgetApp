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
  titleStyles,
} from "../../components/Styles";

import { validateRequired } from "../../components/Validations";
import { CuentasQueries } from "../../database";
import * as Session from "../../components/Session";

export default function NuevaCuentaScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [form, setForm] = React.useState({
    cbu: "",
    alias: "",
    descripcion: "",
    monto: "",
    banco: null,
    entidadEmisora: null,
    tarjeta: "",
    vencimiento: "",
  });

  const [validations, setValidations] = React.useState({
    cbu: true,
    alias: true,
    descripcion: true,
    monto: true,
    banco: true,
    entidadEmisora: true,
    tarjeta: true,
    vencimiento: true,
  });

  const [validationMessages, setValidationMessages] = React.useState({
    cbu: "",
    alias: "",
    descripcion: "",
    monto: "",
    banco: "",
    entidadEmisora: "",
    tarjeta: "",
    vencimiento: "",
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
      cbu: "",
      alias: "",
      descripcion: "",
      monto: "",
      banco: null,
      entidadEmisora: null,
      tarjeta: "",
      vencimiento: "",
    });

    setValidations({
      cbu: true,
      alias: true,
      descripcion: true,
      monto: true,
      banco: true,
      entidadEmisora: true,
      tarjeta: true,
      vencimiento: true,
    });

    setValidationMessages({
      cbu: "",
      alias: "",
      descripcion: "",
      monto: "",
      banco: "",
      entidadEmisora: "",
      tarjeta: "",
      vencimiento: "",
    });
  };

  const onConfirmar = async () => {
    
    const isValidForm = await validateForm();
    
    if (isValidForm) {
      setIsLoading(true);
      Session.getUser().then((usuario) => {
        var obj = {
          idUsuario: usuario.id,
          idBanco: form.banco,
          idEntidadEmisora: form.entidaddEmisora,
          cbu: form.cbu,
          alias: form.alias,
          descripcion: form.descripcion,
          monto: form.monto,
          tarjeta: form.tarjeta,
          vencimiento: form.vencimiento,
        }
  
        CuentasQueries._insert(obj,
          (data) => {
            setIsLoading(false);
            setModalData({
              message: "La cuenta se guardó correctamente.",
              isVisible: true,
              isSuccess: true,
              successBtnText: "Aceptar",
            });
          },
          (error) => {
            console.log("Ocurrió un error al insertar la cuenta. - " + error);
          }
        );
      });
    }
  };

  const validateForm = async () => {
    const isCbuValid = await validateRequired(form.cbu);
    const isAliasValid = await validateRequired(form.alias);
    const isDescripcionValid = await validateRequired(form.descripcion);
    const isMontoValid = await validateRequired(form.monto);
    const isBancoValid = await validateRequired(form.banco);
    const isEntidadEmisoraValid = await validateRequired(form.entidadEmisora);
    const isTarjetaValid = await validateRequired(form.tarjeta);
    const isVencimientoValid = await validateRequired(form.vencimiento);


    setValidations((prevState) => ({
      ...prevState,
      cbu: isCbuValid,
      alias: isAliasValid,
      descripcion: isDescripcionValid,
      monto: isMontoValid,
      banco: isBancoValid,
      entidadEmisora: isEntidadEmisoraValid,
      tarjeta: isTarjetaValid,
      vencimiento: isVencimientoValid
    }));

    setValidationMessages((prevState) => ({
      ...prevState,
      cbu: !isCbuValid ? " El Cbu es requerido..." : "",
      alias: !isAliasValid ? " El Alias es requerido..." : "",
      descripcion: !isDescripcionValid ? " La descripcion es requerida..." : "",
      monto: !isMontoValid ? " El monto es requerido..." : "",
      banco: !isBancoValid ? " El banco es requerido..." : "",
      entidadEmisora: !isEntidadEmisoraValid ? " La entidad emisora es requerida..." : "",
      tarjeta: !isTarjetaValid ? " la tarjeta es requerida..." : "",
      vencimiento: !isVencimientoValid ? " El vencimiento es requerido..." : "",
    }));

    return isCbuValid && isAliasValid && isDescripcionValid && isMontoValid && isBancoValid && isEntidadEmisoraValid && isTarjetaValid && isVencimientoValid;
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
      <Textbox
        propName="cbu"
        placeholder="CBU..."
        handleChange={handleChange}
        value={form.cbu}
        isValid={validations.cbu}
        validationMessage={validationMessages.cbu}
        keyboardType="numeric"
      />
      <Textbox
        propName="alias"
        placeholder="alias..."
        handleChange={handleChange}
        value={form.alias}
        isValid={validations.alias}
        validationMessage={validationMessages.alias}
      />      
      <Textbox
        propName="descripcion"
        placeholder="Descripcion..."
        handleChange={handleChange}
        value={form.descripcion}
        isValid={validations.descripcion}
        validationMessage={validationMessages.descripcion}
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

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Tarjeta de débito
        </Text>
      </View>
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
        defaultValue={form.entidadEmisora}
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

      <TouchableOpacity onPress={onConfirmar} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Confirmar</Text>
      </TouchableOpacity>
      
      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <TouchableOpacity onPress={onBack} style={buttonStyles.btnBack}>
          <Text style={buttonStyles.btnBackText}>Volver</Text>
        </TouchableOpacity>
      </View>

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

import React from "react";
import { View, TouchableOpacity, ScrollView, Text } from "react-native";

import { Textbox, TextboxDate, Dropdown, CustomSpinner, CustomModal } from "../../components";
import { bancosData, entidadesEmisorasData } from "../../components/Data";
import {
  screenStyles,
  buttonStyles,
  titleStyles,
} from "../../components/Styles";

import { validateRequired } from "../../components/Validations";
import { CuentasQueries } from "../../database";

import { formatStringDateFromDB, formatStringDateToDB } from "../../components/Formatters";

export default function NuevaCuentaScreen({ route, navigation }) {

  const id = route?.params?.id ?? 0;

  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [form, setForm] = React.useState({
    id: "",
    cbu: "",
    alias: "",
    descripcion: "",
    banco: null,
    entidadEmisora: null,
    tarjeta: "",
    vencimiento: "",
  });

  const [validations, setValidations] = React.useState({
    cbu: true,
    alias: true,
    descripcion: true,
    banco: true,
    entidadEmisora: true,
    tarjeta: true,
    vencimiento: true,
  });

  const [validationMessages, setValidationMessages] = React.useState({
    cbu: "",
    alias: "",
    descripcion: "",
    banco: "",
    entidadEmisora: "",
    tarjeta: "",
    vencimiento: "",
  });

  const handleChange = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value }));
  };

  const limpiarState = () => {
    
    setForm({
      cbu: "",
      alias: "",
      descripcion: "",
      banco: null,
      entidadEmisora: null,
      tarjeta: "",
      vencimiento: "",
    });

    setValidations({
      cbu: true,
      alias: true,
      descripcion: true,
      banco: true,
      entidadEmisora: true,
      tarjeta: true,
      vencimiento: true,
    });

    setValidationMessages({
      cbu: "",
      alias: "",
      descripcion: "",
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
      
      var obj = {
        id: form.id,
        idBanco: form.banco,
        idEntidadEmisora: form.entidadEmisora,
        cbu: form.cbu,
        alias: form.alias,
        descripcion: form.descripcion,
        tarjeta: form.tarjeta,
        vencimiento: formatStringDateToDB(form.vencimiento),
      }

      CuentasQueries._update(obj,
        () => {
          setIsLoading(false);
          setModalData({
            message: "La cuenta se guardó correctamente.",
            isVisible: true,
            isSuccess: true,
            successBtnText: "Aceptar",
          });
        },
        (error) => {
          console.log("Ocurrió un error al editar la cuenta. - " + error);
        }
      );
    }
  };

  const validateForm = async () => {

    var isCbuValid = await validateRequired(form.cbu);
    var isAliasValid = await validateRequired(form.alias);
    var isDescripcionValid = await validateRequired(form.descripcion);
    var isBancoValid = await validateRequired(form.banco);
    var isEntidadEmisoraValid = await validateRequired(form.entidadEmisora);
    var isTarjetaValid = await validateRequired(form.tarjeta);
    var isVencimientoValid = await validateRequired(form.vencimiento);

    var cbuValidationMessage = "El Cbu es requerido...";
    var aliasValidationMessage = "El Alias es requerido...";
    var descripcionValidationMessage = "La descripcion es requerida...";
    var bancoValidationMessage = "El banco es requerido...";
    var entidadEmisoraValidationMessage = "La entidad emisora es requerida...";
    var tarjetaValidationMessage = "La tarjeta es requerida...";
    var vencimientoValidationMessage = "El vencimiento es requerido...";

    if(isCbuValid && form.cbu.length != 22) {
      isCbuValid = false;
      cbuValidationMessage = "El CBU debe tener 22 dígitos..."
    }

    if(isTarjetaValid && form.tarjeta.toString().length != 4) {
      isTarjetaValid  = false;
      tarjetaValidationMessage = "Debe ingresar los 4 dígitos de la tarjeta..."
    }

    setValidations((prevState) => ({
      ...prevState,
      cbu: isCbuValid,
      alias: isAliasValid,
      descripcion: isDescripcionValid,
      banco: isBancoValid,
      entidadEmisora: isEntidadEmisoraValid,
      tarjeta: isTarjetaValid,
      vencimiento: isVencimientoValid
    }));

    setValidationMessages((prevState) => ({
      ...prevState,
      cbu: cbuValidationMessage,
      alias: aliasValidationMessage,
      descripcion: descripcionValidationMessage,
      banco: bancoValidationMessage,
      entidadEmisora: entidadEmisoraValidationMessage,
      tarjeta: tarjetaValidationMessage,
      vencimiento: vencimientoValidationMessage,
    }));

    return isCbuValid && isAliasValid && isDescripcionValid && isBancoValid && isEntidadEmisoraValid && isTarjetaValid && isVencimientoValid;
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("CuentasBancarias", { isReload: true });
  };

  const getCuenta = (id) => {
    CuentasQueries._selectById(id, (data) => {
      if(data != null && data.length === 1){
        setForm({
          id: id,
          cbu: data[0].cbu,
          alias: data[0].alias,
          descripcion: data[0].descripcion,
          banco: data[0].idBanco.toString(),
          entidadEmisora: data[0].idEntidadEmisora.toString(),
          tarjeta: data[0].tarjeta.toString(),
          vencimiento: formatStringDateFromDB(data[0].vencimiento),
        });
      }
    })
  }

  if(id > 0){
    navigation.setParams({ id: 0 });
    getCuenta(id);
  }

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
        handleChange={handleChange}
        isValid={validations.banco}
        validationMessage={validationMessages.banco}
      />
      <Dropdown
        propName="entidadEmisora"
        items={entidadesEmisorasData}
        defaultValue={form.entidadEmisora}
        placeholder="Seleccione una entidad emisora."
        handleChange={handleChange}
        isValid={validations.entidadEmisora}
        validationMessage={validationMessages.entidadEmisora}
      />
      <Textbox
        propName="tarjeta"
        placeholder="Úlitmos 4 dígitos de su tarjeta..."
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

      <CustomSpinner isLoading={isLoading} text={"Cargando..."} />

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

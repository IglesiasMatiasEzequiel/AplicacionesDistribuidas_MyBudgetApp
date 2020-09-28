import React from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";

import { Text, theme } from "galio-framework";
import DropDownPicker from "react-native-dropdown-picker";
import { Textbox, TextboxDate, Dropdown, CustomSpinner, CustomModal } from "../../components";
import { tipoInversionData } from "../../components/Data";
import {
  screenStyles,
  buttonStyles,
  textboxStyles,
  dropdownStyles,
} from "../../components/Styles";

import { validateRequired } from "../../components/Validations";
import { InversionesQueries } from "../../database";
import * as Session from "../../components/Session";

export default function NuevaInversionScreen({ navigation }) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [form, setForm] = React.useState({
    tipo: null,
    monto: "",
    origen: "",
    fechaInicio: "",
    nombre: "",
    duracion: ""
  });

  const [validations, setValidations] = React.useState({
    tipo: true,
    monto: true,
    origen: true,
    fechaInicio: true,
    nombre: true,
    duracion: true
  });

  const [validationMessages, setValidationMessages] = React.useState({
    tipo: "",
    monto: "",
    origen: "",
    fechaInicio: "",
    nombre: "",
    duracion: ""
  });

  const handleChange = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value }));
  };

  const handleChangeTipo = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value}));
  };


  const limpiarState = () => {

    setForm({
      tipo: null,
      monto: "",
      origen: "",
      fechaInicio: "",
      nombre: "",
      duracion: ""
    });

    setValidations({
      tipo: true,
      monto: true,
      origen: true,
      fechaInicio: true,
      nombre: true,
      duracion: true
    });

    setValidationMessages({
      tipo: "",
      monto: "",
      origen: "",
      fechaInicio: "",
      nombre: "",
      duracion: ""
    });
  };

  const onConfirmar = async () => {

    const isValidForm = await validateForm();

    if(isValidForm){
      setIsLoading(true);

      Session.getUser().then((usuario) => {
        var obj = {
          idUsuario: usuario.id,
          idTipo: form.tipo,
          monto: form.monto,
          origen: form.origen,
          fechaInicio: form.fechaInicio,
          nombre: form.nombre,
          duracion: form.duracion
        }

        InversionesQueries._insert(obj,
          (data) => {
            setIsLoading(false);
            setModalData({
              message: "La inversion se guardó correctamente.",
              isVisible: true,
              isSuccess: true,
              successBtnText: "Aceptar",
            });
          },
          (error) => {
            console.log("Ocurrió un error al insertar el ingreso. - " + error);
          }
        );
      });
    }
  };

  const validateForm = async () => {
    const isTipoValid = await validateRequired(form.tipo);
    const isMontoValid = await validateRequired(form.monto);
    const isOrigenValid = await validateRequired(form.origen);
    const isFechaInicioValid = await validateRequired(form.fechaInicio);
    const isNombreValid = await validateNombre(form.nombre);
    const isDuracionValid = await validateDuracion(form.duracion);

    setValidations((prevState) => ({
      ...prevState,
      tipo: isTipoValid,
      monto: isMontoValid,
      origen: isOrigenValid,
      fechaInicio: isFechaInicioValid,
      nombre: isNombreValid,
      duracion: isDuracionValid
    }));

    setValidationMessages((prevState) => ({
      ...prevState,
      tipo: !isTipoValid ? "Debe seleccionar un tipo..." : "",
      monto: !isMontoValid ? "El monto es requerido..." : "",
      origen: !isOrigenValid ? "Debe seleccionar el origen de la inversión..." : "",
      fechaInicio: !isFechaInicioValid ? "La fecha es requerida..." : "",
      nombre: !isNombreValid ? "Debe ingresar un nombre a la inversión..." : "",
      duracion: !isDuracionValid ? "Debe ingresar la duración..." : ""
    }));

    return isTipoValid && isMontoValid && isOrigenValid && isFechaInicioValid && isNombreValid && isDuracionValid;
  };


  const onBack = () => {
    limpiarState();
    navigation.navigate("Inversiones", { recargarListado: true });
  };

  return (
    <ScrollView style={screenStyles.screen}>

      <Dropdown
        propName="tipo"
        items={tipoInversionData}
        defaultValue={form.tipo}
        placeholder="Seleccione un tipo de inversión."
        handleChange={handleChangeTipo}
        isValid={validations.form.tipo}
        validationMessage={validationMessages.form.tipo}
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
        propName="origen"
        placeholder="Origen..."
        handleChange={handleChange}
        value={form.origen}
        isValid={validations.origen}
        validationMessage={validationMessages.origen}
      />
      <TextboxDate
        propName="fechaInicio"
        placeholder="Fecha..."
        handleChange={handleChange}
        value={form.fechaInicio}
        isValid={validations.fechaInicio}
        validationMessage={validationMessages.fechaInicio}
      />

      {form.tipo === "1" && (
        <Textbox
          propName="nombre"
          placeholder="Nombre de la acción..."
          handleChange={handleChange}
          value={form.nombre}
          isValid={validations.nombre}
          validationMessage={validationMessages.nombre}
        />
      )}

      {form.tipo === "2" && (
       <Textbox
        propName="nombre"
        placeholder="Nombre del plazo fijo..."
        handleChange={handleChange}
        value={form.nombre}
        isValid={validations.nombre}
        validationMessage={validationMessages.nombre}
      />
      )}

      {form.tipo === "2" && (
       <Textbox
        propName="duración"
        placeholder="Duración (30 a 365 días)..."
        handleChange={handleChange}
        value={form.duracion}
        isValid={validations.duracion}
        validationMessage={validationMessages.duracion}
      />
      )}

      {form.tipo === "3" && (
        <Textbox
          propName="nombre"
          placeholder="Nombre del fondo común..."
          handleChange={handleChange}
          value={form.nombre}
          isValid={validations.nombre}
          validationMessage={validationMessages.nombre}
       />
      )}

      {form.tipo === "4" && (
          <Textbox
            propName="nombre"
            placeholder="Nombre del bono..."
            handleChange={handleChange}
            value={form.nombre}
            isValid={validations.nombre}
            validationMessage={validationMessages.nombre}
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

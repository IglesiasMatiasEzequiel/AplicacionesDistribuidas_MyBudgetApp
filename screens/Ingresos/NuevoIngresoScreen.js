import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { Textbox, TextboxDate, Dropdown, CustomSpinner, CustomModal } from "../../components";

import {
  titleStyles,
  screenStyles,
  buttonStyles
} from "../../components/Styles";
import {
  destinosData,
  tiposIngresoData,
  categoriasIngresoData
} from "../../components/Data";

import { validateRequired } from "../../components/Validations";
import { CuentasQueries, IngresosQueries } from "../../database";
import { formatStringDateToDB } from "../../components/Formatters";

import * as Session from "../../components/Session";

export default function NuevoIngresoScren({ navigation }) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [dropdownData, setDropdownData] = React.useState(null);

  const [form, setForm] = React.useState({
    fecha: "",
    monto: "",
    descripcion: "",
    tipoIngreso: null,
    categoriaIngreso: null,
    destino: null,
    cuenta: null
  });

  const [validations, setValidations] = React.useState({
    fecha: true,
    monto: true,
    descripcion: true,
    tipoIngreso: true,
    categoriaIngreso: true,
    destino: true,
    cuenta: true
  });

  const [validationMessages, setValidationMessages] = React.useState({
    fecha: "",
    monto: "",
    descripcion: "",
    tipoIngreso: "",
    categoriaIngreso: "",
    destino: "",
    cuenta: ""
  });

  const handleChange = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value }));
  };

  const handleChangeTipoIngreso = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value, categoriaIngreso: null }));
  };

  const handleChangeDestino = (prop, value) => { 
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value, cuenta: null }));
  }

  const limpiarState = () => {
    
    setForm({
      fecha: "",
      monto: "",
      descripcion: "",
      tipoIngreso: null,
      categoriaIngreso: null,
      destino: null,
      cuenta: null,
    });

    setValidations({
      fecha: true,
      monto: true,
      descripcion: true,
      tipoIngreso: true,
      categoriaIngreso: true,
      destino: true,
      cuenta: true,
    });

    setValidationMessages({
      fecha: "",
      monto: "",
      descripcion: "",
      tipoIngreso: "",
      categoriaIngreso: "",
      destino: "",
      cuenta: "",
    });
  };

  const onConfirmar = async () => {
    
    const isValidForm = await validateForm();

    if (isValidForm) {
      setIsLoading(true);
    
      Session.getUser().then((usuario) => {
        var obj = {
          idUsuario: usuario.id,
          idTipoIngreso: form.tipoIngreso,
          idCategoriaIngreso: form.categoriaIngreso,
          idDestinoIngreso: form.destino,
          idCuenta: form.cuenta,
          fecha: formatStringDateToDB(form.fecha),
          monto: form.monto,
          descripcion: form.descripcion
        }
  
        IngresosQueries._insert(obj,
          () => {

            if(form.destino === "1"){
              CuentasQueries._updateAgregarMonto(form.cuenta, form.monto);
            }

            setIsLoading(false);
            setModalData({
              message: "El ingreso se guardó correctamente.",
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
    const isFechaValid = await validateRequired(form.fecha);
    const isMontoValid = await validateRequired(form.monto);
    const isTipoIngresoValid = await validateRequired(form.tipoIngreso);
    const isDestinoValid = await validateRequired(form.destino);
    
    var isCuentaValid = true;
    var isCategoriaIngresoValid = true;
        
    if(form.tipoIngreso === "1"){ //Periódico mensual
      isCategoriaIngresoValid = await validateRequired(form.categoriaIngreso);
    }

    if(form.destino === "1"){ //Cuenta bancaria
      isCuentaValid = await validateRequired(form.cuenta);
    }

    setValidations((prevState) => ({
      ...prevState,
      fecha: isFechaValid,
      monto: isMontoValid,
      tipoIngreso: isTipoIngresoValid,
      categoriaIngreso: isCategoriaIngresoValid,
      destino: isDestinoValid,
      cuenta: isCuentaValid
    }));

    setValidationMessages((prevState) => ({
      ...prevState,
      fecha: !isFechaValid ? "La fecha es requerida..." : "",
      monto: !isMontoValid ? "El monto es requerido..." : "",
      tipoIngreso: !isTipoIngresoValid ? "Debe seleccionar un tipo de ingreso..." : "",
      categoriaIngreso: !isCategoriaIngresoValid ? "Debe seleccionar una categoría de ingreso..." : "",
      destino: !isDestinoValid ? "Debe seleccionar un destino..." : "",
      cuenta: !isCuentaValid ? "Debe seleccionar una cuenta..." : ""
    }));

    return isFechaValid && isMontoValid && isTipoIngresoValid && isCategoriaIngresoValid && isDestinoValid && isCuentaValid;
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("Ingresos", { isReload: true });
  };

  const fillDropdownData = () => {

    setIsLoading(true);

    Session.getUser().then((usuario) => {
      CuentasQueries._selectAllByIdUsuario(usuario.id, (data) => {

        var cuentas = data?.map((item) => {
          return {
            label: "CBU: " + item.cbu + " - " + item.descripcion,
            value: item.id.toString()
          }   
        }) ?? [];           

        setDropdownData({
          cuentas: cuentas,
        });

        setIsLoading(false);
      });
    });
  }

  if(dropdownData === null && !isLoading){
    fillDropdownData();
  }

  return (
    <ScrollView style={screenStyles.screen}>
      {dropdownData !== null && (
        <View>
          <View
            style={[screenStyles.containerDivider, titleStyles.titleContainer]}
          >
            <Text h5 style={titleStyles.titleText}>
              Ingreso
            </Text>
          </View>

          <TextboxDate
            propName="fecha"
            placeholder="Fecha..."
            handleChange={handleChange}
            value={form.fecha}
            isValid={validations.fecha}
            validationMessage={validationMessages.fecha}
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
            propName="descripcion"
            placeholder="Descripción..."
            handleChange={handleChange}
            value={form.descripcion}
            isValid={validations.descripcion}
            validationMessage={validationMessages.descripcion}
          />
          <Dropdown
            propName="tipoIngreso"
            items={tiposIngresoData}
            defaultValue={form.tipoIngreso}
            placeholder="Seleccione un tipo de ingreso."
            handleChange={handleChangeTipoIngreso}
            isValid={validations.tipoIngreso}
            validationMessage={validationMessages.tipoIngreso}
          />
          {form.tipoIngreso === "1" && (
            <Dropdown
              propName="categoriaIngreso"
              items={categoriasIngresoData}
              defaultValue={form.categoriaIngreso}
              placeholder="Seleccione una categoria."
              handleChange={handleChange}
              isValid={validations.categoriaIngreso}
              validationMessage={validationMessages.categoriaIngreso}
            />
          )}

          <View
            style={[screenStyles.containerDivider, titleStyles.titleContainer]}
          >
            <Text h5 style={titleStyles.titleText}>
              Destino
            </Text>
          </View>

          <Dropdown
            propName="destino"
            items={destinosData}
            defaultValue={form.destino}
            placeholder="Seleccione un destino."
            handleChange={handleChangeDestino}
            isValid={validations.destino}
            validationMessage={validationMessages.destino}
          />

          {form.destino === "1" && (
            <Dropdown
              propName="cuenta"
              items={dropdownData.cuentas}
              defaultValue={form.cuenta}
              placeholder="Seleccione un cuenta."
              handleChange={handleChange}
              isValid={validations.cuenta}
              validationMessage={validationMessages.cuenta}
            />
          )}

          <TouchableOpacity onPress={onConfirmar} style={buttonStyles.btn}>
            <Text style={buttonStyles.btnText}>Confirmar</Text>
          </TouchableOpacity>

          <View
            style={[screenStyles.containerDivider, titleStyles.titleContainer]}
          >
            <TouchableOpacity onPress={onBack} style={buttonStyles.btnBack}>
              <Text style={buttonStyles.btnBackText}>Volver</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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

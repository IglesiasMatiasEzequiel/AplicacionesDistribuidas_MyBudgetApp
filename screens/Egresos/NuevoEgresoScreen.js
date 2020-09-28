import React from "react";
import { View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Text, theme } from "galio-framework";
import DropDownPicker from "react-native-dropdown-picker";
import { Textbox, TextboxDate,Dropdown, CustomSpinner, CustomModal } from "../../components";
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

import { validateRequired } from "../../components/Validations";
import { EgresosQueries } from "../../database";
import * as Session from "../../components/Session";

export default function NuevoEgresoScren({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [form, setForm] = React.useState({
    fecha: "",
    monto: "",
    tipoEgreso: null,
    categoriaEgreso: null,
    detalleEgreso: "",
    medioPago: null,
    cuotas: "",
    cuenta: null,
    tarjeta: null,
  });

  const [validations, setValidations] = React.useState({
    fecha: true,
    monto: true,
    tipoEgreso: true,
    categoriaEgreso: true,
    detalleEgreso: true,
    medioPago: true,
    cuotas: true,
    cuenta: true,
    tarjeta: true,
  });

  const [validationMessages, setValidationMessages] = React.useState({
    fecha: "",
    monto: "",
    tipoEgreso: "",
    categoriaEgreso: "",
    detalleEgreso: "",
    medioPago: "",
    cuotas: "",
    cuenta: "",
    tarjeta: "",
  });

  const handleChange = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value }));
  };
  const handleChangeTipoEgreso = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value, categoriaEgreso: null}));
  };

  const handleChangeMedioPago = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value}));
  };

  const limpiarState = () => {
    
    setForm({
      fecha: "",
      monto: "",
      tipoEgreso: null,
      categoriaEgreso: null,
      detalleEgreso: "",
      medioPago: null,
      cuotas: "",
      cuenta: null,
      tarjeta: null,
    });

    setValidations({
      fecha: true,
      monto: true,
      tipoEgreso: true,
      categoriaEgreso: true,
      detalleEgreso: true,
      medioPago: true,
      cuotas: true,
      cuenta: true,
      tarjeta: true,
    });

    setValidationMessages({
      fecha: "",
      monto: "",
      tipoEgreso: "",
      categoriaEgreso: "",
      detalleEgreso: "",
      medioPago: "",
      cuotas: "",
      cuenta: "",
      tarjeta: "",
    });

  };

  const onConfirmar = async () => {
    
    const isValidForm = await validateForm();

    if (isValidForm) {
      setIsLoading(true);

      Session.getUser().then((usuario) => {
        var obj = {
          idUsuario: usuario.id,
          fecha: form.fecha,
          monto: form.monto,
          idTipoEgreso: form.tipoEgreso,
          idCategoriaEgreso: form.categoriaEgreso,
          detalleEgreso: form.detalleEgreso,
          idMedioPago: form.medioPago,
          cuotas: form.cuotas,
          idCuenta: form.cuenta,
          idTarjeta: form.tarjeta,
        }
  
        EgresosQueries._insert(obj,
          (data) => {
            setIsLoading(false);
            setModalData({
              message: "El egreso se guardó correctamente.",
              isVisible: true,
              isSuccess: true,
              successBtnText: "Aceptar",
            });
          },
          (error) => {
            console.log("Ocurrió un error al insertar el egreso. - " + error);
          }
        );
      });
      
    }
  };

  const validateForm = async () => {
    const isFechaValid = await validateRequired(form.fecha);
    const isMontoValid = await validateRequired(form.monto);
    const isTipoEgresoValid = await validateRequired(form.tipoEgreso);
    const isMedioPagoValid = await validateRequired(form.medioPago);

    var isDetalleEgresoValid = true;
    if(form.tipoEgreso === "2"){ //Extraordinario
      isDetalleEgresoValid = await validateRequired(form.detalleEgreso);
    }
    var isCategoriaEgresoValid = true;
    if(form.tipoEgreso === "1"){ //Periódico mensual
      isCategoriaEgresoValid = await validateRequired(form.categoriaEgreso);
    }

    var isCuotasValid = true;
    var isCuentaValid = true;
    var isTarjetaValid= true;
    if(form.medioPago === "2"){ //Tarjeta de credito
      isCuotasValid = await validateRequired(form.cuotas);
      isTarjetaValid = await validateRequired(form.tarjeta);
    }
    if(form.medioPago === "3" || form.medioPago === "4" || form.medioPago === "5"){ //Tarjeta de credito
      isCuentaValid = await validateRequired(form.cuenta);
    }

     setValidations((prevState) => ({
      ...prevState,
      fecha: isFechaValid,
      monto: isMontoValid,
      tipoEgreso: isTipoEgresoValid,
      categoriaEgreso: isCategoriaEgresoValid,
      detalleEgreso: isDetalleEgresoValid,
      medioPago: isMedioPagoValid,
      cuotas: isCuotasValid,
      cuenta: isCuentaValid,
      tarjeta: isTarjetaValid,
    }));

    setValidationMessages((prevState) => ({
      ...prevState,
      fecha: !isFechaValid ? " La fecha es requerida..." : "",
      monto: !isMontoValid ? " El Monto es requerido..." : "",
      tipoEgreso: !isTipoEgresoValid ? " El tipo es requerido..." : "",
      categoriaEgreso: !isCategoriaEgresoValid ? " La categoria Egreso es requerida..." : "",
      detalleEgreso: !isDetalleEgresoValid ? "El detalle Egreso es requerido..." : "",
      medioPago: !isMedioPagoValid ? " El medio de pago es requerido..." : "",
      cuotas: !isCuotasValid ? " La cuota es requerida..." : "",
      cuenta: !isCuentaValid ? " La cuenta es requerida..." : "",
      tarjeta: !isTarjetaValid ? " La tarjeta es requerida..." : "",
    }));

    return isFechaValid && isMontoValid && isTipoEgresoValid && isCategoriaEgresoValid && isDetalleEgresoValid &&
           isMedioPagoValid && isCuotasValid && isCuentaValid && isTarjetaValid
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

      <Dropdown
        propName="tipoEgreso"
        items={tiposEgresoData}
        defaultValue={form.tipoEgreso}
        placeholder="Seleccione un Tipo Egreso."
        handleChange={handleChangeTipoEgreso}
        isValid={validations.tipoEgreso}
        validationMessage={validationMessages.tipoEgreso}
      />

      {form.tipoEgreso === "1" && (
        <Dropdown
          propName="categoriaEgreso"
          items={categoriasEgresoData}
          defaultValue={form.categoriaEgreso}
          placeholder="Seleccione una categoria de Egreso."
          handleChange={handleChange}
          isValid={validations.categoriaEgreso}
          validationMessage={validationMessages.categoriaEgreso}
        />
      )}
      {form.tipoEgreso === "2" && (
        <Textbox
          propName="detalleEgreso"
          placeholder="Detalle Egreso..."
          handleChange={handleChange}
          value={form.detalleEgreso}
          isValid={validations.detalleEgreso}
          validationMessage={validationMessages.detalleEgreso}
        />
      )}

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Medio de Pago
        </Text>
      </View>
      
      <Dropdown
        propName="medioPago"
        items={mediosPagoData}
        defaultValue={form.medioPago}
        placeholder="Seleccione medio de pago."
        handleChange={handleChangeMedioPago}
        isValid={validations.medioPago}
        validationMessage={validationMessages.medioPago}
      />

      {form.medioPago === "2" && (
        <View>
          <Textbox
            propName="cuotas"
            placeholder="Cuotas..."
            handleChange={handleChange}
            value={form.cuotas}
            isValid={validations.cuotas}
            validationMessage={validationMessages.cuotas}
            keyboardType="numeric"
          />
          <Dropdown
            propName="tarjeta"
            items={tarjetasData}
            defaultValue={form.tarjeta}
            placeholder="Seleccione una tarjeta."
            handleChange={handleChange}
            isValid={validations.tarjeta}
            validationMessage={validationMessages.tarjeta}
          />
        </View>
      )}

      {(form.medioPago === "3" || form.medioPago === "4" || form.medioPago === "5") && (
        <Dropdown
          propName="cuenta"
          items={cuentasData}
          defaultValue={form.cuenta}
          placeholder="Seleccione una cuenta."
          handleChange={handleChange}
          isValid={validations.cuenta}
          validationMessage={validationMessages.cuenta}
        />
      )}

      <TouchableOpacity onPress={onConfirmar} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Confirmar</Text>
      </TouchableOpacity>

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <TouchableOpacity onPress={onBack} style={buttonStyles.btnBack}>
          <Text style={buttonStyles.btnBackText}>Volver</Text>
        </TouchableOpacity>
      </View>

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

import React from "react";
import { View, TouchableOpacity, ScrollView, Text } from "react-native";

import {
  Textbox,
  TextboxDate,
  Dropdown,
  CustomSpinner,
  CustomModal,
} from "../../components";
import { tipoInversionData } from "../../components/Data";
import {
  screenStyles,
  buttonStyles,
} from "../../components/Styles";

import { validateRequired } from "../../components/Validations";
import {
  CuentasQueries,
  IngresosQueries,
  EgresosQueries,
  DataBase,
} from "../../database";
import { InversionesQueries } from "../../database";
import * as Session from "../../components/Session";
import {
  formatStringToDate,
  formatDateToString,
  formatStringDateToDB,
} from "../../components/Formatters";

export default function NuevaInversionScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [dropdownData, setDropdownData] = React.useState(null);

  const [form, setForm] = React.useState({
    tipo: null,
    monto: "",
    cuenta: null,
    fechaInicio: "",
    nombre: "",
    duracion: "",
  });

  const [validations, setValidations] = React.useState({
    tipo: true,
    monto: true,
    cuenta: true,
    fechaInicio: true,
    nombre: true,
    duracion: true,
  });

  const [validationMessages, setValidationMessages] = React.useState({
    tipo: "",
    monto: "",
    cuenta: "",
    fechaInicio: "",
    nombre: "",
    duracion: "",
  });

  const handleChange = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value }));
  };

  const limpiarState = () => {
    setForm({
      tipo: null,
      monto: "",
      cuenta: null,
      fechaInicio: "",
      nombre: "",
      duracion: "",
    });

    setValidations({
      tipo: true,
      monto: true,
      cuenta: true,
      fechaInicio: true,
      nombre: true,
      duracion: true,
    });

    setValidationMessages({
      tipo: "",
      monto: "",
      cuenta: "",
      fechaInicio: "",
      nombre: "",
      duracion: "",
    });
  };

  const onConfirmar = async () => {
    const isValidForm = await validateForm();

    if (isValidForm) {
      setIsLoading(true);

      Session.getUser().then((usuario) => {
        var obj = {
          idUsuario: usuario.id,
          idTipo: form.tipo,
          idCuenta: form.cuenta,
          monto: form.monto,
          fechaInicio: formatStringDateToDB(form.fechaInicio),
          nombre: form.nombre,
          duracion: form.duracion,
        };

        var fechaVencimiento = new Date();

        if(form.tipo === "2") {
          fechaVencimiento = formatStringToDate(form.fechaInicio);
          fechaVencimiento.setDate(fechaVencimiento.getDate() + parseInt(form.duracion));

          obj.fechaVencimiento = formatStringDateToDB(formatDateToString(fechaVencimiento))
        }

        DataBase._createTransaction((tx) => {
          InversionesQueries._insertTx(
            tx,
            obj,
            () => {
              CuentasQueries._updateQuitarMonto(form.cuenta, form.monto);

              var obj_e = {
                idUsuario: usuario.id,
                fecha: formatStringDateToDB(form.fechaInicio),
                monto: form.monto,
                idTipoEgreso: 2, // Extraodinario
                detalleEgreso: "Inversion: " + form.nombre,
                idMedioPago: 4, // Debito Automatico
                idCuenta: form.cuenta,
              };

              EgresosQueries._insertTx(tx, obj_e);

              if (form.tipo === "2") {
                // Plazo fijo

                var obj_i = {
                  idUsuario: usuario.id,
                  idTipoIngreso: 2, // Extraordinario
                  idDestinoIngreso: 1,
                  idCuenta: form.cuenta,
                  fecha: obj.fechaVencimiento,
                  monto: form.monto,
                  descripcion: "Inversion: " + form.nombre,
                };

                IngresosQueries._insertTx(tx, obj_i, () => {
                  CuentasQueries._updateAgregarMonto(form.cuenta, form.monto);
                });
              }

              setIsLoading(false);
              setModalData({
                message: "La inversion se guardó correctamente.",
                isVisible: true,
                isSuccess: true,
                successBtnText: "Aceptar",
              });
            },
            (error) => {
              console.log(
                "Ocurrió un error al insertar la inversión. - " + error
              );
            }
          );
        });
      });
    }
  };

  const validateForm = async () => {
    const isTipoValid = await validateRequired(form.tipo);
    const isMontoValid = await validateRequired(form.monto);
    const isCuentaValid = await validateRequired(form.cuenta);
    const isFechaInicioValid = await validateRequired(form.fechaInicio);

    var isNombreValid = true;
    if (form.tipo !== null) {
      isNombreValid = await validateRequired(form.nombre);
    }

    var isDuracionValid = true;
    if (form.tipo === "2") {
      isDuracionValid = await validateRequired(form.duracion);
    }

    setValidations((prevState) => ({
      ...prevState,
      tipo: isTipoValid,
      monto: isMontoValid,
      cuenta: isCuentaValid,
      fechaInicio: isFechaInicioValid,
      nombre: isNombreValid,
      duracion: isDuracionValid,
    }));

    setValidationMessages((prevState) => ({
      ...prevState,
      tipo: !isTipoValid ? "Debe seleccionar un tipo..." : "",
      monto: !isMontoValid ? "El monto es requerido..." : "",
      cuenta: !isCuentaValid
        ? "Debe seleccionar una cuenta origen..."
        : "",
      fechaInicio: !isFechaInicioValid ? "La fecha es requerida..." : "",
      nombre: !isNombreValid ? "Debe ingresar un nombre a la inversión..." : "",
      duracion: !isDuracionValid ? "Debe ingresar la duración..." : "",
    }));

    return (
      isTipoValid &&
      isMontoValid &&
      isCuentaValid &&
      isFechaInicioValid &&
      isNombreValid &&
      isDuracionValid
    );
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("Inversiones", { isReload: true });
  };

  const fillDropdownData = () => {
    setIsLoading(true);

    Session.getUser().then((usuario) => {
      CuentasQueries._selectAllByIdUsuario(usuario.id, (data) => {
        var cuentas =
          data?.map((item) => {
            return {
              label: "CBU: " + item.cbu + " - " + item.descripcion,
              value: item.id.toString(),
            };
          }) ?? [];

        setDropdownData({
          cuentas: cuentas,
        });

        setIsLoading(false);
      });
    });
  };

  if (dropdownData === null && !isLoading) {
    fillDropdownData();
  }

  return (
    <ScrollView style={screenStyles.screen}>
      {dropdownData !== null && (
        <View>
          <Dropdown
            propName="tipo"
            items={tipoInversionData}
            defaultValue={form.tipo}
            placeholder="Seleccione un tipo de inversión."
            handleChange={handleChange}
            isValid={validations.tipo}
            validationMessage={validationMessages.tipo}
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
            propName="cuenta"
            items={dropdownData.cuentas}
            defaultValue={form.cuenta}
            placeholder="Seleccione un cuenta."
            handleChange={handleChange}
            isValid={validations.cuenta}
            validationMessage={validationMessages.cuenta}
          />
          <TextboxDate
            propName="fechaInicio"
            placeholder="Fecha..."
            handleChange={handleChange}
            value={form.fechaInicio}
            isValid={validations.fechaInicio}
            validationMessage={validationMessages.fechaInicio}
          />

          {form.tipo !== null && (
            <Textbox
              propName="nombre"
              placeholder={
                form.tipo === "1"
                  ? "Nombre de la acción..."
                  : form.tipo === "2"
                  ? "Nombre del plazo fijo..."
                  : form.tipo === "3"
                  ? "Nombre del fondo común..."
                  : form.tipo === "4"
                  ? "Nombre del bono..."
                  : ""
              }
              handleChange={handleChange}
              value={form.nombre}
              isValid={validations.nombre}
              validationMessage={validationMessages.nombre}
            />
          )}

          {form.tipo === "2" && (
            <Textbox
              propName="duracion"
              placeholder="Duración (30 a 365 días)..."
              handleChange={handleChange}
              value={form.duracion}
              isValid={validations.duracion}
              validationMessage={validationMessages.duracion}
              keyboardType="numeric"
            />
          )}
        </View>
      )}

      <TouchableOpacity onPress={onConfirmar} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={buttonStyles.btnBack}>
        <Text style={buttonStyles.btnBackText}>Volver</Text>
      </TouchableOpacity>

      <CustomSpinner isLoading={isLoading} text={"Guardando Inversion..."} />

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

import React from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";

import { Text, theme } from "galio-framework";
import DropDownPicker from "react-native-dropdown-picker";
import {
  Textbox,
  TextboxDate,
  Dropdown,
  CustomSpinner,
  CustomModal,
} from "../../components";

import {
  screenStyles,
  buttonStyles,
  textboxStyles,
  dropdownStyles,
} from "../../components/Styles";

import {
  formatStringToDate,
  formatDateToString,
  formatStringDateToDB,
  formatStringDateFromDB,
} from "../../components/Formatters";

import { tipoPrestamoData } from "../../components/Data";
import { destinosData } from "../../components/Data";

import { validateRequired } from "../../components/Validations";
import {
  CuentasQueries,
  IngresosQueries,
  EgresosQueries,
  DataBase,
} from "../../database";
import { PrestamosQueries } from "../../database";
import * as Session from "../../components/Session";

export default function NuevoPrestamoScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [dropdownData, setDropdownData] = React.useState(null);

  const [form, setForm] = React.useState({
    tipo: null,
    emisorDestinatario: "",
    tipoEmisorDestinatario: null,
    cuenta: null,
    monto: "",
    intereses: "",
    cuota: "",
    vencimiento: "",
  });

  const [validations, setValidations] = React.useState({
    tipo: true,
    emisorDestinatario: true,
    tipoEmisorDestinatario: true,
    cuenta: true,
    monto: true,
    intereses: true,
    cuota: true,
    vencimiento: true,
  });

  const [validationMessages, setValidationMessages] = React.useState({
    tipo: "",
    emisorDestinatario: "",
    tipoEmisorDestinatario: "",
    cuenta: "",
    monto: "",
    intereses: "",
    cuota: "",
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

  const handleChangeTipoEmisorDestinatario = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value }));
  };

  const limpiarState = () => {
    setForm({
      tipo: null,
      emisorDestinatario: "",
      tipoEmisorDestinatario: null,
      cuenta: null,
      monto: "",
      intereses: "",
      cuota: "",
      vencimiento: "",
    });

    setValidations({
      tipo: true,
      emisorDestinatario: true,
      tipoEmisorDestinatario: true,
      cuenta: true,
      monto: true,
      intereses: true,
      cuota: true,
      vencimiento: true,
    });

    setValidationMessages({
      tipo: "",
      emisorDestinatario: "",
      tipoEmisorDestinatario: "",
      cuenta: "",
      monto: "",
      intereses: "",
      cuota: "",
      vencimiento: "",
    });
  };

  const onConfirmar = async () => {
    const isValidForm = await validateForm();

    if (isValidForm) {
      setIsLoading(true);
    
      Session.getUser().then((usuario) => {
        
        console.log(form);

        var obj = {
          idUsuario: usuario.id,
          idTipo: form.tipo,
          idCuenta: form.cuenta,
          emisorDestinatario: form.emisorDestinatario,
          monto: form.monto,
          intereses: form.intereses,
          cuota: form.cuota,
          vencimiento: form.vencimiento !== null && form.vencimiento !== "" ? formatStringDateToDB(form.vencimiento) : null
        }

        DataBase._createTransaction(
          (tx) => {
            var hoy = new Date();

            if (form.tipo === "1") {
              // Realizado

              var obj_e = {
                idUsuario: usuario.id,
                fecha: formatStringDateToDB(formatDateToString(hoy)),
                monto: form.monto,
                idTipoEgreso: 2, // Extraodinario
                detalleEgreso: "Prestamo realizado",
                idCuenta: form.cuenta,
              };

              if (form.tipoEmisorDestinatario === "1") {
                // Cuenta Bancaria
                obj_e.idMedioPago = 4; // Debito Automatico
                CuentasQueries._updateQuitarMonto(form.cuenta, form.monto);
              }

              if (form.tipoEmisorDestinatario === "2") {
                obj_e.idMedioPago = 1; // Efectivo
              }

              EgresosQueries._insertTx(tx, obj_e);
              PrestamosQueries._insertTx(tx, obj);
            }

            if (form.tipo === "2") { //Tomado

              var obj_i = {
                idUsuario: usuario.id,
                idTipoIngreso: 2, // Extraordinario
                idCuenta: form.cuenta,
                fecha: formatStringDateToDB(formatDateToString(hoy)),
                monto: form.monto,
                descripcion: "Prestamo Tomado.",
              };

              var obj_e = {
                idUsuario: usuario.id,
                monto:
                  ((form.monto * form.intereses) / 100 + form.monto) /
                  form.cuota,
                idTipoEgreso: 2, // Extraodinario
                detalleEgreso: "Prestamo realizado",
                idCuenta: form.cuenta,
              };

              if (form.tipoEmisorDestinatario === "1") {
                // Cuenta Bancaria
                obj_i.idDestinoIngreso = 1;
                CuentasQueries._updateAgregarMonto(form.cuenta, form.monto);
              }

              if (form.tipoEmisorDestinatario === "2") {
                obj_i.idDestinoIngreso = 2;
              }

              for (var cuota = 1; cuota <= form.cuota; cuota++) {
                var fechaPago = new Date();
                fechaPago.setDate(
                  formatStringToDate(form.vencimiento).getDate() +
                    parseInt(30 * cuota)
                );

                obj_e.fecha = formatStringDateToDB(
                  formatDateToString(fechaPago)
                );

                if (form.tipoEmisorDestinatario === "1") {
                  obj_e.idMedioPago = 4; // Debito Automatico
                  CuentasQueries._updateQuitarMonto(
                    form.cuenta,
                    ((form.monto * form.intereses) / 100 + form.monto) /
                      form.cuota
                  );
                }

                if (form.tipoEmisorDestinatario === "2") {
                  obj_e.idMedioPago = 1; // Efectivo
                }

                EgresosQueries._insertTx(tx, obj_e);
              }

              IngresosQueries._insertTx(tx, obj_i);
              PrestamosQueries._insertTx(tx, obj);
            }

            setIsLoading(false);
            setModalData({
              message: "El prestamo se guardó correctamente.",
              isVisible: true,
              isSuccess: true,
              successBtnText: "Aceptar",
            })
          },
          (error) => {
            console.log(
              "Ocurrió un error al insertar el prestamos. - " + error
            );
          }
        );
      });
    }
  };

  const validateForm = async () => {
    const isTipoValid = await validateRequired(form.tipo);
    const isEmisorDestinatarioValid = await validateRequired(
      form.emisorDestinatario
    );
    const isTipoEmisorDestinatarioValid = await validateRequired(
      form.tipoEmisorDestinatario
    );
    const isMontoValid = await validateRequired(form.monto);
    const isCuotaValid = await validateRequired(form.cuota);
    const isInteresesValid = await validateRequired(form.intereses);

    var isVencimientoValid = true;
    if (form.tipo === "2") {
      //Tomado
      isVencimientoValid = await validateRequired(form.vencimiento);
    }
    var isCuentaValid = true;
    if (form.tipoEmisorDestinatario === "1") {
      // Cuenta Bancaria
      isCuentaValid = await validateRequired(form.cuenta);
    }

    setValidations((prevState) => ({
      ...prevState,
      tipo: isTipoValid,
      emisorDestinatario: isEmisorDestinatarioValid,
      tipoEmisorDestinatario: isTipoEmisorDestinatarioValid,
      cuenta: isCuentaValid,
      monto: isMontoValid,
      intereses: isInteresesValid,
      cuota: isCuotaValid,
      vencimiento: isVencimientoValid,
    }));

    setValidationMessages((prevState) => ({
      ...prevState,
      tipo: !isTipoValid ? "Debe seleccionar un tipo de prestamo..." : "",
      emisorDestinatario: !isEmisorDestinatarioValid
        ? "El emisor/destinatario es requerido..."
        : "",
      tipoEmisorDestinatario: !isTipoEmisorDestinatarioValid
        ? "El tipo emisor/destinatario es requerido..."
        : "",
      cuenta: !isCuentaValid ? "La cuenta es requerida..." : "",
      monto: !isMontoValid ? "El monto es requerido..." : "",
      intereses: !isInteresesValid ? "El interes es requerido..." : "",
      cuota: !isCuotaValid ? "la cuota es requerida..." : "",
      vencimiento: !isVencimientoValid ? "El vencimeinto es requerido..." : "",
    }));

    return (
      isTipoValid &&
      isEmisorDestinatarioValid &&
      isTipoEmisorDestinatarioValid &&
      isCuentaValid &&
      isMontoValid &&
      isInteresesValid &&
      isCuotaValid &&
      isVencimientoValid
    );
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("Prestamos", { isReload: true });
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
      <Dropdown
        propName="tipo"
        items={tipoPrestamoData}
        defaultValue={form.tipo}
        placeholder="Seleccione un tipo de prestamo."
        handleChange={handleChangeTipo}
        isValid={validations.tipo}
        validationMessage={validationMessages.tipo}
      />
      {form.tipo === "1" && ( // Realizado
        <Dropdown
          propName="tipoEmisorDestinatario"
          items={destinosData}
          defaultValue={form.tipoEmisorDestinatario}
          placeholder="Seleccione un origen."
          handleChange={handleChangeTipoEmisorDestinatario}
          isValid={validations.tipoEmisorDestinatario}
          validationMessage={validationMessages.tipoEmisorDestinatario}
        />
      )}
      {form.tipo === "2" && ( // Tomado
        <Dropdown
          propName="tipoEmisorDestinatario"
          items={destinosData}
          defaultValue={form.tipoEmisorDestinatario}
          placeholder="Seleccione un destino."
          handleChange={handleChangeTipoEmisorDestinatario}
          isValid={validations.tipoEmisorDestinatario}
          validationMessage={validationMessages.tipoEmisorDestinatario}
        />
      )}
      {form.tipoEmisorDestinatario === "1" && (
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
        placeholder="Monto total..."
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
      <Textbox
        propName="cuota"
        placeholder="Cuotas..."
        handleChange={handleChange}
        value={form.cuota}
        isValid={validations.cuota}
        validationMessage={validationMessages.cuota}
        keyboardType="numeric"
      />
      {form.tipo === "2" && (
        <TextboxDate
          propName="vencimiento"
          placeholder="Fecha de Vencimiento..."
          handleChange={handleChange}
          value={form.vencimiento}
          isValid={validations.vencimiento}
          validationMessage={validationMessages.vencimiento}
        />
      )}

      <TouchableOpacity onPress={onConfirmar} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={buttonStyles.btnBack}>
        <Text style={buttonStyles.btnBackText}>Volver</Text>
      </TouchableOpacity>

      <CustomSpinner isLoading={isLoading} text={"Cargando..."} />

      <CustomModal
        title={modalData?.title}
        message={modalData?.message}
        isSuccess={modalData?.isSuccess}
        isVisible={modalData?.isVisible}
        handleBtnOnSuccess={onBack}
        handleBtnOnError={modalData?.handleBtnOnError}
        successBtnText={modalData?.successBtnText}
        errorBtnText={modalData?.errorBtnText}
        showErrorBtn={modalData?.showErrorBtn}
      />
    </ScrollView>
  );
}

import React from "react";

import { ScrollView, Text, TouchableOpacity } from "react-native";

import { screenStyles, buttonStyles } from "../../components/Styles";

import { CustomSpinner, CustomModal } from "../../components";

import {
  IngresosQueries,
  EgresosQueries,
  CuentasQueries,
  TarjetasQueries,
  PrestamosQueries,
  PresupuestosQueries,
  InversionesQueries,
  DataBase
} from "../../database";

import { formatBackupDate } from "../../components/Formatters";

import {
  deleteByIdUsuario,
  backup,
  getByIdUsuario,
} from "../../services/backupServices";

import * as Session from "../../components/Session";

export default function BackupScreen({ route, navigation }) {
  /* State del CustomSpinner */
  const [isLoading, setIsLoading] = React.useState(false);

  /* State del CustomModal */
  const [modalData, setModalData] = React.useState(null);

  const onCancelar = () => setModalData({ ...modalData, isVisible: false });

  const onBackup = (id) => {
    setModalData({
      title: "Backup",
      message: "¿Está seguro de que desea guardar sus datos en la nube?",
      handleBtnOnSuccess: () => onConfirmarBackup(id),
      handleBtnOnError: () => onCancelar(),
      showErrorBtn: true,
      isVisible: true,
    });
  };

  const onConfirmarBackup = () => {
    setIsLoading(true);

    //obtengo el usuario de la sesión
    Session.getUser().then((usuario) => {
      var idUsuario = usuario.id;

      //Borro en el back todo lo asociado al usuario
      deleteByIdUsuario({ idUsuario: idUsuario })
        .then(() => {
          var promises = [
            IngresosQueries._selectAllByIdUsuarioPromise(idUsuario),
            EgresosQueries._selectAllByIdUsuarioPromise(idUsuario),
            CuentasQueries._selectAllByIdUsuarioPromise(idUsuario),
            TarjetasQueries._selectAllByIdUsuarioPromise(idUsuario),
            PrestamosQueries._selectAllByIdUsuarioPromise(idUsuario),
            PresupuestosQueries._selectAllByIdUsuarioPromise(idUsuario),
            InversionesQueries._selectAllByIdUsuarioPromise(idUsuario),
          ];

          console.log(promises);

          Promise.all(promises)
            .then((data) => {

              console.log(data);

              var request = {
                ingresos:
                  data[0]?.map((item) => {
                    return {
                      idUsuario: idUsuario,
                      idTipoIngreso: item.idTipoIngreso,
                      idDestinoIngreso: item.idTipoIngreso,
                      idCategoriaIngreso: item.idCategoriaIngreso,
                      idCuenta: item.idCuenta,
                      fecha: item.fecha,
                      monto: item.monto,
                      descripcion: item.descripcion,
                    };
                  }) ?? [],

                egresos:
                  data[1]?.map((item) => {
                    return {
                      idUsuario: idUsuario,
                      idTipoEgreso: item.idTipoEgreso,
                      idCategoriaEgreso: item.idCategoriaEgreso,
                      idMedioPago: item.idMedioPago,
                      idTarjeta: item.idTarjeta,
                      idCuenta: item.idCuenta,
                      fecha: item.fecha,
                      monto: item.monto,
                      detalleEgreso: item.detalleEgreso,
                      cuotas: item.cuotas,
                      nroCuota: item.nroCuota,
                      proxVencimiento: item.proxVencimiento,
                    };
                  }) ?? [],

                cuentas:
                  data[2]?.map((item) => {
                    return {
                      idUsuario: idUsuario,
                      idBanco: item.idBanco,
                      idEntidadEmisora: item.idEntidadEmisora,
                      cbu: item.cbu,
                      alias: item.alias,
                      descripcion: item.descripcion,
                      vencimiento: item.vencimiento,
                      monto: item.monto,
                      tarjeta: item.tarjeta,
                    };
                  }) ?? [],

                tarjetas:
                  data[3]?.map((item) => {
                    return {
                      idUsuario: idUsuario,
                      idBanco: item.idBanco,
                      idEntidadEmisora: item.idEntidadEmisora,
                      tarjeta: item.tarjeta,
                      vencimiento: item.vencimiento,
                      cierreResumen: item.cierreResumen,
                      vencimientoResumen: item.vencimientoResumen,
                    };
                  }) ?? [],

                prestamos:
                  data[4]?.map((item) => {
                    return {
                      idUsuario: idUsuario,
                      idTipo: item.idTipo,
                      idCuenta: item.idCuenta,
                      emisorDesinatario: item.emisorDesinatario,
                      intereses: item.intereses,
                      monto: item.monto,
                      cuota: item.cuota,
                      vencimiento: item.vencimiento,
                    };
                  }) ?? [],

                presupuestos:
                  data[5].map((item) => {
                    return {
                      idUsuario: idUsuario,
                      idCategoriaEgreso: item.idCategoriaEgreso,
                      fechaInicio: item.fechaInicio,
                      monto: item.monto,
                    };
                  }) ?? [],

                inversiones:
                  data[6]?.map((item) => {
                    return {
                      idUsuario: idUsuario,
                      idTipo: item.idTipo,
                      idCuenta: item.idCuenta,
                      tarjeta: item.tarjeta,
                      fechaInicio: item.fechaInicio,
                      fechaVencimiento: item.fechaVencimiento,
                      monto: item.monto,
                      nombre: item.nombre,
                      duracion: item.duracion,
                    };
                  }) ?? [],
              };

              backup(request)
                .then((data) => {
                  setModalData({
                    message: "La información se sincronizó correctamente!",
                    isVisible: true,
                    isSuccess: true,
                    successBtnText: "Aceptar",
                    handleBtnOnSuccess : () => onCancelar(),
                    showErrorBtn: false,
                  });
                  setIsLoading(false);
                })
                .catch((error) => {
                  setIsLoading(false);
                  console.log(error);
                });
            })
            .catch((error) => {
              setIsLoading(false);
              console.log(error);
            });
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    });
  };

  const onGetBackup = (id) => {
    setModalData({
      title: "Backup",
      message:
        "¿Está seguro de que desea actualzar sus datos con los de la nube?. Aquellos datos que no estén subidos se perderán.",
      handleBtnOnSuccess: () => onConfirmarGetBackup(id),
      handleBtnOnError: () => onCancelar(),
      showErrorBtn: true,
      isVisible: true,
    });
  };

  const onConfirmarGetBackup = () => {
    setIsLoading(true);

    //obtengo el usuario de la sesión
    Session.getUser()
      .then((usuario) => {
        
        var idUsuario = usuario.id;

        getByIdUsuario({ idUsuario: idUsuario }).then((data) => {
          
          var deletePromises = [
            IngresosQueries._deleteAllByIdUsuarioPromise(idUsuario),
            EgresosQueries._deleteAllByIdUsuarioPromise(idUsuario),
            CuentasQueries._deleteAllByIdUsuarioPromise(idUsuario),
            TarjetasQueries._deleteAllByIdUsuarioPromise(idUsuario),
            InversionesQueries._deleteAllByIdUsuarioPromise(idUsuario),
            PrestamosQueries._deleteAllByIdUsuarioPromise(idUsuario),
            PresupuestosQueries._deleteAllByIdUsuarioPromise(idUsuario)
          ];

          Promise.all(deletePromises).then(() => {
          
            var promises = [];

            DataBase._createTransaction((tx) => {

              data.data.ingresos?.map((item) => {
                promises.push(
                  IngresosQueries._insertPromise(tx, {
                    idUsuario: idUsuario,
                    idTipoIngreso: item.idTipoIngreso,
                    idCategoriaIngreso: item.idCategoriaIngreso,
                    idDestinoIngreso: item.idDestinoIngreso,
                    idCuenta: item.idCuenta,
                    fecha: item.fecha !== null && item.fecha !== "" ? formatBackupDate(item.fecha) : null,
                    monto: item.monto,
                    descripcion: item.descripcion,
                  })
                );
              });
    
              data.data.egresos?.map((item) => {
                promises.push(
                  EgresosQueries._insertPromise(tx, {
                    idUsuario: idUsuario,
                    fecha: item.fecha !== null && item.fecha !== "" ? formatBackupDate(item.fecha) : null,
                    monto: item.monto,
                    idTipoEgreso: item.idTipoEgreso,
                    idCategoriaEgreso: item.idCategoriaEgreso,
                    detalleEgreso: item.detalleEgreso,
                    idMedioPago: item.idMedioPago,
                    cuotas: item.cuotas,
                    idCuenta: item.idCuenta,
                    idTarjeta: item.idTarjeta,
                  })
                );
              });
    
              data.data.cuentas?.map((item) => {
                promises.push(
                  CuentasQueries._insertPromise(tx, {
                    idUsuario: idUsuario,
                    idBanco: item.idBanco,
                    idEntidadEmisora:item.idEntidadEmisora,
                    cbu:item.cbu,
                    alias:item.alias,
                    descripcion:item.descripcion,
                    monto: item.monto,
                    tarjeta: item.tarjeta,
                    vencimiento: item.vencimiento !== null && item.vencimiento !== "" ? formatBackupDate(item.vencimiento) : null,
                  })
                );
              });
  
              data.data.tarjetas?.map((item) => {
                promises.push(
                  TarjetasQueries._insertPromise(tx, {
                    idUsuario: idUsuario,
                    idBanco: item.idBanco,
                    idEntidadEmisora: item.idEntidadEmisora,
                    tarjeta: item.tarjeta,
                    vencimiento: item.vencimiento !== null && item.vencimiento !== "" ? formatBackupDate(item.vencimiento) : null,
                    cierreResumen: item.cierreResumen !== null && item.cierreResumen !== "" ? formatBackupDate(item.cierreResumen) : null,
                    vencimientoResumen: item.vencimientoResumen !== null && item.vencimientoResumen !== "" ? formatBackupDate(item.vencimientoResumen) : null
                  })
                );
              });
  
              data.data.prestamos?.map((item) => {
                promises.push(
                  PrestamosQueries._insertPromise(tx, {
                    idUsuario: idUsuario,
                    idTipo: item.idTipo,
                    idCuenta: item.idCuenta,
                    emisorDestinatario: item.emisorDestinatario,
                    monto: item.monto,
                    intereses: item.intereses,
                    cuota: item.cuota,
                    vencimiento: item.vencimiento !== null && item.vencimiento !== "" ? formatBackupDate(item.vencimiento) : null
                  })
                );
              });
  
              data.data.presupuestos?.map((item) => {
                promises.push(
                  PresupuestosQueries._insertPromise(tx, {
                    idUsuario: idUsuario,
                    fechaInicio: item.fechaInicio !== null && item.fechaInicio !== "" ? formatBackupDate(item.fechaInicio) : null,
                    monto: item.monto,
                    idCategoriaEgreso: item.idCategoriaEgreso,
                  })
                );
              });
  
              data.data.inversiones?.map((item) => {
                promises.push(
                  InversionesQueries._insertPromise(tx, {
                    idUsuario: idUsuario,
                    idTipo: item.idTipo,
                    idCuenta: item.idCuenta,
                    monto: item.monto,
                    fechaInicio: item.fechaInicio !== null && item.fechaInicio !== "" ? formatBackupDate(item.fechaInicio) : null,
                    nombre: item.nombre,
                    duracion: item.duracion
                  })
                );
              });
  
            });
  
            Promise.all(promises)
              .then((data) => {
                
                setModalData({
                  message: "La información se sincronizó correctamente!",
                  isVisible: true,
                  isSuccess: true,
                  successBtnText: "Aceptar",
                  handleBtnOnSuccess : () => onCancelar(),
                  showErrorBtn: false,
                });

                setIsLoading(false);
              })
              .catch((error) => {
                setIsLoading(false);
                console.log(error);
              });

          })
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <ScrollView style={screenStyles.screen}>
      <TouchableOpacity onPress={onBackup} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Enviar mis datos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onGetBackup} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Recuperar mis datos</Text>
      </TouchableOpacity>

      <CustomSpinner isLoading={isLoading} text={"Cargando..."} />

      <CustomModal
        title={modalData?.title}
        message={modalData?.message}
        isSuccess={modalData?.isSuccess}
        isVisible={modalData?.isVisible}
        handleBtnOnSuccess={modalData?.handleBtnOnSuccess}
        handleBtnOnError={modalData?.handleBtnOnError}
        successBtnText={modalData?.successBtnText}
        errorBtnText={modalData?.errorBtnText}
        showErrorBtn={modalData?.showErrorBtn}
      />
    </ScrollView>
  );
}

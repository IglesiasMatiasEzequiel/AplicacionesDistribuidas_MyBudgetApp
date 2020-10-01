import React from "react";

import { ScrollView, View, Text, TouchableOpacity } from "react-native";

import { Table, TableWrapper, Row, Cell } from "react-native-table-component";

import {
  screenStyles,
  buttonStyles,
  tableStyles,
  titleStyles,
} from "../../components/Styles";

import {
  CustomSpinner,
  CustomModal,
  CustomIcon,
  Alert,
} from "../../components";

import {
  IngresosQueries,
  EgresosQueries,
  CuentasQueries,
  TarjetasQueries,
  PrestamosQueries,
  PresupuestosQueries,
  InversionesQueries,
} from "../../database";

import { formatStringDateFromDB } from "../../components/Formatters";

import {
  deleteByIdUsuario,
  backup,
  backupPresupuesto,
} from "../../services/backupServices";

import * as Session from "../../components/Session";

export default function TarjetasScreen({ route, navigation }) {
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
    Session.getUser()
      .then((usuario) => {
        
        var idUsuario = usuario.id;

        //Borro en el back todo lo asociado al usuario
        deleteByIdUsuario({ idUsuario: idUsuario }).then(() => {
          var request = {
            ingresos: [],
            egresos: [],
            cuentas: [],
            tarjetas: [],
            inversiones: [],
            prestamos: [],
            presupuestos: [],
          };

          //hago el backup
          IngresosQueries._selectAllByIdUsuario(idUsuario, (ingresos) => {
            request.ingresos =
              ingresos?.map((item) => {
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
              }) ?? [];

            EgresosQueries._selectAllByIdUsuario(idUsuario, (egresos) => {
              request.egresos =
                egresos?.map((item) => {
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
                }) ?? [];

              CuentasQueries._selectAllByIdUsuario(idUsuario, (cuentas) => {
                request.cuentas =
                  cuentas?.map((item) => {
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
                  }) ?? [];

                TarjetasQueries._selectAllByIdUsuario(idUsuario, (tarjetas) => {
                  request.tarjetas =
                    tarjetas?.map((item) => {
                      return {
                        idUsuario: idUsuario,
                        idBanco: item.idBanco,
                        idEntidadEmisora: item.idEntidadEmisora,
                        tarjeta: item.tarjeta,
                        vencimiento: item.vencimiento,
                        cierreResumen: item.cierreResumen,
                        vencimientoResumen: item.vencimientoResumen,
                      };
                    }) ?? [];

                    backup(request)
                                .then((data) => {
                                  console.log(data);
                                })
                                .catch((error) => {
                                  console.log(error);
                                });

                  // InversionesQueries._selectAllByIdUsuario(
                  //   idUsuario,
                  //   (inversiones) => {
                  //     request.inversiones =
                  //       inversiones?.map((item) => {
                  //         return {
                  //           idUsuario: idUsuario,
                  //           idTipo: item.idTipo,
                  //           idCuenta: item.idCuenta,
                  //           tarjeta: item.tarjeta,
                  //           fechaInicio: item.fechaInicio,
                  //           fechaVencimiento: item.fechaVencimiento,
                  //           monto: item.monto,
                  //           nombre: item.nombre,
                  //           duracion: item.duracion,
                  //         };
                  //       }) ?? [];

                  //     PrestamosQueries._selectAllByIdUsuario(
                  //       idUsuario,
                  //       (prestamos) => {
                  //         request.prestamos =
                  //           prestamos?.map((item) => {
                  //             return {
                  //               idUsuario: idUsuario,
                  //               idTipo: item.idTipo,
                  //               idCuenta: item.idCuenta,
                  //               emisorDesinatario: item.emisorDesinatario,
                  //               intereses: item.intereses,
                  //               monto: item.monto,
                  //               cuota: item.cuota,
                  //               vencimiento: item.vencimiento,
                  //             };
                  //           }) ?? [];

                  //         PresupuestosQueries._selectAllByIdUsuario(
                  //           idUsuario,
                  //           (presupuestos) => {
                  //             request.presupuestos =
                  //               presupuestos.map((item) => {
                  //                 return {
                  //                   idUsuario: idUsuario,
                  //                   idCategoriaEgreso: item.idCategoriaEgreso,
                  //                   fechaInicio: item.fechaInicio,
                  //                   monto: item.monto,
                  //                 };
                  //               }) ?? [];

                  //             setIsLoading(false);

                  //             backup(request)
                  //               .then((data) => {
                  //                 console.log(data);
                  //               })
                  //               .catch((error) => {
                  //                 console.log(error);
                  //               });
                  //           }
                  //         );
                  //       }
                  //     );
                  //   }
                  // );
                });
              });
            });
          });
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
        <Text style={buttonStyles.btnText}>Subir info</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBackup} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Traer info</Text>
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

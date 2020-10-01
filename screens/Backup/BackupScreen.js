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
} from "../../database";

import { formatBackupDate } from '../../components/Formatters'

import { deleteByIdUsuario, backup, getByIdUsuario } from "../../services/backupServices";

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
    Session.getUser().then((usuario) => {
      var idUsuario = usuario.id;

      //Borro en el back todo lo asociado al usuario
      deleteByIdUsuario({ idUsuario: idUsuario })
        .then(() => {
          var request = {
            ingresos: [],
            egresos: [],
            cuentas: [],
            tarjetas: [],
            prestamos: [],
            presupuestos: [],
            inversiones: [],
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

                  InversionesQueries._selectAllByIdUsuario(
                    idUsuario,
                    (inversiones) => {
                      request.inversiones =
                        inversiones?.map((item) => {
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
                        }) ?? [];

                      PrestamosQueries._selectAllByIdUsuario(
                        idUsuario,
                        (prestamos) => {
                          request.prestamos =
                            prestamos?.map((item) => {
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
                            }) ?? [];

                          PresupuestosQueries._selectAllByIdUsuario(
                            idUsuario,
                            (presupuestos) => {
                              request.presupuestos =
                                presupuestos.map((item) => {
                                  return {
                                    idUsuario: idUsuario,
                                    idCategoriaEgreso: item.idCategoriaEgreso,
                                    fechaInicio: item.fechaInicio,
                                    monto: item.monto,
                                  };
                                }) ?? [];

                              backup(request)
                                .then((data) => {
                                  setIsLoading(false);
                                  console.log(data);
                                })
                                .catch((error) => {
                                  setIsLoading(false);
                                  console.log(error);
                                });
                            }
                          );
                        }
                      );
                    }
                  );
                });
              });
            });
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
      message: "¿Está seguro de que desea actualzar sus datos con los de la nube?. Aquellos datos que no estén subidos se perderán.",
      handleBtnOnSuccess: () => onConfirmarGetBackup(id),
      handleBtnOnError: () => onCancelar(),
      showErrorBtn: true,
      isVisible: true,
    });
  };

  const onConfirmarGetBackup = () => {
    setIsLoading(true);

    //obtengo el usuario de la sesión
    Session.getUser().then((usuario) => {
      var idUsuario = usuario.id;

      getByIdUsuario({ idUsuario: idUsuario })
        .then((data) => {
          
          data.data.ingresos.map((item) => {
            IngresosQueries._insert({
              idUsuario: idUsuario,
              idTipoIngreso: item.idTipoIngreso,
              idCategoriaIngreso: item.idCategoriaIngreso,
              idDestinoIngreso: item.idDestinoIngreso,
              idCuenta: item.idCuenta,
              fecha: formatBackupDate(item.fecha),
              monto: item.monto,
              descripcion: item.descripcion
            });
          });

          data.data.egresos.map((item) => {
            EgresosQueries._insert({
              idUsuario: idUsuario,
              fecha: formatBackupDate(item.fecha),
              monto: item.monto,
              idTipoEgreso: item.idTipoEgreso,
              idCategoriaEgreso: item.idCategoriaEgreso,
              detalleEgreso: item.detalleEgreso,
              idMedioPago: item.idMedioPago,
              cuotas: item.cuotas,
              idCuenta: item.idCuenta,
              idTarjeta: item.idTarjeta,
            });
          });

          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
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

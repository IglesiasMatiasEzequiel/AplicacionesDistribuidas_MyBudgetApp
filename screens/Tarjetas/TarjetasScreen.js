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

import { TarjetasQueries } from "../../database";

import { formatStringDateFromDB } from "../../components/Formatters";

import * as Session from "../../components/Session";

export default function TarjetasScreen({ route, navigation }) {
  /* State del CustomSpinner */
  const [isLoading, setIsLoading] = React.useState(false);

  /* State del CustomModal */
  const [modalData, setModalData] = React.useState(null);

  /* State del Listado */
  const [listado, setListado] = React.useState({
    data: null,
    isLoading: false,
  });

  const limpiarState = () => {
    setListado({
      data: null,
      isLoading: false,
    });
  };

  const onCancelar = () => setModalData({ ...modalData, isVisible: false });

  const onNuevo = () => {
    limpiarState();
    navigation.navigate("NuevaTarjeta");
  };

  const onVerGastos = () => {
    limpiarState();
    navigation.navigate("GastosTarjeta");
  };

  const onBorrar = (id) => {
    setModalData({
      title: "Eliminar tarjeta",
      message:
        "¿Está seguro de que desea eliminar la tarjeta?. Se borrarán todos los egresos asociados a ella.",
      handleBtnOnSuccess: () => onConfirmarBorrar(id),
      handleBtnOnError: () => onCancelar(),
      showErrorBtn: true,
      isVisible: true,
    });
  };

  const onConfirmarBorrar = (id) => {
    setIsLoading(true);

    CuentasQueries._deleteById(
      id,
      () => {
        setIsLoading(false);
        setModalData({
          title: "¡Borrado exitoso!",
          message: "La cuenta se eliminó correctamente.",
          isVisible: true,
          isSuccess: true,
          handleBtnOnSuccess: () => {
            limpiarState();
            onCancelar();
          },
          successBtnText: "Volver",
          showErrorBtn: false,
        });
      },
      (error) => {
        setListado((prevState) => ({
          ...prevState,
          data: [],
          isLoading: false,
        }));

        console.log(error);
      }
    );
  };

  const tableHeaders = [
    "",
    "Nro",
    "Banco",
    "E. Emisora",
    "F. Venc.",
    "F. Cierre Resúmen",
    "F. Venc. Resúmen",
  ];

  const columnWidth = [30, 250, 250, 200, 150, 150, 150];

  const deleteButton = (data, index) => (
    <TouchableOpacity onPress={() => onBorrar(data)}>
      <View style={buttonStyles.btnTableDelete}>
        <CustomIcon name="md-trash" size={22} />
      </View>
    </TouchableOpacity>
  );

  const getListado = () => {
    setListado((prevState) => ({ ...prevState, isLoading: true }));

    Session.getUser().then((usuario) => {
      TarjetasQueries._getListado(
        usuario.id,
        (data) => {
          var tableData =
            data?.map((item) => {
              return [
                item.id,
                "**** **** **** " + item.tarjeta,
                item.banco,
                item.entidadEmisora,
                formatStringDateFromDB(item.vencimiento),
                formatStringDateFromDB(item.cierreResumen),
                formatStringDateFromDB(item.vencimientoResumen),
              ];
            }) ?? [];

          setListado((prevState) => ({
            ...prevState,
            data: tableData,
            isLoading: false,
          }));
        },
        (error) => {
          setListado((prevState) => ({
            ...prevState,
            data: [],
            isLoading: false,
          }));

          console.log(error);
        }
      );
    });
  };

  if (
    (listado.data === null || (route?.params?.isReload ?? false)) &&
    !listado.isLoading
  ) {
    /* Se vuelve a setear el isReload para que no siga actualizando el listado*/
    navigation.setParams({ isReload: false });

    getListado();
  }

  return (
    <ScrollView style={screenStyles.screen}>
      <TouchableOpacity onPress={onNuevo} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Nueva Tarjeta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onVerGastos} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Ver Gastos</Text>
      </TouchableOpacity>

      {!listado.isLoading && (
        <View>
          <View
            style={[screenStyles.containerDivider, titleStyles.titleContainer]}
          >
            <Text h5 style={titleStyles.titleText}>
              Mis Tarjetas
            </Text>
          </View>

          {listado.data !== null && listado.data.length > 0 && (
            <View style={tableStyles.tableContainer}>
              <ScrollView horizontal>
                <View>
                  <Table borderStyle={tableStyles.tableHeaderBorder}>
                    <Row
                      data={tableHeaders}
                      widthArr={columnWidth}
                      style={tableStyles.tableHeader}
                      textStyle={tableStyles.tableHeadertext}
                    />
                  </Table>
                  <ScrollView
                    style={[tableStyles.tableDataContainer, { height: 200 }]}
                  >
                    <Table borderStyle={tableStyles.tableDataBorder}>
                      {listado.data.map((rowData, index) => (
                        <TableWrapper
                          key={index}
                          style={[
                            tableStyles.tableRow,
                            index % 2 && { backgroundColor: "transparent" },
                          ]}
                        >
                          {rowData.map((cellData, cellIndex) => (
                            <Cell
                              key={cellIndex.toString()}
                              width={columnWidth[cellIndex]}
                              data={
                                cellIndex === 0
                                  ? deleteButton(cellData, index)
                                  : cellData
                              }
                              textStyle={tableStyles.tableRowtext}
                            />
                          ))}
                        </TableWrapper>
                      ))}
                    </Table>
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
          )}

          {(listado.data === null || listado.data.length === 0) && (
            <Alert type="danger" message="Sin información" />
          )}
        </View>
      )}

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

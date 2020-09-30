import React from "react";

import { ScrollView, View, Text, TouchableOpacity } from "react-native";

import { Table, Row, TableWrapper, Cell } from "react-native-table-component";

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

import { PrestamosQueries } from "../../database";
import * as Session from "../../components/Session";

export default function PrestamosScreen({ route, navigation }) {
  /* State del CustomSpinner */
  const [isLoading, setIsLoading] = React.useState(false);

  /* State del CustomModal */
  const [modalData, setModalData] = React.useState(null);

  /* State del Listado */
  const [listado, setListado] = React.useState({
    data: null,
    isLoading: false,
    periodo: null,
  });

  const limpiarState = () => {
    setListado({
      data: null,
      isLoading: false,
      periodo: null,
    });
  };

  /* Botón Nuevo*/

  const onNuevo = () => {
    limpiarState();
    navigation.navigate("NuevoPrestamo");
  };

  /* Botón Nuevo*/

  /* Botón borrar */

  const onCancelar = () => setModalData({ ...modalData, isVisible: false });

  const onBorrar = (id) => {
    setModalData({
      title: "Eliminar ingreso",
      message: "¿Está seguro de que desea eliminar el prestamo?",
      handleBtnOnSuccess: () => onConfirmarBorrar(id),
      handleBtnOnError: () => onCancelar(),
      showErrorBtn: true,
      isVisible: true,
    });
  };

  const onConfirmarBorrar = (id) => {
    setIsLoading(true);

    PrestamosQueries._deleteById(
      id,
      () => {
        setIsLoading(false);
        setModalData({
          title: "¡Borrado exitoso!",
          message: "El prestamos se eliminó correctamente.",
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

  const deleteButton = (data, index) => (
    <TouchableOpacity onPress={() => onBorrar(data)}>
      <View style={buttonStyles.btnTable}>
        <CustomIcon name="md-trash" size={22} />
      </View>
    </TouchableOpacity>
  );

  /* Botón borrar */

  /* Listado */

  const tableHeaders = [
    "",
    "Tipo",
    "Emisor/Destinatario",
    "Monto",
    "Intereses",
    "Cuota",
    "Vencimiento",
  ];
  const columnWidth = [30, 120, 200, 100, 100, 100, 110];

  const getListado = () => {
    setListado((prevState) => ({ ...prevState, isLoading: true }));

    Session.getUser().then((usuario) => {
      PrestamosQueries._getListado(
        usuario.id,
        (data) => {
          var tableData =
            data?.map((item) => {
              return [
                item.id,
                item.tipoPrestamo,
                item.emisorDestinatario,
                item.monto,
                item.intereses,
                item.cuota,
                item.vencimiento,
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

  /* Listado */

  return (
    <ScrollView style={screenStyles.screen}>
      <TouchableOpacity onPress={onNuevo} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Nuevo Prestamos</Text>
      </TouchableOpacity>

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Mis Prestamos
        </Text>
      </View>

      {!listado.isLoading && (
        <View>
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

      <CustomSpinner isLoading={isLoading} text={"Eliminando..."} />

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

import React from "react";

import { 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity 
} from "react-native";

import { 
  Table, 
  TableWrapper,
  Row,   
  Cell 
} from "react-native-table-component";

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
   CuentasQueries 
} from "../../database";

import { 
  formatStringDateFromDB
} from "../../components/Formatters";

import * as Session from "../../components/Session";

export default function CuentasBancariasScreen({ route, navigation }) {
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
    navigation.navigate("NuevaCuenta");
  };

  const onAdministrarCuenta = () => {
    limpiarState();
    navigation.navigate("AdministrarCuenta");
  };

  const onMovimientosCuenta = () => {
    limpiarState();
    navigation.navigate("MovimientosCuenta");
  };

  const onEditar = (id) => {
    limpiarState();
    navigation.navigate("EditarCuenta", { id: id });
  };

  const onBorrar = (id) => {
    setModalData({
      title: "Eliminar cuenta",
      message:
        "¿Está seguro de que desea eliminar la cuenta?. Se borrarán todos los ingresos y egresos asociados a ella.",
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

  /* Listado */

  const tableHeaders = [
    "",
    "",
    "CBU",
    "Alias",
    "Descripción",
    "Monto",
    "Banco",
    "Emisora",
    "Tarjeta",
    "Vencimiento",
  ];
  const columnWidth = [30, 30, 250, 250, 250, 150, 250, 200, 200, 150];

  const editButton = (data, index) => (
    <TouchableOpacity onPress={() => onEditar(data)}>
      <View style={buttonStyles.btnTableEdit}>
        <CustomIcon name="md-create" size={22} />
      </View>
    </TouchableOpacity>
  );

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
      CuentasQueries._getListado(
        usuario.id,
        (data) => {
          var tableData =
            data?.map((item) => {
              return [
                item.id,
                item.id,
                item.cbu,
                item.alias,
                item.descripcion ?? "-",
                "$" + item.monto,
                item.banco,
                item.entidadEmisora,
                "**** **** **** " + item.tarjeta,
                formatStringDateFromDB(item.vencimiento),
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
        <Text style={buttonStyles.btnText}>Nueva Cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onMovimientosCuenta} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Ver Movimiento Cuentas</Text>
      </TouchableOpacity>

      {!listado.isLoading && (
        <View>
          <View
            style={[screenStyles.containerDivider, titleStyles.titleContainer]}
          >
            <Text h5 style={titleStyles.titleText}>
              Mis Cuentas
            </Text>
          </View>

          <View style={tableStyles.tableContainer}>
            <ScrollView horizontal>
              {listado.data !== null && listado.data.length > 0 && (
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
                                cellIndex === 0 ? deleteButton(cellData, index)
                              : cellIndex === 1 ? editButton(cellData, index)
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
              )}

              {(listado.data === null || listado.data.length === 0) && (
                <Alert type="danger" message="Sin información" />
              )}
            </ScrollView>
          </View>
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

import React from "react";

import { ScrollView, View, Text } from "react-native";

import { Table, Row, TableWrapper, Cell } from "react-native-table-component";

import {
  screenStyles,
  tableStyles,
  titleStyles,
  buttonStyles,
} from "../../components/Styles";

import { periodosData } from "../../components/Data";

import { CustomSpinner, CustomIcon, Alert, Dropdown } from "../../components";

import {
  formatDateToString,
  formatStringDateToDB,
  formatStringDateFromDB,
} from "../../components/Formatters";

import { CuentasQueries } from "../../database";
import * as Session from "../../components/Session";

export default function MovimientoCuenta({ route, navigation }) {
  /* State del CustomSpinner */
  const [isLoading, setIsLoading] = React.useState(false);

  const [dropdownData, setDropdownData] = React.useState(null);

  /* State del Listado */
  const [listado, setListado] = React.useState({
    data: null,
    isLoading: false,
    cuenta: null,
    periodo: null,
  });

  const handleChangeCuenta = (prop, value) => {
    setListado((prevState) => ({
      ...prevState,
      data: null,
      isLoading: false,
      cuenta: value,
      periodo: null,
    }));
  };

  const handleChangePeriodo = (prop, value) => {
    setListado((prevState) => ({
      ...prevState,
      data: null,
      isLoading: false,
      periodo: value,
    }));
    getListado();
  };

  const renderStatusIcon = (tipoRegistro, index) => (
    <View
      style={
        tipoRegistro === 1
          ? buttonStyles.btnTableSuccess
          : buttonStyles.btnTableDelete
      }
    >
      <CustomIcon name={tipoRegistro === 1 ? "md-redo" : "md-undo"} size={22} />
    </View>
  );

  /* Botón borrar */

  /* Listado */

  const tableHeaders = [
    "",
    "Fecha",
    "Monto",
    "Descripcion",
    "Tipo",
    "Categoría",
  ];
  const columnWidth = [30, 120, 150, 300, 300, 150];

  const getListado = () => {
    setListado((prevState) => ({ ...prevState, isLoading: true }));

    var substractDays =
      listado.periodo === "1"
        ? 7
        : listado.periodo === "2"
        ? 30
        : listado.periodo === "3"
        ? 365
        : 7;

    var to = new Date();
    var from = new Date();

    from.setDate(from.getDate() - substractDays);

    var toFormatted = formatStringDateToDB(formatDateToString(to));
    var fromFormatted = formatStringDateToDB(formatDateToString(from));

    Session.getUser().then((usuario) => {
      CuentasQueries._getMovimientos(
        usuario.id,
        listado.cuenta,
        fromFormatted,
        toFormatted,
        (data) => {
          var tableData =
            data?.map((item) => {
              return [
                item.tipoRegistro,
                formatStringDateFromDB(item.fecha),
                "$ " + parseFloat(item.monto).toFixed(2),
                item.descripcion ?? "-",
                item.tipo,
                item.categoria ?? "-",
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

  const fillDropdownData = () => {
    setIsLoading(true);

    Session.getUser().then((usuario) => {
      CuentasQueries._getListado(usuario.id, (data) => {
        var cuentas =
          data?.map((item) => {
            return {
              label: item.banco + " - " + item.cbu,
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
          <View
            style={[screenStyles.containerDivider, titleStyles.titleContainer]}
          >
            <Text h5 style={titleStyles.titleText}>
              Filtros
            </Text>
          </View>

          <Dropdown
            propName="tarjeta"
            items={dropdownData.cuentas}
            defaultValue={listado.cuenta}
            placeholder="Seleccione una cuenta."
            handleChange={handleChangeCuenta}
          />

          <Dropdown
            propName="periodo"
            items={periodosData}
            defaultValue={listado.periodo}
            placeholder="Seleccione un periodo."
            handleChange={handleChangePeriodo}
          />

          {!listado.isLoading && (
            <View>
              <View
                style={[
                  screenStyles.containerDivider,
                  titleStyles.titleContainer,
                ]}
              >
                <Text h5 style={titleStyles.titleText}>
                  Movimientos
                  {listado.periodo === "1"
                    ? " de la semana"
                    : listado.periodo === "2"
                    ? " del mes"
                    : listado.periodo === "3"
                    ? " del año"
                    : ""}
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
                        style={[
                          tableStyles.tableDataContainer,
                          { height: 200 },
                        ]}
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
                                      ? renderStatusIcon(cellData, index)
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
        </View>
      )}

      <CustomSpinner isLoading={isLoading} text={"Cargando..."} />
    </ScrollView>
  );
}

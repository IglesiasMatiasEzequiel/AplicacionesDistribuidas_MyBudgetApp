import React from "react";
import { ScrollView, View, Text } from "react-native";

import {
  screenStyles,
  tableStyles,
  titleStyles,
} from "../../components/Styles";

import { periodosTarjetaData } from "../../components/Data";

import { CustomSpinner, Alert, Dropdown } from "../../components";

import { EgresosQueries, TarjetasQueries } from "../../database";

import {
  formatDateToString,
  formatStringDateToDB,
  formatStringDateFromDB,
} from "../../components/Formatters";

import { Table, Row } from "react-native-table-component";

import * as Session from "../../components/Session";

export default function Ingresos({ navigation }) {
  /* State del CustomSpinner */
  const [isLoading, setIsLoading] = React.useState(false);

  /* State del Listado */
  const [listado, setListado] = React.useState({
    data: null,
    acumulado: 0,
    isLoading: false,
    periodo: null,
  });

  const [dropdownData, setDropdownData] = React.useState(null);

  const handleChangeTarjeta = (prop, value) => {
    setListado((prevState) => ({
      ...prevState,
      data: null,
      isLoading: false,
      tarjeta: value,
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

  const tableHeaders = [
    "Fecha",
    "Monto",
    "Tipo",
    "Categoria",
    "Detalle",
    "Nro. Cuota",
  ];
  const columnWidth = [150, 150, 250, 300, 350, 150];

  const getListado = () => {
    setListado((prevState) => ({ ...prevState, isLoading: true }));

    var substractDays =
      listado.periodo === "1"
        ? 7
        : listado.periodo === "2"
        ? 30
        : listado.periodo === "3"
        ? 365
        : listado.periodo === "4"
        ? 30
        : 7;

    var to = new Date();
    var from = new Date();

    from.setDate(from.getDate() - substractDays);

    var toFormatted = formatStringDateToDB(formatDateToString(to));
    var fromFormatted = formatStringDateToDB(formatDateToString(from));

    EgresosQueries._getListadoGastosTarjeta(
      listado.tarjeta,
      fromFormatted,
      toFormatted,
      (data) => {
        var tableData =
          data?.map((item) => {
            return [
              formatStringDateFromDB(item.fecha),
              "$ " + item.monto,
              item.tipoEgreso,
              item.categoriaEgreso ?? "-",
              item.detalleEgreso ?? "-",
              item.cuotas ?? "-",
            ];
          }) ?? [];

        setListado((prevState) => ({
          ...prevState,
          data: tableData,
          acumulado: data.reduce((prev, cur) => prev + cur.monto, 0),
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
  };

  const fillDropdownData = () => {
    setIsLoading(true);

    Session.getUser().then((usuario) => {
      TarjetasQueries._getListado(usuario.id, (data) => {
        var tarjetas =
          data?.map((item) => {
            return {
              label: item.entidadEmisora + " - **** **** **** " + item.tarjeta,
              value: item.id.toString(),
            };
          }) ?? [];

        setDropdownData({
          tarjetas: tarjetas,
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
            items={dropdownData.tarjetas}
            defaultValue={listado.tarjeta}
            placeholder="Seleccione una tarjeta."
            handleChange={handleChangeTarjeta}
          />

          <Dropdown
            propName="periodo"
            items={periodosTarjetaData}
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
                  Gastos
                  {listado.periodo === "1"
                    ? " de la semana"
                    : listado.periodo === "2"
                    ? " del mes"
                    : listado.periodo === "3"
                    ? " del año"
                    : listado.periodo === "4"
                    ? " acumulados a la fecha"
                    : ""}
                  - $ {listado.acumulado ?? 0}
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
                            <Row
                              key={index}
                              data={rowData}
                              widthArr={columnWidth}
                              style={[
                                tableStyles.tableRow,
                                index % 2 && {
                                  backgroundColor: "transparent",
                                },
                              ]}
                              textStyle={tableStyles.tableRowtext}
                            />
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

      <CustomSpinner isLoading={isLoading} text={"Guardando egreso..."} />
    </ScrollView>
  );
}

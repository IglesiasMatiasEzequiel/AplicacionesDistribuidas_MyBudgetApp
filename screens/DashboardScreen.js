import React from "react";
import { ScrollView, SafeAreaView, View, FlatList, Text } from "react-native";
import { Card } from "react-native-elements";
import { PieChart } from "react-native-chart-kit";
import ProgressCircle from "react-native-progress-circle-rtl";
import { screenStyles } from "../components/Styles";
import { Alert } from "../components";

import { notificationStyles } from "../components/Styles";

import { formatStringDateFromDB } from "../components/Formatters";

import {
  CuentasQueries,
  DataBase,
  EgresosQueries,
  PresupuestosQueries,
} from "../database";

import {
  formatDateToString,
  formatStringDateToDB,
} from "../components/Formatters";

import * as Session from "../components/Session";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const colors = [
  "#FF7E7E",
  "#FFB87E",
  "#6BD86B",
  "#58B2B2",
  "#A063BF",
  "#DA6CA8",
  "#C8F277",
  "#622C96",
];

const chartConfig = {
  backgroundColor: "#9C26B0",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const renderItemGasto = (item) => {
  var gasto = item.item;
  var descripcion =
    "$ " + gasto.gasto + " (" + gasto.porc + "%) - " + gasto.name;

  return (
    <View>
      <Text
        style={{
          color: item.item.color,
          paddingTop: 5,
          fontWeight: "bold",
        }}
      >
        {descripcion}
      </Text>
    </View>
  );
};

const renderItemSaldo = (item) => {
  var saldo = item.item;
  var descripcion =
    "$ " + saldo.saldo + " (" + saldo.porc + "%) - " + saldo.name;

  return (
    <View>
      <Text
        style={{
          color: item.item.color,
          paddingTop: 5,
          fontWeight: "bold",
        }}
      >
        {descripcion}
      </Text>
    </View>
  );
};

const renderItemVencimiento = ({ item, index }) => {
  var tipoVencimiento =
    item.tipoVencimiento === 1
      ? "Egreso"
      : item.tipoVencimiento === 2
      ? "Ineversión"
      : item.tipoVencimiento === 3
      ? "Prestamo"
      : "";

  return (
    <View
      style={[
        notificationStyles.notification,
        index % 2 && { backgroundColor: "transparent" },
      ]}
    >
      <Text
        style={[notificationStyles.notificationTitle, { fontWeight: "bold" }]}
      >
        {formatStringDateFromDB(item.vencimiento)} - {tipoVencimiento}
      </Text>
      <Text style={notificationStyles.notificationMessage}>
        {item.descripcion}
      </Text>
    </View>
  );
};

export default function DashboardScreen({ route, navigation }) {
  React.useEffect(() => {
    getGastosMes();
  }, [gastosMes, setGastosMes]);

  React.useEffect(() => {
    getSaldosCuentas();
  }, [saldosCuentas, setSaldosCuentas]);

  React.useEffect(() => {
    getVencimientos();
  }, [vencimientos, setVencimientos]);

  React.useEffect(() => {
    getPresupuestos();
  }, [presupuestos, setPresupuestos]);

  const today = new Date();

  /* State del Listado */
  const [gastosMes, setGastosMes] = React.useState({
    data: null,
    isLoading: false,
  });

  const [saldosCuentas, setSaldosCuentas] = React.useState({
    data: null,
    isLoading: false,
  });

  const [vencimientos, setVencimientos] = React.useState({
    data: null,
    isLoading: false,
  });

  const [presupuestos, setPresupuestos] = React.useState({
    data: null,
    isLoading: false,
  });

  const getGastosMes = () => {
    setGastosMes((prevState) => ({ ...prevState, isLoading: true }));

    var to = new Date();

    var currentMonth = (to.getMonth() + 1).toString().padStart(2, "0");
    var currentYear = to.getFullYear();

    var toFormatted = formatStringDateToDB(formatDateToString(to));
    var fromFormatted = formatStringDateToDB(
      "01/" + currentMonth + "/" + currentYear
    );

    Session.getUser().then((usuario) => {
      EgresosQueries._getGastosMesPorTipoPago(
        usuario.id,
        fromFormatted,
        toFormatted,
        (data) => {
          var gastoTotal = data?.reduce((a, b) => a + (b.gasto || 0), 0) ?? 0;

          var dataGastosMes =
            data?.map((item, index) => {
              return {
                id: index,
                name: item.medioPago,
                gasto: parseFloat(parseFloat(item.gasto).toFixed(2)),
                porc: parseFloat((item.gasto / gastoTotal) * 100).toFixed(2),
                color: colors[index],
              };
            }) ?? [];

          setGastosMes((prevState) => ({
            ...prevState,
            data: dataGastosMes,
            isLoading: false,
          }));
        },
        (error) => {
          setGastosMes((prevState) => ({
            ...prevState,
            data: [],
            isLoading: false,
          }));

          console.log(error);
        }
      );
    });
  };

  const getSaldosCuentas = () => {
    setSaldosCuentas((prevState) => ({ ...prevState, isLoading: true }));

    Session.getUser().then((usuario) => {
      CuentasQueries._getListadoSaldos(
        usuario.id,
        (data) => {
          var saldoTotal = data?.reduce((a, b) => a + (b.monto || 0), 0) ?? 0;

          var dataSaldosCuentas =
            data?.map((item, index) => {
              return {
                id: index,
                name: item.descripcion,
                saldo: parseFloat(parseFloat(item.monto).toFixed(2)),
                porc: parseFloat((item.monto / saldoTotal) * 100).toFixed(2),
                color: colors[7-index],
              };
            }) ?? [];

          setSaldosCuentas((prevState) => ({
            ...prevState,
            data: dataSaldosCuentas,
            isLoading: false,
          }));
        },
        (error) => {
          setSaldosCuentas((prevState) => ({
            ...prevState,
            data: [],
            isLoading: false,
          }));

          console.log(error);
        }
      );
    });
  };

  const getVencimientos = () => {
    setVencimientos((prevState) => ({ ...prevState, isLoading: true }));

    var to = new Date();
    var from = new Date();

    to.setDate(to.getDate() + 7);

    var toFormatted = formatStringDateToDB(formatDateToString(to));
    var fromFormatted = formatStringDateToDB(formatDateToString(from));

    Session.getUser().then((usuario) => {
      DataBase._getVencimientos(
        usuario.id,
        fromFormatted,
        toFormatted,
        (data) => {
          var dataVencimientos =
            data?.map((item, index) => {
              return {
                id: index,
                tipoVencimiento: item.tipoVencimiento,
                descripcion: item.descripcion,
                vencimiento: item.vencimiento,
              };
            }) ?? [];

          setVencimientos((prevState) => ({
            ...prevState,
            data: dataVencimientos,
            isLoading: false,
          }));
        },
        (error) => {
          setVencimientos((prevState) => ({
            ...prevState,
            data: [],
            isLoading: false,
          }));

          console.log(error);
        }
      );
    });
  };

  const getPresupuestos = () => {
    setPresupuestos((prevState) => ({ ...prevState, isLoading: true }));

    var to = new Date();
    to.setDate(to.getDate());

    var currentMonth = to.getMonth().toString().padStart(2, "0");
    var currentYear = to.getFullYear();

    var toFormatted = formatStringDateToDB(formatDateToString(to));
    var fromFormatted = formatStringDateToDB(
      "01/" + currentMonth + "/" + currentYear
    );

    Session.getUser().then((usuario) => {
      PresupuestosQueries._getListado(
        usuario.id,
        fromFormatted,
        toFormatted,
        (dataPrespuestos) => {
          var newData = [];
          var promises = [];

          dataPrespuestos.forEach((dataPresupuesto) => {
            promises.push(
              EgresosQueries._getGastosPorCategoria(
                usuario.id,
                dataPresupuesto.idCategoriaEgreso,
                dataPresupuesto.fechaInicio,
                toFormatted
              )
            );

            newData.push({
              id: dataPresupuesto.idCategoriaEgreso,
              categoria: dataPresupuesto.categoriaEgreso,
              presupuesto: dataPresupuesto.monto,
              gasto: 0,
              fechaInicio: dataPresupuesto.fechaInicio,
            });
          });

          Promise.all(promises)
            .then((gastosPorCategoria) => {
              gastosPorCategoria.forEach((gastoPorCategoria) => {
                if (
                  gastoPorCategoria !== null &&
                  gastoPorCategoria.length == 1
                ) {
                  var item = newData.find(
                    (x) => x.id === gastoPorCategoria[0].idCategoriaEgreso
                  );
                  item.gasto = gastoPorCategoria[0].gasto;
                }
              });

              setPresupuestos((prevState) => ({
                ...prevState,
                data: newData,
              }));

              setPresupuestos((prevState) => ({
                ...prevState,
                isLoading: false,
              }));
            })
            .catch((error) => {
              setPresupuestos((prevState) => ({
                ...prevState,
                isLoading: false,
              }));
              console.log(error);
            });
        },
        (error) => {
          setPresupuestos((prevState) => ({
            ...prevState,
            data: [],
            isLoading: false,
          }));

          console.log(error);
        }
      );
    });
  };

  if (route?.params?.isReload ?? false) {
    /* Se vuelve a setear el isReload para que no siga actualizando el listado*/
    navigation.setParams({ isReload: false });

    if (!gastosMes.isLoading) {
      getGastosMes();
    }

    if (!gastosMes.isLoading) {
      getSaldosCuentas();
    }

    if (!gastosMes.isLoading) {
      getVencimientos();
    }
    if (!gastosMes.isLoading) {
      getPresupuestos();
    }
  }

  return (
    <ScrollView style={screenStyles.dashboardScreen}>
      {!gastosMes.isLoading && (
        <Card>
          <Card.Title>Gastos de {months[today.getMonth()]}</Card.Title>
          <Card.Divider />
          {gastosMes.data !== null && gastosMes.data.length > 0 && (
            <View>
              <PieChart
                data={gastosMes.data}
                width={300}
                height={300}
                chartConfig={chartConfig}
                accessor="gasto"
                backgroundColor="transparent"
                hasLegend={false}
                paddingLeft={95}
              />

              <SafeAreaView
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <FlatList
                  data={gastosMes.data}
                  renderItem={renderItemGasto}
                  keyExtractor={(item) => item.id}
                />
              </SafeAreaView>
            </View>
          )}

          {(gastosMes.data === null || gastosMes.data.length === 0) && (
            <Alert type="info" message="Sin información" />
          )}
        </Card>
      )}

      {!saldosCuentas.isLoading && (
        <Card>
          <Card.Title>Saldos</Card.Title>
          <Card.Divider />
          {saldosCuentas.data !== null && saldosCuentas.data.length > 0 && (
            <View>
              <PieChart
                data={saldosCuentas.data}
                width={300}
                height={300}
                chartConfig={chartConfig}
                accessor="saldo"
                backgroundColor="transparent"
                hasLegend={false}
                paddingLeft={95}
                style={screenStyles.containerCenter}
              />
              <SafeAreaView
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <FlatList
                  data={saldosCuentas.data}
                  renderItem={renderItemSaldo}
                  keyExtractor={(item) => item.id}
                />
              </SafeAreaView>
            </View>
          )}

          {(saldosCuentas.data === null || saldosCuentas.data.length === 0) && (
            <Alert type="info" message="Sin información" />
          )}
        </Card>
      )}

      {!vencimientos.isLoading && (
        <Card>
          <Card.Title>Próximos. Vencimientos</Card.Title>
          <Card.Divider />
          {vencimientos.data !== null && vencimientos.data.length > 0 && (
            <ScrollView style={{ maxHeight: 350 }}>
              <SafeAreaView style={notificationStyles.notificationContainer}>
                <FlatList
                  data={vencimientos.data}
                  renderItem={renderItemVencimiento}
                  keyExtractor={(item) => item.id}
                />
              </SafeAreaView>
            </ScrollView>
          )}

          {(vencimientos.data === null || vencimientos.data.length === 0) && (
            <Alert type="info" message="Sin información" />
          )}
        </Card>
      )}

      {!presupuestos.isLoading && (
        <Card>
          <Card.Title>Presupuestos</Card.Title>
          <Card.Divider />
          {presupuestos.data !== null && presupuestos.data.length > 0 && (
            <ScrollView horizontal>
              {presupuestos.data.map((presupuesto, index) => {
                console.log(presupuesto);

                var porcentajeGasto = parseFloat(
                  (presupuesto.gasto * 100) / presupuesto.presupuesto
                ).toFixed(2);

                return (
                  <View key={index} style={{ width: 300 }}>
                    <Card style={{ flex: 1 }}>
                      <Card.Title>{presupuesto.categoria}</Card.Title>
                      <Card.Divider />
                      <View style={[screenStyles.containerCenter, { marginBottom: 20 }]}>
                        <ProgressCircle
                          percent={
                            porcentajeGasto > 100 ? 100 : porcentajeGasto
                          }
                          radius={80}
                          borderWidth={15}
                          color={porcentajeGasto > 90 ? "#FF2D2D" 
                          : porcentajeGasto < 30 ? "#0BD900" 
                          : porcentajeGasto > 60 ? "#FF9E00" : "#FFFF00" }
                          shadowColor="#999"
                          bgColor="#fff"
                        >
                          <Text style={{ fontSize: 18 }}>
                            {porcentajeGasto + "%"}
                          </Text>
                        </ProgressCircle>
                      </View>
                      <Text adjustsFontSizeToFit style={[screenStyles.containerCenter, { textAlign: 'center', marginBottom: 20 }]}>
                        {"$ " +
                          presupuesto.gasto +
                          " / $ " +
                          presupuesto.presupuesto}
                      </Text>
                      <Card.Divider />
                    </Card>
                  </View>
                );
              })}
            </ScrollView>
          )}

          {(presupuestos.data === null || presupuestos.data.length === 0) && (
            <Alert type="info" message="Sin información" />
          )}
        </Card>
      )}
    </ScrollView>
  );
}

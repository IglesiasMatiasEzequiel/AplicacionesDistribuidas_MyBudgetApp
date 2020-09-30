import React from "react";
import { ScrollView, SafeAreaView, View, FlatList, Text } from "react-native";
import { Card } from "react-native-elements";
import { PieChart } from "react-native-chart-kit";
import { screenStyles } from "../components/Styles";

import { EgresosQueries } from "../database";

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
  "#FDFF7E",
];

const saldosCuentas = [
  {
    id: "1",
    name: "Banco Galicia",
    saldo: 75040.9,
    porc: 68,
    color: colors[0],
  },
  {
    id: "2",
    name: "BBVA Francés",
    saldo: 12546.34,
    porc: 11,
    color: colors[1],
  },
  {
    id: "3",
    name: "HSBC",
    saldo: 25768.99,
    porc: 21,
    color: colors[2],
  },
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

export default function DashboardScreen({ route, navigation }) {
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
          var dataGastosMes =
            data?.map((item, index) => {
              return {
                id: index,
                name: item.medioPago,
                gasto: item.gasto,
                porc: 4,
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

  console.log(route?.params);
  console.log(route?.params?.isReload ?? false);

  if (
    (gastosMes.data === null ||
      //saldosCuentas.data === null ||
      (route?.params?.isReload ?? false)) &&
    !gastosMes.isLoading
     //&& !saldosCuentas.isLoading
  ) {
    /* Se vuelve a setear el isReload para que no siga actualizando el listado*/
    navigation.setParams({ isReload: false });

    getGastosMes();
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
              />
              <SafeAreaView
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <FlatList
                  data={saldosCuentas}
                  renderItem={renderItemSaldo}
                  keyExtractor={(item) => item.id}
                />
              </SafeAreaView>
            </View>
          )}
        </Card>
      )}
    </ScrollView>
  );
}

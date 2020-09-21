import React from "react";
import {
  ScrollView,
  View,
  FlatList,
  Text,
} from "react-native";
import { Card } from "react-native-elements";
import { PieChart } from "react-native-chart-kit";
import {
  screenStyles
} from "../components/Styles";

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

const gastosMes = [
  {
    id: 1,
    name: "Efectivo",
    gasto: 7557.8,
    porc: 9,
    color: colors[0],
  },
  {
    id: 2,
    name: "Débito Aut.",
    gasto: 12546.34,
    porc: 11,
    color: colors[1],
  },
  {
    id: 3,
    name: "Crédito",
    gasto: 15768.99,
    porc: 14,
    color: colors[2],
  },
  {
    id: 4,
    name: "Transferencia",
    gasto: 23421.34,
    porc: 23,
    color: colors[3],
  },
  {
    id: 5,
    name: "Débito",
    gasto: 31908.54,
    porc: 43,
    color: colors[4],
  },
];

const saldosCuentas = [
  {
    name: "Banco Galicia",
    saldo: 75040.9,
    porc: 68,
    color: colors[0],
  },
  {
    name: "BBVA Francés",
    saldo: 12546.34,
    porc: 11,
    color: colors[1],
  },
  {
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
  var descripcion = "$ " + saldo.saldo + " (" + saldo.porc + "%) - " + saldo.name;

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

export default class DashboardScreen extends React.Component {
  render() {
    const today = new Date();

    return (
      <ScrollView style={screenStyles.dashboardScreen}>
        <Card>
          <Card.Title>Gastos de {months[today.getMonth()]}</Card.Title>
          <Card.Divider />
          <PieChart
            data={gastosMes}
            width={300}
            height={300}
            chartConfig={chartConfig}
            accessor="gasto"
            backgroundColor="transparent"
            hasLegend={false}
            paddingLeft={95}
          />

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <FlatList
              data={gastosMes}
              renderItem={renderItemGasto}
              keyExtractor={(item) => item.id}
            />
          </View>
        </Card>
        <Card>
          <Card.Title>Saldos</Card.Title>
          <Card.Divider />
          <PieChart
            data={saldosCuentas}
            width={300}
            height={300}
            chartConfig={chartConfig}
            accessor="saldo"
            backgroundColor="transparent"
            hasLegend={false}
            paddingLeft={95}
          />
          <View
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
          </View>
        </Card>
      </ScrollView>
    );
  }
}

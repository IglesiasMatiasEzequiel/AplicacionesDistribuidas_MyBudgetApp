import React from "react";
import { StyleSheet, Dimensions, ScrollView, View } from "react-native";
import { Card } from "react-native-elements";
import { PieChart } from "react-native-chart-kit";
import {
  screenStyles,
  buttonStyles,
  textboxStyles,
  spinnerStyles,
} from "../components/Styles";

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  home: {
    width: width,
  },
});

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
  "#69067A",
  "#A00440",
  "#5CA804",
  "#A0B504",
  "#10317C",
  "#2C1180",
  "#F2D548",
  "#BA7D04",
];

const gastosMes = [
  {
    name: "Efectivo",
    gasto: 7557.8,
    color: colors[0],
    legendFontColor: colors[0],
    legendFontSize: 15,
  },
  {
    name: "Débito Aut.",
    gasto: 12546.34,
    color: colors[1],
    legendFontColor: colors[1],
    legendFontSize: 15,
  },
  {
    name: "Crédito",
    gasto: 15768.99,
    color: colors[2],
    legendFontColor: colors[2],
    legendFontSize: 15,
  },
  {
    name: "Transferencia",
    gasto: 23421.34,
    color: colors[3],
    legendFontColor: colors[3],
    legendFontSize: 15,
  },
  {
    name: "Débito",
    gasto: 31908.54,
    color: colors[4],
    legendFontColor: colors[4],
    legendFontSize: 15,
  },
];

const saldosCuentas = [
  {
    name: "Banco Galicia",
    saldo: 75040.9,
    color: colors[0],
    legendFontColor: colors[0],
    legendFontSize: 15,
  },
  {
    name: "BBVA Francés",
    saldo: 12546.34,
    color: colors[1],
    legendFontColor: colors[1],
    legendFontSize: 15,
  },
  {
    name: "HSBC",
    saldo: 25768.99,
    color: colors[2],
    legendFontColor: colors[2],
    legendFontSize: 15,
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

export default class DashboardScreen extends React.Component {
  render() {
    const today = new Date();

    return (
      <ScrollView style={screenStyles.screen}>
        <Card>
          <Card.Title>Gastos de {months[today.getMonth()]}</Card.Title>
          <Card.Divider />
          <ScrollView horizontal>
            <PieChart
              data={gastosMes}
              width={350}
              height={220}
              chartConfig={chartConfig}
              accessor="gasto"
              backgroundColor="transparent"
              absolute
            />
          </ScrollView>
        </Card>
        <Card>
          <Card.Title>Saldos</Card.Title>
          <Card.Divider />
          <ScrollView horizontal>
            <PieChart
              data={saldosCuentas}
              width={350}
              height={220}
              chartConfig={chartConfig}
              accessor="saldo"
              backgroundColor="transparent"
              absolute
            />
          </ScrollView>
        </Card>
      </ScrollView>
    );
  }
}

import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { PieChart } from "react-native-chart-kit";

import { Icon, Product } from '../components';

const { width } = Dimensions.get('screen');
import products from '../constants/products';

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const colors = ["#69067A", "#A00440", "#5CA804", "#A0B504", "#10317C", "#2C1180", "#F2D548", "#BA7D04"]

const gastosMes = [
  {
    name: "Efectivo",
    gasto: 7557.80,
    color: colors[0],
    legendFontColor: colors[0],
    legendFontSize: 15
  },
  {
    name: "Débito Aut.",
    gasto: 12546.34,
    color: colors[1],
    legendFontColor: colors[1],
    legendFontSize: 15
  },
  {
    name: "Crédito",
    gasto: 15768.99,
    color: colors[2],
    legendFontColor: colors[2],
    legendFontSize: 15
  },
  {
    name: "Transferencia",
    gasto: 23421.34,
    color: colors[3],
    legendFontColor: colors[3],
    legendFontSize: 15
  },
  {
    name: "Débito",
    gasto: 31908.54,
    color: colors[4],
    legendFontColor: colors[4],
    legendFontSize: 15
  }
];

const saldosCuentas = [
  {
    name: "Banco Galicia",
    saldo: 75040.90,
    color: colors[0],
    legendFontColor: colors[0],
    legendFontSize: 15
  },
  {
    name: "BBVA Francés",
    saldo: 12546.34,
    color: colors[1],
    legendFontColor: colors[1],
    legendFontSize: 15
  },
  {
    name: "HSBC",
    saldo: 25768.99,
    color: colors[2],
    legendFontColor: colors[2],
    legendFontSize: 15
  }
];

const chartConfig = {
  backgroundColor: "#9C26B0",
  decimalPlaces: 2,
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726"
  }
};

export default class DashboardScreen extends React.Component {
  renderCharts = () => {

    const today = new Date();

    return (
      <View>
      <Card>
        <Card.Title>Gastos de {months[today.getMonth()]}</Card.Title>
        <Card.Divider />
        <View>
          <PieChart
            data={gastosMes}
            width={width - 20}
            height={220}
            chartConfig={chartConfig}
            accessor="gasto"
            backgroundColor="transparent"
          />
        </View>
      </Card>
      <Card>
        <Card.Title>Saldos</Card.Title>
        <Card.Divider />
        <View>
          <PieChart
            data={saldosCuentas}
            width={width - 20}
            height={220}
            chartConfig={chartConfig}
            accessor="saldo"
            backgroundColor="transparent"
            absolute
          />
        </View>
      </Card>
      </View>
    );
  };

  render() {
    return (
      <Block row middle style={styles.home}>
        {this.renderCharts()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

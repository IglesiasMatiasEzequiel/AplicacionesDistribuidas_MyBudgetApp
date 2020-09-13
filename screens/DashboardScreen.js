import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme, Card } from 'galio-framework';

import { PieChart } from "react-native-chart-kit";

import { Icon, Product } from '../components';

const { width } = Dimensions.get('screen');
import products from '../constants/products';

const data = [
  {
    name: "Contado",
    gasto: 7557.80,
    color: "#C66FD5",
    legendFontColor: "#C66FD5",
    legendFontSize: 15
  },
  {
    name: "Débito Automático",
    gasto: 12546.34,
    color: "#69037B",
    legendFontColor: "#69037B",
    legendFontSize: 15
  },
  {
    name: "Crédito",
    gasto: 15768.99,
    color: "#AE45C0",
    legendFontColor: "#AE45C0",
    legendFontSize: 15
  },
  {
    name: "Transferencia",
    gasto: 23421.34,
    color: "#31013A",
    legendFontColor: "#31013A",
    legendFontSize: 15
  },
  {
    name: "Débito",
    gasto: 31908.54,
    color: "#8B04A3",
    legendFontColor: "#8B04A3",
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
    return (
      <Block card>
        <PieChart
          data={data}
          width={width}
          height={220}
          chartConfig={chartConfig}
          accessor="gasto"
          backgroundColor="#9C26B0"
        />
      </Block>
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

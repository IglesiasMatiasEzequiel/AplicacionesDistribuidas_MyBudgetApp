import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  View
} from 'react-native';

import { Table, Row, Rows } from 'react-native-table-component';

import { Button, Block, Text, Input, theme } from 'galio-framework';

import { materialTheme, products, Images } from '../constants';
import { Select, Icon, Header, Product, Switch } from '../components';


const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

export default class Egresos extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tableHead: ['Tipo', 'Destino', 'Descripciòn', 'Monto'],
  //     tableData: [
  //       ['P-Sueldo', 'Cuenta', 'Sueldo', '5000'],
  //       ['P-Alquiler', 'Cuenta', 'Depto1', '3000'],
  //       ['P-Alquiler', 'Cuenta', 'Depto2', '3200'],
  //       ['P-Alquiler', 'Cuenta', 'Depto3', '3800'],
  //       ['Extraordinario', 'Efectivo', 'Tio', '400'],
  //       ['Extraordinario', 'Efectivo', 'Hermano', '500'],
  //       ['Extraordinario', 'Efectivo', 'Hermano', '1000'],
  //       ['Extraordinario', 'Efectivo', 'Amigos', '2000']
  //     ]
  //   }
  // }

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Tipo', 'Destino', 'Descripcion', 'Monto'],
      widthArr: [120, 80, 120, 50]
    }
  }

  toggleSwitch = switchId => this.setState({ [switchId]: !this.state[switchId] });

  renderButtons = () => {
    const { navigation } = this.props;
    return (
      <Block flex>  
        <Text size={12} style={styles.signInText} ></Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block center>
            <Button shadowless color={materialTheme.COLORS.ACTIVE} style={[styles.button, styles.shadow]}
                    onPress={() => navigation.navigate('NuevoEgreso')}>
              Nuevo Egreso
            </Button>
          </Block>
          <Block center>
            <Button shadowless color={materialTheme.COLORS.ACTIVE} style={[styles.button, styles.shadow]}
                    onPress={() => navigation.navigate('BorrarEgreso')}>
              Borrar Egreso
            </Button>
          </Block>
          <Block row space="evenly">
            {/* <Block flex center>
              <Select
                defaultIndex={2020}
                options={[2020, 2019, 2018]}
                style={styles.shadow}
              />
            </Block> */}
            <Block flex center>
              <Button
                center
                shadowless
                color={materialTheme.COLORS.DEFAULT}
                textStyle={styles.optionsText}
                style={[styles.optionsButton, styles.shadow]}>
                Ultimo Año
              </Button>
            </Block>
            <Block flex center>
              <Button
                center
                shadowless
                color={materialTheme.COLORS.DEFAULT}
                textStyle={styles.optionsText}
                style={[styles.optionsButton, styles.shadow]}>
                Ultimo Mes
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    )
  }
  
  renderText = () => {
    return (
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text h6 style={{marginBottom: theme.SIZES.BASE / 2}}> </Text>
            <Text h5 style={{marginBottom: theme.SIZES.BASE / 2}}>Listado de ultimos Egresos</Text>
        </Block>
    )
  }
   
  renderTableCell = () => {
    const { navigation } = this.props;
    const state = this.state;
    const tableData = [
      ['P-Sueldo', 'Cuenta', 'Sueldo', '5000'],
      ['P-Alquiler', 'Cuenta', 'Depto1', '3000'],
      ['P-Alquiler', 'Cuenta', 'Depto2', '3200'],
      ['P-Alquiler', 'Cuenta', 'Depto3', '3800'],
      ['Extraordinario', 'Efectivo', 'Tio', '400'],
      ['Extraordinario', 'Efectivo', 'Tio', '800'],
      ['Extraordinario', 'Efectivo', 'Hermano', '500'],
      ['Extraordinario', 'Efectivo', 'Hermano', '1000'],
      ['Extraordinario', 'Efectivo', 'Amigos', '2000']
    ];

    return (
      // <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
      //     <View style={styles.container}>
      //       <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
      //         <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
      //         <Rows data={state.tableData} textStyle={styles.text}/>
      //       </Table>
      //     </View>
      // </Block>
      <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
        <View style={styles.container}>
          <ScrollView horizontal>
          <View>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                  {
                    tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={state.widthArr}
                        style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                        textStyle={styles.text}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </Block>
    )
  }
 
  render() {
    return (
      <Block flex center>
        <ScrollView
          style={styles.components}
          showsVerticalScrollIndicator={false}>
            {this.renderButtons()}
            {this.renderText()}
            {this.renderTableCell()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  // container: { flex: 1, padding: 11, paddingTop: 10, backgroundColor: '#fff' },
  // head: { height: 40, backgroundColor: '#f1f8ff' },
  // text: { margin: 6 },
  
  container: { flex: 1, padding: 11, paddingTop: 10, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#f1f8ff'},
  text: { textAlign: 'center', fontWeight: '100' },
  //dataWrapper: { marginTop: -1 },
  //row: { height: 20, backgroundColor: '#E7E6E1' },

  components: {
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - (theme.SIZES.BASE * 2),
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: '#4A4A4A',
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
  },
  inputDefault: {
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputTheme: {
    borderBottomColor: materialTheme.COLORS.PRIMARY,
  },
  inputTheme: {
    borderBottomColor: materialTheme.COLORS.PRIMARY,
  },
  inputInfo: {
    borderBottomColor: materialTheme.COLORS.INFO,
  },
  inputSuccess: {
    borderBottomColor: materialTheme.COLORS.SUCCESS,
  },
  inputWarning: {
    borderBottomColor: materialTheme.COLORS.WARNING,
  },
  inputDanger: {
    borderBottomColor: materialTheme.COLORS.ERROR,
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
});
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Dimensions,
  View
} from 'react-native';

import { Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { materialTheme, products, Images } from '../constants';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

export default class Ingresos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Tipo', 'Destino', 'Descripciòn', 'Monto', 'Borrar'],
      widthArr: [120, 80, 120, 50, 50],
      tableData: [
        ['P-Sueldo', 'Cuenta', 'SueldoSueldo', '5000','X'],
        ['P-Alquiler', 'Cuenta', 'Depto1', '3000','X'],
        ['P-Alquiler', 'Cuenta', 'Depto2', '3200','X'],
        ['P-Alquiler', 'Cuenta', 'Depto3', '3800','X'],
        ['Extraordinario', 'Efectivo', 'Tio', '400','X'],
        ['Extraordinario', 'Efectivo', 'Hermano', '500','X'],
        ['Extraordinario', 'Efectivo', 'Hermano', '1000','X'],
        ['Extraordinario', 'Efectivo', 'Amigos', '2000','X']
      ]
    }
  }
  
  _alertIndex(index) {
    Alert.alert(`Se borror el registros seleccionado - Linea: ${index + 1}`);
  }

  toggleSwitch = switchId => this.setState({ [switchId]: !this.state[switchId] });

  renderButtons = () => {
    const { navigation } = this.props;
    return (
      <Block flex>  
        <Text h6 style={{marginBottom: theme.SIZES.BASE / 20}}> </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Button shadowless color={materialTheme.COLORS.ACTIVE} style={[styles.button, styles.shadow]}
                    onPress={() => navigation.navigate('Ingresos')}>
              Ultimo Mes
          </Button>
          <Button shadowless color={materialTheme.COLORS.ACTIVE} style={[styles.button, styles.shadow]}
                    onPress={() => navigation.navigate('Ingresos')}>
              Ultima Semana
          </Button>    
        </Block>
      </Block>
    )
  }
  
  renderText = () => {
    return (
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text h5 style={{marginBottom: theme.SIZES.BASE}}>Listado de ultimos Ingresos</Text>
        </Block>
    )
  }
   
  renderTableCell = () => {
    const { navigation } = this.props;
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Borrar</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <View style={styles.container}>
              <Table borderStyle={{borderColor: 'transparent'}}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
              {
                  state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                      {
                      rowData.map((cellData, cellIndex) => (
                          <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                      ))
                      }
                  </TableWrapper>
                  ))
              }
              </Table>
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
    container: { flex: 1, padding: 11, paddingTop: 10, backgroundColor: '#fff' },
    head: { height: 50, backgroundColor: '#f1f8ff' },
    text: { textAlign: 'center', fontWeight: '100', margin: 5  },
    row: { flexDirection: 'row', backgroundColor: '#fff' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },

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

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
import { materialTheme, products, Images } from '../../constants';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

export default class Ingresos extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
          tableHead: ['Fecha','Descripcion', 'Monto'],
          widthArr: [100, 150, 100]
        }
      }
    toggleSwitch = switchId => this.setState({ [switchId]: !this.state[switchId] });

    renderButtons = () => {
        const { navigation } = this.props;
        return (
        <Block flex>  
            <Text h6 style={{marginBottom: theme.SIZES.BASE / 20}}> </Text>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Button shadowless color={materialTheme.COLORS.ACTIVE} style={[styles.button, styles.shadow]}
                        onPress={() => navigation.navigate('Tarjetas')}>
                Ultimo Mes
            </Button>
            <Button shadowless color={materialTheme.COLORS.ACTIVE} style={[styles.button, styles.shadow]}
                        onPress={() => navigation.navigate('Tarjetas')}>
                Ultima Semana
            </Button>    
            </Block>
        </Block>
        )
    }
  
    renderText = () => {
        return (
            <Block style={{ paddingHorizontal: theme.SIZES.BASE, width: width - (theme.SIZES.BASE * 2) }} >
                <Text h5 style={{marginBottom: theme.SIZES.BASE}}>Listado de ultimos gastos de la tarjeta XXXX-XXXX-XXXX-XXXX</Text>
            </Block>
        )
    }
   
    renderTableCell = () => {
        const { navigation } = this.props;
        const state = this.state;
        const tableData = [
        ['10/10/2020', 'Compra 1', '5000'],
        ['10/10/2020', 'Compra 1', '5000'],
        ['10/10/2020', 'Compra 1', '5000'],
        ['10/10/2020', 'Compra 1', '5000'],
        ['10/10/2020', 'Sueldo', '5000'],
        ['10/10/2020', 'Sueldo', '5000'],
        ['10/10/2020', 'Sueldo', '5000'],
        ['10/10/2020', 'Sueldo', '5000'],
        ];

    return (
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
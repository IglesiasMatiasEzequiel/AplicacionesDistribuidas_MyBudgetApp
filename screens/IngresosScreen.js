import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';

import { Button, Block, Text, Input, theme } from 'galio-framework';

import { materialTheme, products, Images } from '../constants';
import { Select, Icon, Header, Product, Switch } from '../components';


const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

export default class Ingresos extends React.Component {
  state = {
    'switch-1': true,
    'switch-2': false,
  };

  toggleSwitch = switchId => this.setState({ [switchId]: !this.state[switchId] });

  renderButtons = () => {
    const { navigation } = this.props;
    return (
      <Block flex>  
        <Text h6 style={{marginBottom: theme.SIZES.BASE / 2}}> </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block center>
            <Button shadowless color={materialTheme.COLORS.ACTIVE} style={[styles.button, styles.shadow]}
                    onPress={() => navigation.navigate('NuevoIngreso')}>
              Nuevo Ingreso
            </Button>
          </Block>
          <Block center>
            <Button shadowless color={materialTheme.COLORS.ACTIVE} style={[styles.button, styles.shadow]}
                    onPress={() => navigation.navigate('App')}>
              Borrar Ingreso
            </Button>
          </Block>
          <Block row space="evenly">
            {/* <Block flex center>
              <Select
                // defaultIndex={2020}
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
            <Text h5 style={{marginBottom: theme.SIZES.BASE / 2}}>Listado de ultimos Ingresos</Text>
        </Block>
    )
  }
   
  renderTableCell = () => {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block style={styles.rows}>

          </Block>
        </Block>
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
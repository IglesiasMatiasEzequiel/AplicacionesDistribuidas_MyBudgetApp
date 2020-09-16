import React from "react";
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, ScrollView, 
         ImageBackground, } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, theme } from "galio-framework";
import CustomModal from '../../components/CustomModal';

import { materialTheme, products, Images } from '../../constants/';
import { Select, Icon, Header, Product, Switch } from '../../components/';

const { width } = Dimensions.get("screen");

export default function TarjetasScreen({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.COLORS.DEFAULT,
      alignItems: "center",
      justifyContent: "center",
    },
    inputView: {
      width: width - theme.SIZES.BASE * 2,
      backgroundColor: "white",
      borderRadius: 5,
      height: 50,
      marginBottom: 20,
      justifyContent: "center",
      padding: 20,
    },
    inputText: {
      height: 50,
      color: "black",
    },
    back: {
      color: "black",
      fontSize: 15,
    },
    registerBtn: {
      width: width - theme.SIZES.BASE * 2,
      backgroundColor: "#69037B",
      borderRadius: 5,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 15,
      marginBottom: theme.SIZES.BASE/2,
    },
    registerText: {
      color: "white",
    },
    spinnerTextStyle: {
      color: '#FFF'
    },
  });


  const [email, setEmail] = React.useState("");
  const handleChangeEmail = (email) => setEmail(email);

  const onBack = () => navigation.navigate("Home");

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('NuevaTarjeta')} style={styles.registerBtn}>
          <Text style={styles.registerText}>Nueva Tarjeta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BorrarTarjeta')} style={styles.registerBtn}>
          <Text style={styles.registerText}>Borrar Tarjeta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('GastosTarjeta')} style={styles.registerBtn}>
          <Text style={styles.registerText}>Gastos Tarjeta</Text>
        </TouchableOpacity>
       
        <View style={styles.container}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE, width: width - (theme.SIZES.BASE * 2) }} >
                <Text h5 style={{marginBottom: theme.SIZES.BASE}}>Listado Tarjetas</Text>
            </Block>
        </View>


        <Block flex style={styles.group}>
            <Block flex>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Product product={products[1]} full style={{ marginRight: theme.SIZES.BASE }} />
                    <Product product={products[3]} style={{ marginRight: theme.SIZES.BASE }} />
                    <Product product={products[4]} style={{ marginRight: theme.SIZES.BASE }} />
                </Block>
            </Block>
        </Block>

        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
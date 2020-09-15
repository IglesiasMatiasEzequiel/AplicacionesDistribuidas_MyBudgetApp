import React from "react";
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import { Block, Text, Input, theme } from "galio-framework";
import { materialTheme, products, Images } from '../constants';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get("screen");

export default function NuevoIngresoScren({ navigation }) {
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.COLORS.DEFAULT,
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      fontWeight: "bold",
      fontSize: 50,
      color: "#69037B",
      marginBottom: 40,
    },
    inputView: {
      width: width - theme.SIZES.BASE * 2,
      backgroundColor: "white",
      borderRadius: 5,
      height: 50,
      marginBottom: 15,
      justifyContent: "center",
      padding: 20,
    },
    inputText: {
      height: 50,
      color: "black",
    },
    forgot: {
      color: "black",
      fontSize: 11,
    },
    loginBtn: {
      width: width - theme.SIZES.BASE * 2,
      backgroundColor: "#4CAF50",
      borderRadius: 5,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      marginBottom: theme.SIZES.BASE,
    },
    loginBtn2: {
      width: width - theme.SIZES.BASE * 2,
      backgroundColor: "#F44336",
      borderRadius: 5,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      marginBottom: theme.SIZES.BASE,
    },
    loginText: {
      color: "white",
    },
    signInText: {
      color: "black",
    },
  });

  const [fecha, setFecha] = React.useState("");
  const [monto, setMonto] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [tipoIngreso, setTipoIngreso] = React.useState("");
  const [destino, setDestino] = React.useState("");

  const handleChangeFecha = (fecha) => setMonto(fecha);
  const handleChangeMonto = (monto) => setMonto(monto);
  const handleChangeDescripcion = (descripcion) => setDescripcion(descripcion);
  const handleChangeTipoIngreso = (tipoIngreso) => setTipoIngreso(tipoIngreso);
  const handleChangeDestino = (destino) => setDestino(destino);

  const onConfirmar = () => navigation.navigate("Ingresos");
  const onCancelar = () => navigation.navigate("Ingresos");

  console.log(tipoIngreso);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text size={10} style={styles.signInText} ></Text>
        <Text size={16} style={styles.signInText} >Fecha</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Ingrese la fecha del ingreso ..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(fecha) => handleChangeFecha(fecha)}
          />
        </View>

        <Text size={16} style={styles.signInText}>Monto</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Ingrese el monto del ingreso ..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(monto) => handleChangeMonto(monto)}
          />
        </View>
        
        <Text size={16} style={styles.signInText}>Descripciòn</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Ingrese una descripciòn ..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(descripcion) => handleChangeDescripcion(descripcion)}
          />
        </View>

        <Text size={16} style={styles.signInText}>Destino</Text>
        <View>
          <DropDownPicker
              items={[
                  {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
                  {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />}
              ]}
              defaultValue={tipoIngreso}
              containerStyle={{height: 40}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={ (item) => setTipoIngreso(item.value) }
          />
        </View>

        <Text size={16} style={styles.signInText}>Tipo de Ingreso</Text>
        <View>
          <DropDownPicker
                items={[
                    {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
                    {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />}
                ]}
                defaultValue={tipoIngreso}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={ (item) => setTipoIngreso(item.value) }
            />
        </View>


        <TouchableOpacity onPress={onConfirmar} style={styles.loginBtn}>
          <Text style={styles.loginText}>Confirmar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancelar} style={styles.loginBtn2}>
          <Text style={styles.loginText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

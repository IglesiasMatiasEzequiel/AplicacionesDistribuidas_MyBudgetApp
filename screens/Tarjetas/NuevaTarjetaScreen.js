import React from "react";
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, theme } from "galio-framework";
import CustomModal from '../../components/CustomModal';

const { width } = Dimensions.get("screen");

export default function NuevaTarjetaScreen({ navigation }) {
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
      fontSize: 11,
    },
    registerBtn: {
      width: width - theme.SIZES.BASE * 2,
      backgroundColor: "#69037B",
      borderRadius: 5,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      marginBottom: theme.SIZES.BASE,
    },
    registerBtn2: {
        width: width - theme.SIZES.BASE * 2,
        backgroundColor: "#F44336",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: theme.SIZES.BASE,
      },
    registerText: {
      color: "white",
    },
    spinnerTextStyle: {
      color: '#FFF'
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);


  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [banco, setBanco] = React.useState("");
  const [tarjeta, setTarjeta] = React.useState("");
  const [vencimiento, setVencimiento] = React.useState("");
  const [cierreResumen, setCierreResumen] = React.useState("");
  const [vencimientoResumen, setVencimientoResumen] = React.useState("");

 
  const handleChangeNombre = (nombre) => setNombre(nombre);
  const handleChangeApellido = (apellido) => setApellido(apellido);
  const handleChangeBanco = (banco) => setBanco(banco);
  const handleChangeTarjeta = (tarjeta) => setTarjeta(tarjeta);
  const handleChangeVencimimento = (vencimiento) => setVencimiento(vencimiento);
  const handleChangeCierreResumen = (cierreResumen) => setCierreResumen(cierreResumem);
  const handleChangeVencimientoResumen = (vencimientoResumen) => setVencimientoResumen(vencimientoResumem);

  const onCrear = () => { 

    setIsLoading(true);

    setTimeout(() => { 
      setIsLoading(false);
      setIsModalVisible(true);
    }, 1000);
  }

  const onTarjetas = () => { 
    setIsModalVisible(false);
    navigation.navigate("Tarjetas");
  }
  const onBack = () => navigation.navigate("Tarjetas");

  return (
    <ScrollView>
      <View style={styles.container}>
        <Spinner
          visible={isLoading}
          textContent={"Cargando..."}
          textStyle={styles.spinnerTextStyle}
        />

        <CustomModal 
          title="¡Registro exitoso!"
          message="El registro de la tarjeta se realizó correctamente."
          isVisible={!isLoading && isModalVisible} 
          successBtnText="IR A TARJETAS"
          handleBtnOnSuccess={onTarjetas}
          />

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Nombre..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(text) => handleChangeNombre(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Apellido..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(text) => handleChangeApellido(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Banco..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(text) => handleChangeBanco(text)}
            value=""
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Ingrese numeros de la tarjeta ..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(text) => handleChangeTarjeta(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Fecha de Vencimiento..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(text) => handleChangeVencimimento(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Fecha de Cierre del Resumen..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(text) => handleChangeCierreResumen(text)}
            value=""
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Fecha de Vencimiento del Resumen..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(text) => handleChangeVencimientoResumen(text)}
            value=""
          />
        </View>

        <TouchableOpacity onPress={onCrear} style={styles.registerBtn}>
          <Text style={styles.registerText}>CREAR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBack} style={styles.registerBtn2}>
          <Text style={styles.registerText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
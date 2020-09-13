import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
// import { Text, theme } from "galio-framework";
import { Block, Text, Input, theme } from "galio-framework";
import { materialTheme, products, Images } from '../constants/';
import { Select, Icon, Header, Product, Switch } from '../components/';


const { width } = Dimensions.get("screen");

export default function LoginScren({ navigation }) {
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
      marginBottom: 20,
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
      backgroundColor: "#69037B",
      borderRadius: 5,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      marginBottom: theme.SIZES.BASE,
    },
    loginText: {
      color: "white",
    },
    signInText: {
      color: "black",
    },
  });

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangeEmail = (email) => setEmail(email);
  const handleChangePassword = (password) => setPassword(password);

  const onLogin = () => navigation.navigate("App");

  const scaryAnimals = [
    { label: "Alligators", value: 1 },
    { label: "Crocodiles", value: 2 },
    { label: "Sharks", value: 3 },
    { label: "Small crocodiles", value: 4 },
    { label: "Smallest crocodiles", value: 5 },
    { label: "Snakes", value: 6 },
  ];


  return (
    <View style={styles.container}>
      
      <Text size={16} style={styles.signInText}>Monto</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Ingrese el monto del ingreso ..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangeEmail(text)}
        />
      </View>
      
      <Text size={16} style={styles.signInText}>Descripciòn</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Ingrese una descripciòn ..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangeEmail(text)}
        />
      </View>

      <Text size={16} style={styles.signInText}>Destino</Text>
      <View style={styles.inputView}>
        <Select options={scaryAnimals} />
      </View>

      <Text size={16} style={styles.signInText}>Tipo de Ingreso</Text>
      <View style={styles.inputView}>
        <Select options={scaryAnimals} />
      </View>

      <TouchableOpacity onPress={onLogin} style={styles.loginBtn}>
        <Text style={styles.loginText}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.signInText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

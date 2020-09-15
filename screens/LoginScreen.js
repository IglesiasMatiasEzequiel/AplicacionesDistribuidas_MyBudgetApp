import React from "react";
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Text, theme } from "galio-framework";
import Spinner from 'react-native-loading-spinner-overlay';
import CustomModal from '../components/CustomModal';

const { width } = Dimensions.get("screen");

export default function LoginScreen({ navigation }) {
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
    spinnerTextStyle: {
      color: '#FFF'
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [email, setEmail] = React.useState("matiiglesias@uade.edu.ar");
  const [password, setPassword] = React.useState("123456");

  const handleChangeEmail = (email) => setEmail(email);
  const handleChangePassword = (password) => setPassword(password);

  const onLogin = () => { 

    setIsLoading(true);

    setTimeout(() => { 

      if(true /* Si logueó bien*/){
        setIsLoading(false);
        navigation.navigate("App", {
          profile: {
            email: email,
            nombre: "Matias", //Este dato viene del back una vez que loguea
            apellido: "Iglesias", //Este dato viene del back una vez que loguea
            password: password,
          }});
      } else {
        setIsModalVisible(true);
      }
    }, 1000);
  }

  const onRegister = () => navigation.navigate("Register");
  const onForgotPassword = () => navigation.navigate("ForgotPassword");

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MyBudgetApp</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangeEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangePassword(text)}
          value={password}
        />
      </View>
      <TouchableOpacity onPress={onForgotPassword}>
        <Text style={styles.forgot}>Olvidaste tu password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onLogin} style={styles.loginBtn}>
        <Text style={styles.loginText}>INGRESAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onRegister}>
        <Text style={styles.signInText}>Registrarse</Text>
      </TouchableOpacity>

      <Spinner
          visible={isLoading}
          textContent={"Ingresando..."}
          textStyle={styles.spinnerTextStyle}
        />

        {/* <CustomModal 
          title="¡Registro exitoso!"
          message="El registro se realizó correctamente."
          isVisible={!isLoading && isModalVisible} 
          successBtnText="IR AL LOGIN"
          handleBtnOnSuccess={onSuccessLogin}
          /> */}

    </View>
  );
}

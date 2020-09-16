import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, theme } from "galio-framework";
import Spinner from 'react-native-loading-spinner-overlay';
import CustomModal from '../../components/CustomModal';
import { screenStyles, buttonStyles, textboxStyles, spinnerStyles } from '../../components/Styles';

export default function LoginScreen({ navigation }) {
  const styles = StyleSheet.create({
    logoContainer: {
      alignItems: "center",
      justifyContent: "center"
    },
    logo: {
      fontWeight: "bold",
      fontSize: 50,
      color: "#69037B",
      marginTop: 100,
      marginBottom: 100,
    }
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
    <ScrollView style={screenStyles.screen}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>MyBudgetApp</Text>
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Email..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangeEmail(text)}
          value={email}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          secureTextEntry
          style={textboxStyles.textbox}
          placeholder="Password..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangePassword(text)}
          value={password}
        />
      </View>
      <TouchableOpacity onPress={onForgotPassword} style={buttonStyles.btnBack}>
        <Text style={buttonStyles.btnBackText}>Olvidaste tu password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onLogin} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>INGRESAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onRegister} style={buttonStyles.btnBack}>
        <Text style={buttonStyles.btnBackText}>Registrarse</Text>
      </TouchableOpacity>

      <Spinner
        visible={isLoading}
        textContent={"Ingresando..."}
        textStyle={spinnerStyles.spinnerText}
      />

      {/* <CustomModal 
          title="¡Registro exitoso!"
          message="El registro se realizó correctamente."
          isVisible={!isLoading && isModalVisible} 
          successBtnText="IR AL LOGIN"
          handleBtnOnSuccess={onSuccessLogin}
          /> */}
    </ScrollView>
  );
}

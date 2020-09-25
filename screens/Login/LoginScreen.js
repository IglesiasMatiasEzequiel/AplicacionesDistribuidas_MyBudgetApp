import React, { useCallback } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Text, theme } from "galio-framework";
import { CustomModal, CustomSpinner } from "../../components";
import {
  screenStyles,
  buttonStyles,
  textboxStyles
} from "../../components/Styles";

import { login } from '../../components/DataBase';
import { setUser, cleanSession } from '../../components/Session';

export default function LoginScreen({ navigation }) {
  const styles = StyleSheet.create({
    logoContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      fontWeight: "bold",
      fontSize: 50,
      color: "#69037B",
      marginTop: 100,
      marginBottom: 100,
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [email, setEmail] = React.useState("lucas@gmail.com");
  const [password, setPassword] = React.useState("1234");

  const handleChangeEmail = (email) => setEmail(email);
  const handleChangePassword = (password) => setPassword(password);

  const onLogin = () => {

    cleanSession();

    validateForm(() => {
      setIsLoading(true);

      login(email, password,
        (data) => {
          setIsLoading(false);
  
          if (data && data.length === 1) {
  
            var usuario = {
              id: data[0].id,
              email: data[0].email,
              nombre: data[0].nombre,
              apellido: data[0].apellido,
              password: data[0].password,
            };

            setUser(usuario);
  
            navigation.navigate("App", { usuario: usuario });
            
          } else {
            setModalData({
              title: "Error",
              message: "Oops, email y/o password incorrecto/s.",
              isVisible: true,
              isSuccess: false,
            });
          }
        },
        () => {
          console.log('Ocurrió un error en la autenticación.')
        }
      );
    }, () => {
      
    });
  };

  const validateForm = (successCallback, errorCallback) => {
    if(true){
      successCallback();
    }else{
      errorCallback();
    }
  };

  const limpiarState = () => {
    setEmail("");
    setPassword("");
  }

  const onCloseModal = () => setModalData({ ...modalData, isVisible: false });
  
  const onRegister = () => {
    limpiarState();
    navigation.navigate("Register");
  }

  const onForgotPassword = () => { 
    limpiarState();
    navigation.navigate("ForgotPassword");
  }

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

      <CustomSpinner isLoading={isLoading} text={"Ingresando..."} />

      <CustomModal
        isSuccess={modalData?.isSuccess}
        title={modalData?.title}
        message={modalData?.message}
        isVisible={modalData?.isVisible}
        handleBtnOnSuccess={onCloseModal}
      />

    </ScrollView>
  );
}

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Textbox, CustomModal, CustomSpinner } from "../../components";
import {
  screenStyles,
  buttonStyles,
} from "../../components/Styles";

import { validateRequired } from "../../components/Validations";

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
  
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [validations, setValidations] = React.useState({
    email: true,
    password: true
  });

  const [validationMessages, setValidationMessages] = React.useState({
    email: "",
    password: ""
  });

  const handleChangeEmail = (email) => { 
    setValidations(prevState => ({ ...prevState, email: true }));
    setEmail(email);
  }
  const handleChangePassword = (password) => {
    setValidations(prevState => ({ ...prevState, password: true }));
    setPassword(password);
  }

  const onLogin = async () => {
    cleanSession();

    const isValidForm = await validateForm();

    if (isValidForm) {

      setIsLoading(true);

      login(email, password, (data) => {
        setIsLoading(false);

        if (data && data.length === 1) {
          limpiarState();

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
      });
    } else {
      console.log("Ocurrió un error en la autenticación.");
    }
  };

  const validateForm = async () => {
  
    const isEmailValid = await validateRequired(email);

    if(!isEmailValid){
      setValidations(prevState => ({ ...prevState, email: false }));
      setValidationMessages(prevState => ({ ...prevState, email: "El email es requerido..." }));
    }

    const isPasswordValid = await validateRequired(password);

    if(!isPasswordValid){
      setValidations(prevState => ({ ...prevState, password: false }));
      setValidationMessages(prevState => ({ ...prevState, password: "El password es requerido..." }));
    }
    
    return isEmailValid && isPasswordValid;
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
      <Textbox
          placeholder="Email..."
          handleChange={handleChangeEmail}
          value={email}
          isValid={validations.email}
          validationMessage={validationMessages.email}
        />
      <Textbox
          placeholder="Password..."
          handleChange={handleChangePassword}
          value={password}
          isValid={validations.password}
          validationMessage={validationMessages.password}
          isPassword={true}
        />
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

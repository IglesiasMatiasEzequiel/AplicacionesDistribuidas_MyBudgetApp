import React from "react";
import { TouchableOpacity, ScrollView, Text } from "react-native";
import { Textbox, CustomSpinner, CustomModal } from "../../components";
import {
  screenStyles,
  buttonStyles
} from "../../components/Styles";

import { insertUsuario } from '../../components/DataBase';
import { validateRequired } from "../../components/Validations";

export default function LoginScreen({ navigation }) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [email, setEmail] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");

  const [validations, setValidations] = React.useState({
    email: true,
    nombre: true,
    apellido: true,
    password: true,
    repeatPassword: true
  });

  const [validationMessages, setValidationMessages] = React.useState({
    email: "",
    nombre: "",
    apellido: "",
    password: "",
    repeatPassword: ""
  });

  const handleChangeEmail = (email) => { 
    setValidations(prevState => ({ ...prevState, email: true }));
    setEmail(email); 
  }
  const handleChangeNombre = (nombre) => {
    setValidations(prevState => ({ ...prevState, nombre: true }));
    setNombre(nombre);
  }
  const handleChangeApellido = (apellido) => {
    setValidations(prevState => ({ ...prevState, apellido: true }));
    setApellido(apellido);
  }
  const handleChangePassword = (password) => {
    setValidations(prevState => ({ ...prevState, password: true }));
    setPassword(password);
  }
  const handleChangeRepeatPassword = (repeatPassword) => {
    setValidations(prevState => ({ ...prevState, repeatPassword: true }));
    setRepeatPassword(repeatPassword);
  }

  const onRegister = async () => {
    
    const isValidForm = await validateForm();

    if (isValidForm) {

      setIsLoading(true);

      insertUsuario(email, nombre, apellido, password,
        () => {
          setIsLoading(false);
          setModalData({
            title: "¡Registro exitoso!",
            message: "El registro se realizó correctamente.",
            isVisible: true,
            isSuccess: true,
            successBtnText: "IR AL LOGIN",
          });
        },
        () => {
          setIsLoading(false);
          console.log("Error creando usuario...");
        }
      );
    }
  };

  const validateForm = async () => {
  
    const isEmailValid = await validateRequired(email);

    if(!isEmailValid){
      setValidations(prevState => ({ ...prevState, email: false }));
      setValidationMessages(prevState => ({ ...prevState, email: "El email es requerido..." }));
    }

    const isNombreValid = await validateRequired(nombre);

    if(!isNombreValid){
      setValidations(prevState => ({ ...prevState, nombre: false }));
      setValidationMessages(prevState => ({ ...prevState, nombre: "El nombre es requerido..." }));
    }

    const isApellidoValid = await validateRequired(apellido);

    if(!isApellidoValid){
      setValidations(prevState => ({ ...prevState, apellido: false }));
      setValidationMessages(prevState => ({ ...prevState, apellido: "El apellido es requerido..." }));
    }

    const isPasswordValid = await validateRequired(password);

    if(!isPasswordValid){
      setValidations(prevState => ({ ...prevState, password: false }));
      setValidationMessages(prevState => ({ ...prevState, password: "El password es requerido..." }));
    }

    const isRepeatPasswordValid = await validateRequired(repeatPassword);

    if(!isRepeatPasswordValid){
      setValidations(prevState => ({ ...prevState, repeatPassword: false }));
      setValidationMessages(prevState => ({ ...prevState, repeatPassword: "El campo repetir password es requerido..." }));
    }

    var isValidPasswords = true;

    if(isPasswordValid && isRepeatPasswordValid && password != repeatPassword){
      isValidPasswords = false;
      setValidations(prevState => ({ ...prevState, repeatPassword: false }));
      setValidationMessages(prevState => ({ ...prevState, repeatPassword: "Las password no coinciden..." }));
    }
    
    return isEmailValid && isNombreValid && isApellidoValid && isPasswordValid && isRepeatPasswordValid && isValidPasswords;
  };

  const limpiarState = () => {
    setEmail("");
    setNombre("");
    setApellido("");
    setPassword("");
    setRepeatPassword("");
  }

  const onLogin = () => {
    limpiarState();
    navigation.navigate("Login");
  }

  const onBack = () => { 
    limpiarState();
    navigation.navigate("Login");
  }

  return (
    <ScrollView style={screenStyles.screen}>
      <Textbox
          placeholder="Email..."
          handleChange={handleChangeEmail}
          value={email}
          isValid={validations.email}
          validationMessage={validationMessages.email}
        />
        <Textbox
          placeholder="Nombre..."
          handleChange={handleChangeNombre}
          value={nombre}
          isValid={validations.nombre}
          validationMessage={validationMessages.nombre}
        />
        <Textbox
          placeholder="Apellido..."
          handleChange={handleChangeApellido}
          value={apellido}
          isValid={validations.apellido}
          validationMessage={validationMessages.apellido}
        />
        <Textbox
          placeholder="Password..."
          handleChange={handleChangePassword}
          value={password}
          isValid={validations.password}
          validationMessage={validationMessages.password}
          isPassword={true}
        />
        <Textbox
          placeholder="Repetir password..."
          handleChange={handleChangeRepeatPassword}
          value={repeatPassword}
          isValid={validations.repeatPassword}
          validationMessage={validationMessages.repeatPassword}
          isPassword={true}
        />

      <TouchableOpacity onPress={onRegister} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>REGISTRARSE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBack} style={buttonStyles.btnBack}>
        <Text style={buttonStyles.btnBackText}>Volver</Text>
      </TouchableOpacity>

      <CustomSpinner isLoading={isLoading} text={"Registrando usuario..."} />

      <CustomModal
        isSuccess={modalData?.isSuccess}
        title={modalData?.title}
        message={modalData?.message}
        isVisible={modalData?.isVisible}
        successBtnText={modalData?.successBtnText}
        handleBtnOnSuccess={onLogin}
      />

    </ScrollView>
  );
}

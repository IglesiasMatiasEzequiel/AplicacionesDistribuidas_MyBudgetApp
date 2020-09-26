import React from "react";
import { TouchableOpacity, ScrollView, Text } from "react-native";
import { Textbox, CustomSpinner, CustomModal } from "../../components";
import { screenStyles, buttonStyles } from "../../components/Styles";

import { insertUsuario } from "../../components/DataBase";
import { validateRequired } from "../../components/Validations";

export default function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [form, setForm] = React.useState({
    email: "",
    nombre: "",
    apellido: "",
    password: "",
    repeatPassword: "",
  });

  const [validations, setValidations] = React.useState({
    email: true,
    nombre: true,
    apellido: true,
    password: true,
    repeatPassword: true,
  });

  const [validationMessages, setValidationMessages] = React.useState({
    email: "",
    nombre: "",
    apellido: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value }));
  };

  const onRegister = async () => {
    const isValidForm = await validateForm();

    if (isValidForm) {
      setIsLoading(true);

      var usuario = {
        email: form.email,
        nombre: form.nombre,
        apellido: form.apellido,
        password: form.password
      }

      insertUsuario(usuario, 
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
    const isEmailValid = await validateRequired(form.email);
    const isNombreValid = await validateRequired(form.nombre);
    const isApellidoValid = await validateRequired(form.apellido);
    const isPasswordValid = await validateRequired(form.password);
    const isRepeatPasswordValid = await validateRequired(form.repeatPassword);

    var isValidPasswords =
      isPasswordValid && isRepeatPasswordValid && form.password == form.repeatPassword;

    setValidations((prevState) => ({
      ...prevState,
      email: isEmailValid,
      nombre: isNombreValid,
      apellido: isApellidoValid,
      password: isPasswordValid,
      repeatPassword: isRepeatPasswordValid && isValidPasswords,
    }));

    setValidationMessages((prevState) => ({
      ...prevState,
      email: !isEmailValid ? "El email es requerido..." : "",
      nombre: !isNombreValid ? "El nombre es requerido..." : "",
      apellido: !isApellidoValid ? "El apellido es requerido..." : "",
      password: !isPasswordValid ? "El password es requerido..." : "",
      repeatPassword: !isRepeatPasswordValid
        ? "El otro password es requerido..."
        : !isValidPasswords
        ? "Las password no coinciden..."
        : "",
    }));

    return (
      isEmailValid &&
      isNombreValid &&
      isApellidoValid &&
      isPasswordValid &&
      isRepeatPasswordValid &&
      isValidPasswords
    );
  };

  const limpiarState = () => {
    setForm({
      email: "",
      nombre: "",
      apellido: "",
      password: "",
      repeatPassword: "",
    });

    setValidations({
      email: true,
      nombre: true,
      apellido: true,
      password: true,
      repeatPassword: true,
    });

    setValidationMessages({
      email: "",
      nombre: "",
      apellido: "",
      password: "",
      repeatPassword: "",
    });
  };

  const onLogin = () => {
    limpiarState();
    navigation.navigate("Login");
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={screenStyles.screen}>
      <Textbox
        propName="email"
        placeholder="Email..."
        handleChange={handleChange}
        value={form.email}
        isValid={validations.email}
        validationMessage={validationMessages.email}
      />
      <Textbox
        propName="nombre"
        placeholder="Nombre..."
        handleChange={handleChange}
        value={form.nombre}
        isValid={validations.nombre}
        validationMessage={validationMessages.nombre}
      />
      <Textbox
        propName="apellido"
        placeholder="Apellido..."
        handleChange={handleChange}
        value={form.apellido}
        isValid={validations.apellido}
        validationMessage={validationMessages.apellido}
      />
      <Textbox
        propName="password"
        placeholder="Password..."
        handleChange={handleChange}
        value={form.password}
        isValid={validations.password}
        validationMessage={validationMessages.password}
        isPassword={true}
      />
      <Textbox
        propName="repeatPassword"
        placeholder="Repetir password..."
        handleChange={handleChange}
        value={form.repeatPassword}
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

import React from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Text, theme } from "galio-framework";
import { CustomSpinner, CustomModal } from "../../components";
import {
  screenStyles,
  buttonStyles,
  textboxStyles
} from "../../components/Styles";

import { insertUsuario } from '../../components/DataBase';

export default function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");

  const handleChangeEmail = (email) => setEmail(email);
  const handleChangeNombre = (nombre) => setNombre(nombre);
  const handleChangeApellido = (apellido) => setApellido(apellido);
  const handleChangePassword = (password) => setPassword(password);
  const handleChangeRepeatPassword = (repeatPassword) =>
    setRepeatPassword(repeatPassword);

  const onRegister = () => {
    setIsLoading(true);
    insertUsuario(email, nombre, apellido, password, () => { 
      setIsLoading(false);
      setModalData({ 
        title: "¡Registro exitoso!",
        message: "El registro se realizó correctamente.",
        isVisible: true,
        isSuccess: true,
        successBtnText: "IR AL LOGIN"
      });
    }, () => { 
      setIsLoading(false);
      console.log('Error creando usuario...')
    });
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
          style={textboxStyles.textbox}
          placeholder="Nombre..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangeNombre(text)}
          value={nombre}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Apellido..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangeApellido(text)}
          value={apellido}
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
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          secureTextEntry
          style={textboxStyles.textbox}
          placeholder="Repetir password..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangeRepeatPassword(text)}
          value={repeatPassword}
        />
      </View>

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

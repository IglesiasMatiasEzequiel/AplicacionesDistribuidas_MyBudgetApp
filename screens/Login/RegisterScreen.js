import React from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Text, theme } from "galio-framework";
import { CustomSpinner, CustomModal } from "../../components";
import {
  screenStyles,
  buttonStyles,
  textboxStyles
} from "../../components/Styles";

export default function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
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

    setTimeout(() => {
      setIsLoading(false);
      setIsModalVisible(true);
    }, 1500);
  };

  const onLogin = () => navigation.navigate("Login");
  const onBack = () => navigation.navigate("Login");

  return (
    <ScrollView style={screenStyles.screen}>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Email..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangeEmail(text)}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Nombre..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangeNombre(text)}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Apellido..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangeApellido(text)}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          secureTextEntry
          style={textboxStyles.textbox}
          placeholder="Password..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangePassword(text)}
        />
      </View>
      <View style={textboxStyles.textboxContainer}>
        <TextInput
          secureTextEntry
          style={textboxStyles.textbox}
          placeholder="Repetir password..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangeRepeatPassword(text)}
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
        title="¡Registro exitoso!"
        message="El registro se realizó correctamente."
        isVisible={!isLoading && isModalVisible}
        successBtnText="IR AL LOGIN"
        handleBtnOnSuccess={onLogin}
      />
    </ScrollView>
  );
}

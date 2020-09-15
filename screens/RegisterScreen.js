import React from "react";
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, theme } from "galio-framework";
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
    registerText: {
      color: "white",
    },
    spinnerTextStyle: {
      color: '#FFF'
    },
  });

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
  const handleChangeRepeatPassword = (repeatPassword) => setRepeatPassword(repeatPassword);

  const onRegister = () => { 

    setIsLoading(true);

    setTimeout(() => { 
      setIsLoading(false);
      setIsModalVisible(true);
    }, 1500);
  }

  const onLogin = () => navigation.navigate("Login");
  const onBack = () => navigation.navigate("Login");

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
          message="El registro se realizó correctamente."
          isVisible={!isLoading && isModalVisible} 
          successBtnText="IR AL LOGIN"
          handleBtnOnSuccess={onLogin}
          />

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(text) => handleChangeEmail(text)}
          />
        </View>
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
            value=""
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(text) => handleChangePassword(text)}
            value=""
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Repetir password..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(text) => handleChangeRepeatPassword(text)}
            value=""
          />
        </View>

        <TouchableOpacity onPress={onRegister} style={styles.registerBtn}>
          <Text style={styles.registerText}>REGISTRARSE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

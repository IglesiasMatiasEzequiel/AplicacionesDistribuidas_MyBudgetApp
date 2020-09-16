import React from "react";
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, theme } from "galio-framework";
import CustomModal from '../../components/CustomModal';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';


const { width } = Dimensions.get("screen");

export default function LoginScreen({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.COLORS.DEFAULT,
      alignItems: "center",
      justifyContent: "center",
    },
    messageContainer: {
      padding: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    inputView: {
      width: width,
      borderRadius: 5,
      height: 50,
      marginBottom: 20,
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
    sendEmailBtn: {
      width: width - theme.SIZES.BASE * 2,
      backgroundColor: "#69037B",
      borderRadius: 5,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      marginBottom: theme.SIZES.BASE,
    },
    sendEmailText: {
      color: "white",
    },
    spinnerTextStyle: {
      color: '#FFF'
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleChangeEmail = (email) => setEmail(email);

  const onSendEmail = () => { 

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
          title="¡Envío de mail exitoso!"
          message="Se le ha enviado un email a su correo para que pueda realizar el cambio de password."
          isVisible={!isLoading && isModalVisible}
          successBtnText="IR AL LOGIN"
          handleBtnOnSuccess={onLogin}
        />

        <View style={styles.messageContainer}>
          <Text>
            Se le enviará un correo a su dirección de mail para que pueda
            realizar el cambio de password.
          </Text>
        </View>

        <View style={styles.inputView}>
          <FilledTextField
            style={styles.inputText}
            label="Email"
            onChangeText={(text) => handleChangeEmail(text)}
            error="oohh un error"
          />
        </View>

        <TouchableOpacity onPress={onSendEmail} style={styles.sendEmailBtn}>
          <Text style={styles.sendEmailText}>ENVIAR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

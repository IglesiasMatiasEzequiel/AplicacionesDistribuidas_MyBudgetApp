import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text, theme } from "galio-framework";
import {
  screenStyles,
  buttonStyles,
  textboxStyles,
  messageStyles,
} from "../../components/Styles";
import { CustomSpinner, CustomModal } from "../../components";

export default function LoginScreen({ navigation }) {
  const styles = StyleSheet.create({
    messageContainer: {
      padding: 30,
      alignItems: "center",
      justifyContent: "center",
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
  };

  const onLogin = () => navigation.navigate("Login");
  const onBack = () => navigation.navigate("Login");

  return (
    <ScrollView style={screenStyles.screen}>
      <CustomSpinner isLoading={isLoading} />

      <CustomModal
        title="¡Envío de mail exitoso!"
        message="Se le ha enviado un email a su correo para que pueda realizar el cambio de password."
        isVisible={!isLoading && isModalVisible}
        successBtnText="IR AL LOGIN"
        handleBtnOnSuccess={onLogin}
      />

      <View style={messageStyles.messageContainer}>
        <Text style={messageStyles.message}>
          Se le enviará un correo a su dirección de mail para que pueda realizar
          el cambio de password.
        </Text>
      </View>

      <View style={textboxStyles.textboxContainer}>
        <TextInput
          style={textboxStyles.textbox}
          placeholder="Email..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangeEmail(text)}
        />
      </View>

      <TouchableOpacity onPress={onSendEmail} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>ENVIAR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBack} style={buttonStyles.btnBack}>
        <Text style={buttonStyles.btnBackText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

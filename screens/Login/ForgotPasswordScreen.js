import React from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Text, theme } from "galio-framework";
import {
  screenStyles,
  buttonStyles,
  textboxStyles,
  messageStyles,
} from "../../components/Styles";
import { CustomSpinner, CustomModal } from "../../components";

export default function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [email, setEmail] = React.useState("");

  const handleChangeEmail = (email) => setEmail(email);

  const onSendEmail = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      
      setModalData({ 
        title: "¡Envío de mail exitoso!",
        message: "Se le ha enviado un email a su correo para que pueda realizar el cambio de password.",
        isVisible: true,
        isSuccess: true,
        successBtnText: "IR AL LOGIN"
      });

    }, 1500);
  };

  const onLogin = () => navigation.navigate("Login");
  const onBack = () => navigation.navigate("Login");

  return (
    <ScrollView style={screenStyles.screen}>
      <CustomSpinner isLoading={isLoading} text={"Cargando..."} />

      <CustomModal
        isSuccess={modalData?.isSuccess}
        title={modalData?.title}
        message={modalData?.message}
        isVisible={modalData?.isVisible}
        successBtnText={modalData?.successBtnText}
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
          value={email}
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

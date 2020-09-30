import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Textbox, CustomModal, CustomSpinner } from "../../components";
import { screenStyles, buttonStyles } from "../../components/Styles";

import { DataBase, TarjetasQueries, UsuariosQueries, NotificacionesQueries } from "../../database";
import * as Session from "../../components/Session";
import { validateRequired } from "../../components/Validations";
import { formatStringDateToDB, formatDateToString } from '../../components/Formatters'

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

  const [form, setForm] = React.useState({
    email: "usuario.test@uade.edu.ar",
    password: "123456",
  });

  const [validations, setValidations] = React.useState({
    email: true,
    password: true,
  });

  const [validationMessages, setValidationMessages] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (prop, value) => {
    setValidations((prevState) => ({ ...prevState, [prop]: true }));
    setForm((prevState) => ({ ...prevState, [prop]: value }));
  };

  const onLogin = async () => {
    
    Session.cleanSession();

    const isValidForm = await validateForm();

    if (isValidForm) {
      setIsLoading(true);

      var loginObj = {
        email: form.email,
        password: form.password
      }

      UsuariosQueries._login(loginObj, async (data) => {

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

            Session.setUser(usuario);

            enviarNotificaciones(usuario.id);

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
          console.log("Ocurrió un error en la autenticación.");
        }
      );
    }
  };

  const enviarNotificaciones = (idUsuario) => {
    enviarNotificacionesResumenTarjeta(idUsuario);
    enviarNotificacionesInversiones(idUsuario);
  }

  const enviarNotificacionesResumenTarjeta = (idUsuario) => {
    var today = new Date();
    var todayFormatted = formatStringDateToDB(formatDateToString(today));

    TarjetasQueries._getTarjetasActualizarResumen(
      idUsuario,
      todayFormatted,
      (data) => {
        if (data !== null && data.length > 0) {
          DataBase._createTransaction((tx) => {
            data.forEach(tarjeta => {
              NotificacionesQueries._insertTx(tx, {
                idUsuario: idUsuario, 
                titulo: 'Fecha de Resúmen de Tarjeta',
                mensaje: 'Debe actualizar la fecha del resúmen de la tarjeta ' + tarjeta.tarjeta,
                fecha: todayFormatted,
                leido: 0
              });
            });
          });
        }
      }
    );
  }

  const enviarNotificacionesInversiones = (idUsuario) => {
    
  }

  const validateForm = async () => {
    const isEmailValid = await validateRequired(form.email);
    const isPasswordValid = await validateRequired(form.password);

    setValidations((prevState) => ({
      ...prevState,
      email: isEmailValid,
      password: isPasswordValid,
    }));

    setValidationMessages((prevState) => ({
      ...prevState,
      email: !isEmailValid ? "El email es requerido..." : "",
      password: !isPasswordValid ? "El password es requerido..." : "",
    }));

    return isEmailValid && isPasswordValid;
  };

  const limpiarState = () => {
    setForm({
      email: "",
      password: "",
    });

    setValidations({
      email: true,
      password: true,
    });

    setValidationMessages({
      email: "",
      password: "",
    });
  };

  const onCloseModal = () => setModalData(prevState => ({ ...prevState, isVisible: false }));

  const onRegister = () => {
    limpiarState();
    navigation.navigate("Register");
  };

  const onForgotPassword = () => {
    limpiarState();
    navigation.navigate("ForgotPassword");
  };

  return (

    <ScrollView style={screenStyles.screen}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>MyBudgetApp</Text>
      </View>
      <Textbox
        propName="email"
        placeholder="Email..."
        handleChange={handleChange}
        value={form.email}
        isValid={validations.email}
        validationMessage={validationMessages.email}
        keyboardType='email-address'
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
      <TouchableOpacity onPress={onForgotPassword} style={buttonStyles.btnBack}>
        <Text style={buttonStyles.btnBackText}>Olvidaste tu password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onLogin} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>INGRESAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onRegister} style={buttonStyles.btnBack}>
        <Text style={buttonStyles.btnBackText}>Registrarse</Text>
      </TouchableOpacity>

      <CustomSpinner isLoading={isLoading} text="Ingresando..." />

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

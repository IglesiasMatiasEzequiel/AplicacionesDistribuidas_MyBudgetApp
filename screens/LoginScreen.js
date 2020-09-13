import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import { Text, theme } from "galio-framework";

const { width } = Dimensions.get("screen");

export default function LoginScreen({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.COLORS.DEFAULT,
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      fontWeight: "bold",
      fontSize: 50,
      color: "#69037B",
      marginBottom: 40,
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
    forgot: {
      color: "black",
      fontSize: 11,
    },
    loginBtn: {
      width: width - theme.SIZES.BASE * 2,
      backgroundColor: "#69037B",
      borderRadius: 5,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      marginBottom: theme.SIZES.BASE,
    },
    loginText: {
      color: "white",
    },
    signInText: {
      color: "black",
    },
  });

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangeEmail = (email) => setEmail(email);
  const handleChangePassword = (password) => setPassword(password);

  const onLogin = () => navigation.navigate("App");

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MyBudgetApp</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangeEmail(text)}
          value="matiiglesias@uade.edu.ar"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor={theme.COLORS.PLACEHOLDER}
          onChangeText={(text) => handleChangePassword(text)}
          value="123456"
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Olvidaste tu password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onLogin} style={styles.loginBtn}>
        <Text style={styles.loginText}>INGRESAR</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.signInText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

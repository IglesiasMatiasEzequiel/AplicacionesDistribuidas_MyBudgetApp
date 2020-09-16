import React from "react";
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { Text, theme } from "galio-framework";
import CustomModal from '../../components/CustomModal';

const { width } = Dimensions.get("screen");

export default function TarjetasScreen({ navigation }) {
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


  const [email, setEmail] = React.useState("");
  const handleChangeEmail = (email) => setEmail(email);

  const onBack = () => navigation.navigate("Home");

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('NuevaTarjeta')} style={styles.registerBtn}>
          <Text style={styles.registerText}>Nueva Tarjeta</Text>
        </TouchableOpacity>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Nueva Tarjeta..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(text) => handleChangeEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Nueva Tarjeta..."
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(text) => handleChangeEmail(text)}
          />
        </View>

        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
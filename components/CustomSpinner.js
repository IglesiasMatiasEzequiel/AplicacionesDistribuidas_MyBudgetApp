import React from "react";
import { StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const styles = StyleSheet.create({
  spinnerText: {
    color: "#FFF",
  }
});

export default function CustomSpinner({ isLoading, text }) {
  
  text = text || "Cargando...";

  return (
    <Spinner
      visible={isLoading}
      textContent={text}
      textStyle={styles.spinnerText}
      overlayColor={"rgba(0, 0, 0, 0.75)"}
    />
  );
}

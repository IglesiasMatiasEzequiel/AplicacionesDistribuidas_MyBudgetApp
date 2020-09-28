import React from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Card } from "react-native-elements";
import { theme, Text } from "galio-framework";

const styles = StyleSheet.create({
  messageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtn: {
    alignItems: "center",
    justifyContent: "center"
  },
  cancelBtnText: {
    color: "black",
    fontSize: 11,
  },
  successBtn: {
    backgroundColor: "#69037B",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: theme.SIZES.BASE,
  },
  successBtnText: {
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,.5)",
  },
});

export default function CustomModal({
  title,
  message,
  isVisible,
  isSuccess,
  showErrorBtn,
  successBtnText,
  handleBtnOnSuccess,
  errorBtnText,
  handleBtnOnError,
}) {
  isVisible = isVisible === null || isVisible === undefined ? false : isVisible;
  isSuccess = isSuccess === null || isSuccess === undefined ? true : isSuccess;
  showErrorBtn =
    showErrorBtn === null || showErrorBtn === undefined ? false : showErrorBtn;

  title = title || (isSuccess ? "¡Operación exitosa!" : "Error");
  message =
    message ||
    (isSuccess
      ? "La operación se realizó correctamente."
      : "Oops, hubo un error al realizar la operación.");

  successBtnText = successBtnText || "ACEPTAR";
  errorBtnText = errorBtnText || "Cancelar";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      presentationStyle="overFullScreen"
      visible={isVisible}
    >
      <View style={styles.centeredView}>
        <Card>
          <Card.Title>{title}</Card.Title>
          <Card.Divider />
          <View style={styles.messageContainer}>
            <Text>{message}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleBtnOnSuccess}
              style={styles.successBtn}
            >
              <Text style={styles.successBtnText}>{successBtnText}</Text>
            </TouchableOpacity>

            {showErrorBtn && (
              <TouchableOpacity 
                onPress={handleBtnOnError}
                style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>{errorBtnText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </Card>
      </View>
    </Modal>
  );
}

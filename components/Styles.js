import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { theme } from "galio-framework";

const { width } = Dimensions.get("screen");

const screenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.COLORS.DEFAULT,
    padding: 20
  },
  dashboardScreen: {
    flex: 1,
    backgroundColor: theme.COLORS.DEFAULT,
    padding: 5
  },
  containerColumns: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  containerDivider: {
    borderBottomColor: "#69037B",
    borderBottomWidth: 1,
    marginBottom: 20
  },
  container: {
    marginBottom: 20
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const titleStyles = StyleSheet.create({
  titleContainer: {
    paddingTop: 20,
    paddingBottom: 20
  },
  titleText: {
    fontWeight: "bold",
    color: "#69037B"
  },
});

const messageStyles = StyleSheet.create({
  messageContainer: {
    width: width - 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.SIZES.BASE,
  },
  message: {
    color: "black",
    fontSize: 16,
  },
});

const buttonStyles = StyleSheet.create({
  btn: {
    backgroundColor: "#69037B",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: theme.SIZES.BASE,
  },
  btnGreen: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: theme.SIZES.BASE,
  },
  btnFilter: {
    backgroundColor: "#CCC",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: theme.SIZES.BASE,
  },
  btnTable: {
    backgroundColor: "#AA3939",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTableSuccess: {
    backgroundColor: "#3AA63A",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTableDelete: {
    backgroundColor: "#AA3939",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTableEdit: {
    backgroundColor: "#6698BF",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
  },
  btnFilterText: {
    color: "black",
  },
  btnBack: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnBackText: {
    color: "black",
    fontSize: 11,
  },
});

const dropdownStyles = StyleSheet.create({
  dropdownContainer: {
    width: width - 40,
    height: 50,   
  },
  dropdown: {
    backgroundColor: "#FAFAFA"
  },
  dropdownError: {
    borderColor: "red",
    borderWidth: 1
  },
  dropdownItem: {
    justifyContent: "flex-start",
  },
  dropdownLabelError: {
    color: 'red'
  }
});

const textboxStyles = StyleSheet.create({
  textboxContainer: {
    width: width - 40,
    backgroundColor: "white",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    padding: 20,
  },
  textboxContainerError: {
    borderWidth: 1,
    borderColor: "red"
  },
  textbox: {
    height: 50,
    color: "black",
  },
  validationText: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingBottom: 10
  }
});

const radioButtonStyles = StyleSheet.create({
  rbContainer: {

  },
  rbText: {

  }
});

const tableStyles = StyleSheet.create({
  tableContainer: {
    flex: 1,
  },
  tableHeader: {
    height: 50,
    backgroundColor: "transparent",
  },
  tableHeaderBorder: {
    borderWidth: 0,
    borderColor: "#C1C0B9"
  },
  tableHeadertext: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
  tableDataContainer: {
    marginTop: -1,
  },
  tableDataBorder: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "#C1C0B9",
  },
  tableRow: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: "#E7E6E1",
  },
  tableRowtext: {
    textAlign: "center",
    fontWeight: "100",
    fontSize: 18
  },
});

const notificationStyles = StyleSheet.create({
  notificationContainer: {
    flex: 1
  },
  notification: {
    backgroundColor: '#E7E6E1',
    padding: 10,
  },
  notificationTitle: {
    fontSize: 18,
  },
  notificationMessage: {
    fontSize: 14,
  }
});

const alertStyles = StyleSheet.create({
  alertContainer: {
    width: '100%',
    borderRadius: 5,
    justifyContent: "center",
    padding: 15,
  },
  alertContainerSuccess: {
    backgroundColor: "#4FCD4F"
  },
  alertContainerWarning: {
    backgroundColor: "#FDFD56"
  },
  alertContainerDanger: {
    backgroundColor: "#FF6363"
  },
  alertContainerInfo: {
    backgroundColor: "#6698BF"
  },
  alertTextSuccess: {
    color: "#058205"
  },
  alertTextWarning: {
    color: "#9D9D00"
  },
  alertTextDanger: {
    color: "#A20606"
  },
  alertTextInfo: {
    color: "#073C65"
  }
});

export {
  screenStyles,
  messageStyles,
  buttonStyles,
  textboxStyles,
  dropdownStyles,
  tableStyles,
  titleStyles,
  radioButtonStyles,
  notificationStyles,
  alertStyles
};

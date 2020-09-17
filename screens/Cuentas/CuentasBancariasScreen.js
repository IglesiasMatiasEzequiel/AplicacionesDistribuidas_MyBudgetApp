import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import {
  screenStyles,
  buttonStyles,
  tableStyles,
  titleStyles,
} from "../../components/Styles";
import { Text } from "galio-framework";
import { Table, Row } from "react-native-table-component";

export default function CuentasBancariasScreen({ navigation }) {
  const onNuevaCuenta = () => navigation.navigate("NuevaCuenta");
  const onAdministrarCuenta = () => navigation.navigate("AdministrarCuenta");

  const tableHeaders = [
    "Número Cuenta",
    "Descripción",
    "Banco",
    "Número Tarjeta",
    "F. Venc.",,
  ];
  const columnWidth = [250, 200, 200, 120, 80];

  const tableData = [
    ["28505909 40090418135201", "Caja de ahorro - Galicia", "Galicia", "**** **** **** 9999", "12/24"],
    ["28503409 40090417835202", "Caja de ahorro", "BBVA Francés", "**** **** **** 6789", "12/22"],
  ];

  return (
    <ScrollView style={screenStyles.screen}>
      <TouchableOpacity onPress={onNuevaCuenta} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Nueva Cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onAdministrarCuenta} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Administrar Cuentas</Text>
      </TouchableOpacity>

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Mis Cuentas
        </Text>
      </View>

      <View style={tableStyles.tableContainer}>
        <ScrollView horizontal>
          <View>
            <Table borderStyle={tableStyles.tableHeaderBorder}>
              <Row
                data={tableHeaders}
                widthArr={columnWidth}
                style={tableStyles.tableHeader}
                textStyle={tableStyles.tableHeadertext}
              />
            </Table>
            <ScrollView
              style={[tableStyles.tableDataContainer, { height: 200 }]}
            >
              <Table borderStyle={tableStyles.tableDataBorder}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={columnWidth}
                    style={[
                      tableStyles.tableRow,
                      index % 2 && { backgroundColor: "transparent" },
                    ]}
                    textStyle={tableStyles.tableRowtext}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

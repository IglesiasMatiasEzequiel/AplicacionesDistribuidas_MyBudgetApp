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
  const onNuevaTarjeta = () => navigation.navigate("NuevaTarjeta");
  const onBorrarTarjeta = () => navigation.navigate("BorrarTarjeta");

  const tableHeaders = [
    "Número",
    "Banco",
    "F. Venc.",
    "F. Cierre Resúmen",
    "F. Venc. Resúmen",
  ];
  const columnWidth = [150, 120, 120, 120, 120];

  const tableData = [
    ["**** **** **** 0856", "Galicia", "12/24", "01/09/2020", "01/09/2020"],
    ["**** **** **** 4562", "BBVA Francés", "12/22", "01/09/2020", "01/09/2020"],
  ];

  return (
    <ScrollView style={screenStyles.screen}>
      <TouchableOpacity onPress={onNuevaTarjeta} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Nuevo Tarjeta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBorrarTarjeta} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Borrar Tarjeta</Text>
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

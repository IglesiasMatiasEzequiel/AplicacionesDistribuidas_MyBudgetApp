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

export default function PrestamosScreen({ navigation }) {
  const onNuevoPrestamos = () => navigation.navigate("NuevoPrestamo");
  const onBorrarPrestamo= () => navigation.navigate("BorrarPrestamo");

  const tableHeaders = [
    "Tipo",
    "Destino/Emisor",
    "Monto",
    "Intereses",
  ];
  const columnWidth = [150, 200, 150, 120];

  const tableData = [
    ["Realizados", "Santiago Garcia", "$4000","%4"],
    ["Tomados", "Banco Santander", "$10000", "%34"],
    ["Tomados", "Banco Galicia", "$8000", "%23"],
  ];

  return (
    <ScrollView style={screenStyles.screen}>
      <TouchableOpacity onPress={onNuevoPrestamos} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Nuevo Prestamos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBorrarPrestamo} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Borrar Prestamos</Text>
      </TouchableOpacity>

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Mis prestamos
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
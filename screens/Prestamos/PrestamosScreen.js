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
  const onNuevaInversion = () => navigation.navigate("NuevaInversion");
  const onBorrarInversion= () => navigation.navigate("BorrarInversion");
  const onVerGastos = () => navigation.navigate("GastosTarjeta");

  const tableHeaders = [
    "Tipo",
    "Destino/Emisor",
    "Monto",
    "Duracion",
  ];
  const columnWidth = [150, 80, 150, 150,200];

  const tableData = [
    ["Accciones", "$5000", "01/12/2019", "", "Banco Galicia"],
    ["Plazo Fijo", "$7000", "01/02/2020", "7 meses", ""],
  ];

  return (
    <ScrollView style={screenStyles.screen}>
      <TouchableOpacity onPress={onNuevaInversion} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Nuevo Prestamos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBorrarInversion} style={buttonStyles.btn}>
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
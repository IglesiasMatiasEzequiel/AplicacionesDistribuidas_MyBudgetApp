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

export default function PresupuestosScreen({ navigation }) {
  const onNuevoPresupuesto = () => navigation.navigate("NuevoPresupuesto");
  const onBorrarPresupuesto= () => navigation.navigate("BorrarPresupuesto");

  const tableHeaders = [
    "Mes/Año",
    "Tipo",
    "Descripcion",
    "Monto",
  ];
  const columnWidth = [ 100, 200, 200,100];

  const tableData = [
    ["08/2020", "Alquiler", "Alquiler del mes de Agosto", "$5000"],
    ["08/2020", "Luz/Gas/Agua", "Impuestos de mes en Agosto", "$7000"],
  ];

  return (
    <ScrollView style={screenStyles.screen}>
      <TouchableOpacity onPress={onNuevoPresupuesto} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Nuevo Presupuesto</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBorrarPresupuesto} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Borrar Presupuesto</Text>
      </TouchableOpacity>

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Mis presupuestos
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
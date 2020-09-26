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

import { selectPresupuestos } from '../../components/DataBase';

export default function PresupuestosScreen({ navigation }) {
  const onNuevoPresupuesto = () => navigation.navigate("NuevoPresupuesto");
  const onBorrarPresupuesto= () => navigation.navigate("BorrarPresupuesto");

  const tableHeaders = [
    "Tipo",
    "Monto",
    "FechaInicio",
  ];
  const columnWidth = [ 100, 100, 100];

  const idUsuario = 1;
  selectPresupuestos = async (idUsuario, (data) => { 
    console.log('Leyendo presupuestos')
    console.log(data)
  }, () => { 
    console.log('Error leyendo presupuesto')
  });
  

  const tableData = [
    ["Alquiler", "$5000" , "10/10/2020"],
    ["Luz/Gas/Agua", "$7000", "10/10/2020"],
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
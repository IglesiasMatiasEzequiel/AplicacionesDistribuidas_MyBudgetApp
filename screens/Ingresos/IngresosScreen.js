import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import {
  screenStyles,
  buttonStyles,
  tableStyles,
  titleStyles,
} from "../../components/Styles";

import { Table, Row } from "react-native-table-component";
import { Text } from "galio-framework";

export default function Ingresos({ navigation }) {
  const onNuevoIngreso = () => navigation.navigate("NuevoIngreso");
  const onBorrarIngreso = () => navigation.navigate("BorrarIngreso");
  const onUltimoAnio = () => {};
  const onUltimoMes = () => {};

  const tableHeaders = ["Tipo", "Categoría", "Destino", "Descripcion", "Monto"];
  const columnWidth = [120, 120, 120, 120, 120];

  const tableData = [
    ["Periódico", "Sueldo", "Cuenta Bancaria", "Sueldo", "$ 5000"],
    ["Periódico", "Alquiler", "Cuenta Bancaria", "Depto1", "$ 3000"],
    ["Periódico", "Alquiler", "Cuenta Bancaria", "Depto2", "$ 3200"],
    ["Periódico", "Alquiler", "Cuenta Bancaria", "Depto3", "$ 3800"],
    ["Extraordinario", "-", "Efectivo", "Tio", "$ 400"],
    ["Extraordinario", "-", "Efectivo", "Tio", "$ 800"],
    ["Extraordinario", "-", "Efectivo", "Hermano", "$ 500"],
    ["Extraordinario", "-", "Efectivo", "Hermano", "$ 1000"],
    ["Extraordinario", "-", "Efectivo", "Amigos", "$ 2000"],
    ["Extraordinario", "-", "Efectivo", "Amigos", "$ 3000"],
    ["Extraordinario", "-", "Efectivo", "Amigos", "$ 4000"],
    ["Extraordinario", "-", "Efectivo", "Amigos", "$ 5000"],
    ["Extraordinario", "-", "Efectivo", "Amigos", "$ 6000"],
    ["Extraordinario", "-", "Efectivo", "Amigos", "$ 7000"],
    ["Extraordinario", "-", "Efectivo", "Amigos", "$ 8000"],
  ];

  return (
    <ScrollView style={screenStyles.screen}>
      <TouchableOpacity onPress={onNuevoIngreso} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Nuevo Ingreso</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBorrarIngreso} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Borrar Ingreso</Text>
      </TouchableOpacity>

      <View style={[screenStyles.containerColumns]}>
        <View style={{ width: "50%" }}>
          <TouchableOpacity
            onPress={onUltimoAnio}
            style={[buttonStyles.btnFilter, { marginRight: 10 }]}
          >
            <Text style={buttonStyles.btnFilterText}>Ultimo Año</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "50%" }}>
          <TouchableOpacity
            onPress={onUltimoMes}
            style={[buttonStyles.btnFilter, { marginLeft: 10 }]}
          >
            <Text style={buttonStyles.btnFilterText}>Ultimo Mes</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Últimos Ingresos
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

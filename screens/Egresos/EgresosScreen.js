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

export default function Egresos({ navigation }) {
  const onNuevoEgreso = () => navigation.navigate("NuevoEgreso");
  const onBorrarEgreso = () => navigation.navigate("BorrarEgreso");
  const onUltimoAnio = () => {};
  const onUltimoMes = () => {};

  const tableHeaders = ["Tipo", "Categoria", "Medio Pago", "Cuotas", "Fecha", "Monto"];
  const columnWidth = [120, 150, 120, 60, 120, 120];

  const tableData = [
    ["Periódico", "Servicios - Luz", "Tarjeta Crédito", "1", "17/9/2020", "$ 5000"],
    ["Periódico", "Servicios - Gas", "Tarjeta Crédito", "1", "17/9/2020", "$ 3000"],
    ["Periódico", "Servicios - Cable", "Tarjeta Crédito", "1", "17/9/2020", "$ 3200"],
    ["Periódico", "Servicios - Teléfono", "Tarjeta Crédito", "1", "17/9/2020", "$ 3800"],
    ["Extraordinario", "-", "Efectivo", "-", "17/9/2020", "$ 400"],
    ["Extraordinario", "-", "Efectivo", "-", "17/9/2020", "$ 800"],
    ["Extraordinario", "-", "Efectivo", "-", "17/9/2020", "$ 500"],
    ["Extraordinario", "-", "Efectivo", "-", "17/9/2020", "$ 1000"],
    ["Extraordinario", "-", "Efectivo", "-", "17/9/2020", "$ 2000"]
  ];

  return (
    <ScrollView style={screenStyles.screen}>
      <TouchableOpacity onPress={onNuevoEgreso} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Nuevo Egreso</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBorrarEgreso} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Borrar Egreso</Text>
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
          Últimos Egresos
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

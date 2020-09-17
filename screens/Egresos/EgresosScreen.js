import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import {
  screenStyles,
  buttonStyles,
  tableStyles,
  titleStyles,
  dropdownStyles
} from "../../components/Styles";
import {
  periodosData
} from "../../components/Data";

import DropDownPicker from "react-native-dropdown-picker";
import { Table, Row } from "react-native-table-component";
import { Text } from "galio-framework";

export default function Egresos({ navigation }) {

  const [periodo, setPeriodo] = React.useState(null);

  const handleChangePeriodo = (periodo) => setPeriodo(periodo);

  const onNuevoEgreso = () => navigation.navigate("NuevoEgreso");
  const onBorrarEgreso = () => navigation.navigate("BorrarEgreso");

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

      <View style={[ screenStyles.containerDivider, titleStyles.titleContainer ]}>
          <Text h5 style={titleStyles.titleText}>
            Filtros
          </Text>
      </View>

      <DropDownPicker
            items={periodosData}
            defaultValue={periodo}
            placeholder="Seleccione un periodo."
            containerStyle={dropdownStyles.dropdownContainer}
            style={dropdownStyles.dropdown}
            itemStyle={dropdownStyles.dropdownItem}
            onChangeItem={(item) => handleChangePeriodo(item.value)}
          />

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Egresos
          {periodo === "1" ? " de la semana"
            : periodo === "2" ? " del mes"
            : periodo === "3" ? " del año" : ""}
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

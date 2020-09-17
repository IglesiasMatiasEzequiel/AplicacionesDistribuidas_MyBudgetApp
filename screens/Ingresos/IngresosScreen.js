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

export default function Ingresos({ navigation }) {

  const [periodo, setPeriodo] = React.useState(null);

  const handleChangePeriodo = (periodo) => setPeriodo(periodo);

  const limpiarState = () => {
    setPeriodo(null);
  };

  const onNuevoIngreso = () => {
    limpiarState();
    navigation.navigate("NuevoIngreso");
  }
  const onBorrarIngreso = () => { 
    limpiarState();
    navigation.navigate("BorrarIngreso"); 
  }

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

      <View style={[ screenStyles.containerDivider, titleStyles.titleContainer ]}>
          <Text h5 style={titleStyles.titleText}>
            Ingresos
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

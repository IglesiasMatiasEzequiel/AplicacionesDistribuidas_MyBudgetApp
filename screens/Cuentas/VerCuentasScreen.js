import React from "react";
import { ScrollView, View } from "react-native";
import {
  screenStyles,
  tableStyles,
  titleStyles,
  dropdownStyles,
} from "../../components/Styles";
import DropDownPicker from "react-native-dropdown-picker";

import { Table, Row } from "react-native-table-component";
import { Text } from "galio-framework";

export default function Ingresos({ navigation }) {
  const [tarjeta, setTarjeta] = React.useState(null);

  const handleChangeTarjeta = (tarjeta) => setTarjeta(tarjeta);

  const tableHeaders = ["Tipo", "Categoria", "Cuotas", "Fecha", "Monto"];
  const columnWidth = [120, 150, 60, 120, 120];

  const tableData = [
    ["**** **** **** 0856", "Galicia", "12/24", "01/09/2020", "01/09/2020"],
    ["**** **** **** 4562", "BBVA Francés", "12/22", "01/09/2020", "01/09/2020"],
  ];

  const misCuentasData = [
    { label: "Cuenta A - BBVA 23542", value: "1" },
    { label: "Cuenta B - Galicia 17542", value: "2" },
  ];

  const misTarjetasData = [
    { label: "Banco Galicia - **** **** **** 0856", value: "1" },
    { label: "BBVA Francés - **** **** **** 4562", value: "2" },
  ];

  return (
    <ScrollView style={screenStyles.screen}>
      <DropDownPicker
        items={misCuentasData}
        defaultValue={tarjeta}
        placeholder="Seleccione una cuenta."
        containerStyle={dropdownStyles.dropdownContainer}
        style={dropdownStyles.dropdown}
        itemStyle={dropdownStyles.dropdownItem}
        onChangeItem={(item) => handleChangeTarjeta(item.value)}
        zIndex={5000}
      />

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Tarjetas
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
      <DropDownPicker
        items={misTarjetasData}
        defaultValue={tarjeta}
        placeholder="Seleccione una tarjeta."
        containerStyle={dropdownStyles.dropdownContainer}
        style={dropdownStyles.dropdown}
        itemStyle={dropdownStyles.dropdownItem}
        onChangeItem={(item) => handleChangeTarjeta(item.value)}
        zIndex={5000}
      />
      
    </ScrollView>
  );
}

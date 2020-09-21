import React from "react";
import { ScrollView, View } from "react-native";
import {
  screenStyles,
  tableStyles,
  titleStyles,
  dropdownStyles,
} from "../../components/Styles";
import {
  periodosData
} from "../../components/Data";

import DropDownPicker from "react-native-dropdown-picker";
import { Table, Row } from "react-native-table-component";
import { Text } from "galio-framework";

export default function Ingresos({ navigation }) {
  
  const [tarjeta, setTarjeta] = React.useState(null);
  const [periodo, setPeriodo] = React.useState(null);
  const [montoTotal, setMontoTotal] = React.useState(null);

  const handleChangeTarjeta = (tarjeta) => {
    setTarjeta(tarjeta);
    setPeriodo(null);
  }
  const handleChangePeriodo = (periodo) => {
    setPeriodo(periodo);
    setMontoTotal("15000");
  }

  const tableHeaders = ["Tipo", "Categoria", "Cuotas", "Fecha", "Monto"];
  const columnWidth = [120, 150, 60, 120, 120];

  const tableData = [
    [
      ["Periódico", "Servicios - Luz", "1", "17/9/2020", "$ 5000"],
      ["Periódico", "Servicios - Gas", "1", "18/9/2020", "$ 3000"],
      ["Periódico", "Servicios - Cable", "1", "19/9/2020", "$ 3200"],
      ["Periódico", "Servicios - Teléfono", "1", "20/9/2020", "$ 3800"],
    ],
    [
      ["Periódico", "Servicios - Gas", "1", "10/8/2020", "$ 6065"],
      ["Periódico", "Servicios - Teléfono", "1", "11/8/2020", "$ 1800"],
    ],
  ];

  const misTarjetasData = [
    { label: "Banco Galicia - **** **** **** 0856", value: "1" },
    { label: "BBVA Francés - **** **** **** 4562", value: "2" },
  ];

  return (
    <ScrollView style={screenStyles.screen}>

      <View style={[ screenStyles.containerDivider, titleStyles.titleContainer ]}>
          <Text h5 style={titleStyles.titleText}>
            Filtros
          </Text>
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

      <DropDownPicker
            items={periodosData}
            defaultValue={periodo}
            placeholder="Seleccione un periodo."
            containerStyle={dropdownStyles.dropdownContainer}
            style={dropdownStyles.dropdown}
            itemStyle={dropdownStyles.dropdownItem}
            onChangeItem={(item) => handleChangePeriodo(item.value)}
            zIndex={5000}
          />

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Gastos 
          {periodo === "1" ? " semanales "
            : periodo === "2" ? " mensuales "
            : periodo === "3" ? " anuales " : ""}
          de la tarjeta
          {periodo === "1" | periodo === "2" | periodo === "3" ?  "  -  Monto Total = $ " + montoTotal : ""}
        </Text>
      </View>

      {tarjeta != null && periodo != null && (
        <View>
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
                    {tableData[parseInt(tarjeta) - 1].map((rowData, index) => (
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
        </View>
      )}
    </ScrollView>
  );
}

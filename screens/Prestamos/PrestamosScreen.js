import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import {
  screenStyles,
  buttonStyles,
  tableStyles,
  titleStyles,
  dropdownStyles
} from "../../components/Styles";
import {
  estadosPrestamoData
} from "../../components/Data";

import DropDownPicker from "react-native-dropdown-picker";
import { Text } from "galio-framework";
import { Table, Row } from "react-native-table-component";

export default function PrestamosScreen({ navigation }) {

  const [estadoPrestamo, setEstadoPrestamo] = React.useState(null);

  const handleChangeEstadoPrestamo = (estadoPrestamo) => setEstadoPrestamo(estadoPrestamo);

  const limpiarState = () => {
    setEstadoPrestamo(null);
  };

  const onNuevoPrestamo = () => {
    limpiarState();
    navigation.navigate("NuevoPrestamo");
  }
  const onBorrarPrestamo= () => { 
    limpiarState();
    navigation.navigate("BorrarPrestamo"); }

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
      <TouchableOpacity onPress={onNuevoPrestamo} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Nuevo Prestamos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBorrarPrestamo} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Borrar Prestamos</Text>
      </TouchableOpacity>

      <View style={[ screenStyles.containerDivider, titleStyles.titleContainer ]}>
          <Text h5 style={titleStyles.titleText}>
            Filtros
          </Text>
      </View>

      <DropDownPicker
            items={estadosPrestamoData}
            defaultValue={estadoPrestamo}
            placeholder="Seleccione un estado."
            containerStyle={dropdownStyles.dropdownContainer}
            style={dropdownStyles.dropdown}
            itemStyle={dropdownStyles.dropdownItem}
            onChangeItem={(item) => handleChangeEstadoPrestamo(item.value)}
          />

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Mis prestamos
          {estadoPrestamo === "1" ? " activos"
            : estadoPrestamo === "2" ? " vencidos" : ""}
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
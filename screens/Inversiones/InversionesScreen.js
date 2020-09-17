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
  periodosData
} from "../../components/Data";

import DropDownPicker from "react-native-dropdown-picker";
import { Text } from "galio-framework";
import { Table, Row } from "react-native-table-component";

export default function InversionesScreen({ navigation }) {

  const [periodo, setPeriodo] = React.useState(null);

  const handleChangePeriodo = (periodo) => setPeriodo(periodo);

  const limpiarState = () => {
    setPeriodo(null);
  };

  const onNuevaInversion = () => { 
    limpiarState();
    navigation.navigate("NuevaInversion"); 
  }
  const onBorrarInversion= () => { 
    limpiarState();
    navigation.navigate("BorrarInversion");
  }

  const tableHeaders = [
    "Tipo",
    "Dinero",
    "F. Inicio.",
    "Duracion",
    "Nombre"
  ];
  const columnWidth = [150, 80, 150, 150,200];

  const tableData = [
    ["Accciones", "$5000", "01/12/2019", "-", "Banco Galicia"],
    ["Plazo Fijo", "$7000", "01/02/2020", "7 meses", "-"],
  ];

  return (
    <ScrollView style={screenStyles.screen}>
      <TouchableOpacity onPress={onNuevaInversion} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Nueva Inversion</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBorrarInversion} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Borrar Inversion</Text>
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
          Mis Inversiones
          {periodo === "1" ? " semanales"
            : periodo === "2" ? " mensuales"
            : periodo === "3" ? " anuales" : ""}
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
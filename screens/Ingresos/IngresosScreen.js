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

import { IngresosQueries } from "../../database";
import DropDownPicker from "react-native-dropdown-picker";
import { Table, Row } from "react-native-table-component";
import { Text } from "galio-framework";
import * as Session from "../../components/Session";
import Alert from "../../components/Alert";

export default function Ingresos({ route, navigation }) {

  const recargarListado = route.params?.recargarListado ?? false;

  const [periodo, setPeriodo] = React.useState(null);
  const [listado, setListado] = React.useState(null);
  const [isLoadingListado, setIsLoadingListado] = React.useState(false);

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

  const tableHeaders = ["Fecha", "Monto", "Descripcion", "Tipo", "Categoría", "Destino", "Cuenta"];
  const columnWidth = [60, 80, 150, 100, 80, 120];

  const getListado = () => {

    setIsLoadingListado(true);

    Session.getUser().then((usuario) => {
      IngresosQueries._getListado(
        usuario.id,
        (data) => {

          setIsLoadingListado(false);

          if (data != null && data.length > 0) {
            var tableData = data.map((item) => {
              return [
                item.fecha,
                "$ " + item.monto,
                item.descripcion ?? "-",
                item.tipoIngreso,
                item.categoriaIngreso ?? "-",
                item.destinoIngreso,
                item.cuenta,
              ];
            });            

            setListado(tableData);
          }
        },
        (error) => {
          setIsLoadingListado(false);
          console.log(error);
        }
      );
    });
  };

  if(recargarListado){
    getListado();
  }
  
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

      {!isLoadingListado && <View style={tableStyles.tableContainer}>
        <ScrollView horizontal>
          {listado != null && <View>
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
                {listado.map((rowData, index) => (
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
          </View>}

          {listado === null &&
            <Alert 
              type="danger"
              message="Sin información"
            />
          }

        </ScrollView>
      </View>}
    </ScrollView>
  );
}

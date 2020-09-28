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

  const [listado, setListado] = React.useState({
    data: null,
    isLoading: false,
    periodo: null
  });

  const handleChangePeriodo = (periodo) => setListado((prevState) => ({ ...prevState, periodo: periodo }));

  const limpiarState = () => {
    setListado({
      data: null, 
      isLoading: false, 
      periodo: null
    });
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
  const columnWidth = [100, 150, 220, 150, 150, 120, 300];

  const getListado = () => {

    setListado((prevState) => ({ ...prevState, isLoading: true }));
    
    Session.getUser().then((usuario) => {
      IngresosQueries._getListado(
        usuario.id,
        (data) => {

          var tableData = data?.map((item) => {
              return [
                item.fecha,
                "$ " + item.monto,
                item.descripcion ?? "-",
                item.tipoIngreso,
                item.categoriaIngreso ?? "-",
                item.destinoIngreso,
                item.cuenta ?? '-',
              ];
            }) ?? [];            

          setListado((prevState) => ({ 
            ...prevState, 
            data: tableData,
            isLoading: false, 
          }));
        },
        (error) => {
          
          setListado((prevState) => ({ 
            ...prevState, 
            data: [],
            isLoading: false, 
          }));

          console.log(error);
        }
      );
    });
  };

  if((listado.data === null
    || (route?.params?.isReload ?? false))
    && !listado.isLoading){ 

    console.log(route?.params?.isReload);

    /* Se vuelve a setear el isReload para que no siga actualizando el listado*/
    navigation.setParams({ isReload: false });

    console.log(route?.params?.isReload);

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

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Filtros
        </Text>
      </View>

      <DropDownPicker
        items={periodosData}
        defaultValue={listado.periodo}
        placeholder="Seleccione un periodo."
        containerStyle={dropdownStyles.dropdownContainer}
        style={dropdownStyles.dropdown}
        itemStyle={dropdownStyles.dropdownItem}
        onChangeItem={(item) => handleChangePeriodo(item.value)}
      />

      {!listado.isLoading && (
        <View>
          <View
            style={[screenStyles.containerDivider, titleStyles.titleContainer]}
          >
            <Text h5 style={titleStyles.titleText}>
              Ingresos
              {listado.periodo === "1"
                ? " de la semana"
                : listado.periodo === "2"
                ? " del mes"
                : listado.periodo === "3"
                ? " del año"
                : ""}
            </Text>
          </View>

          <View style={tableStyles.tableContainer}>
            <ScrollView horizontal>
              {(listado.data !== null && listado.data.length > 0) && (
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
                      {listado.data.map((rowData, index) => (
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
              )}

              {(listado.data === null || listado.data.length === 0) && (
                <Alert type="danger" message="Sin información" />
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

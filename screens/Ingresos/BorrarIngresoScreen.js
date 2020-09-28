import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  screenStyles,
  buttonStyles,
  tableStyles,
  titleStyles,
  dropdownStyles
  } from "../../components/Styles";
import { CustomSpinner, CustomModal } from "../../components";

import {
  periodosBorrarData
} from "../../components/Data";

import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import DropDownPicker from "react-native-dropdown-picker";
import { Text } from "galio-framework";

export default function BorrarIngresos({ navigation }) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [listado, setListado] = React.useState({
    data: null,
    isLoading: false,
    periodo: "4"
  });

  const handleChangePeriodo = (periodo) => {
    setListado((prevState) => ({ 
      ...prevState, 
      data: null, 
      isLoading: false,
      periodo: periodo
     }));
  };

  const tableHeaders = ["", "Tipo", "Destino", "Descripcion", "Monto"];
  const columnWidth = [50, 120, 120, 120, 120];

  const getListado = () => {

    setListado((prevState) => ({ ...prevState, isLoading: true }));
    
    var substractDays = listado.periodo === "1" ? 7
    : listado.periodo === "2" ? 30 
    : listado.periodo === "3" ? 365 : 7;

    var to = new Date();
    var from = new Date();

    from.setDate(from.getDate() - substractDays);

    var toFormatted = formatStringDateToDB(formatDateToString(to));
    var fromFormatted = formatStringDateToDB(formatDateToString(from));

    Session.getUser().then((usuario) => {
      IngresosQueries._getListado(
        usuario.id, fromFormatted, toFormatted,
        (data) => {

          console.log(data);

          var tableData = data?.map((item) => {
              return [
                formatStringDateFromDB(item.fecha),
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

    /* Se vuelve a setear el isReload para que no siga actualizando el listado*/
    navigation.setParams({ isReload: false });

    getListado();
  }

  const onBorrar = () => { 

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setModalData({ 
        title: "¡Borrado exitoso!",
        message: "Los ingresos se eliminaron correctamente.",
        isVisible: true
      });
    }, 500);
  };

  const limpiarState = () => {
    setIsLoading(false);
    setModalData({...modalData, isVisible: false});
    setTipoBorrar(null);
  };

  const onBack = () => {
    limpiarState();
    navigation.navigate("Ingresos");
  };

  const onCloseModal = () => setModalData({ ...modalData, isVisible: false });

  const deleteButton = (data, index) => (
    <TouchableOpacity onPress={onBorrar}>
      <View style={buttonStyles.btnTable}>
        <Text style={buttonStyles.btnText}>Borrar</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={screenStyles.screen}>
      
      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Filtros
        </Text>
      </View>

      <DropDownPicker
        items={periodosBorrarData}
        defaultValue={listado.periodo}
        placeholder="Seleccione un periodo."
        containerStyle={dropdownStyles.dropdownContainer}
        style={dropdownStyles.dropdown}
        itemStyle={dropdownStyles.dropdownItem}
        onChangeItem={(item) => handleChangePeriodo(item.value)}
      />

      {listado?.periodo !== "4" && (
        <View>
          <TouchableOpacity onPress={onBorrar} style={[buttonStyles.btn, { marginTop: 30 }]}>
            <Text style={buttonStyles.btnText}>Borrar</Text>
          </TouchableOpacity>
        </View>
      )}

      {listado?.periodo === "4" && (
        <View>
          <View
            style={[screenStyles.containerDivider, titleStyles.titleContainer]}
          >
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
                      <TableWrapper
                        key={index}
                        style={[
                          tableStyles.tableRow,
                          index % 2 && { backgroundColor: "transparent" },
                        ]}
                      >
                        {rowData.map((cellData, cellIndex) => (
                          <Cell
                            key={cellIndex}
                            width={columnWidth[cellIndex]}
                            data={
                              cellIndex === 0
                                ? deleteButton(cellData, index)
                                : cellData
                            }
                            textStyle={tableStyles.tableRowtext}
                          />
                        ))}
                      </TableWrapper>
                    ))}
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
      )}

      <TouchableOpacity onPress={onBack} style={[buttonStyles.btnBack, { marginTop: 30 }]}>
        <Text style={buttonStyles.btnBackText}>Volver</Text>
      </TouchableOpacity>

      <CustomSpinner isLoading={isLoading} text={"Eliminando..."} />

      <CustomModal
        title={modalData?.title}
        message={modalData?.message}
        isVisible={modalData?.isVisible}
        handleBtnOnSuccess={onCloseModal}
      />
    </ScrollView>
  );
}

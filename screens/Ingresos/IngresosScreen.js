import React from "react";

import { 
  ScrollView, 
  View,
  Text, 
  TouchableOpacity 
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

import { 
  Table, 
  Row, 
  TableWrapper, 
  Cell 
} from "react-native-table-component";

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

import { 
  CustomSpinner, 
  CustomModal, 
  CustomIcon, 
  Alert 
} from "../../components";

import { 
  IngresosQueries 
} from "../../database";

import { 
  formatDateToString, 
  formatStringDateToDB, 
  formatStringDateFromDB 
} from "../../components/Formatters";

import * as Session from "../../components/Session";

export default function Ingresos({ route, navigation }) {

  React.useEffect(() => {
    getListado();
  }, [getListado, setListado]);


  /* State del CustomSpinner */
  const [isLoading, setIsLoading] = React.useState(false);
  
  /* State del CustomModal */
  const [modalData, setModalData] = React.useState(null);

  /* State del Listado */
  const [listado, setListado] = React.useState({
    data: null,
    isLoading: false,
    periodo: null
  });

  const handleChangePeriodo = (periodo) => {
    setListado((prevState) => ({ 
      ...prevState, 
      data: null, 
      isLoading: false,
      periodo: periodo
     }));
  };

  const limpiarState = () => {
    setListado({
      data: null, 
      isLoading: false, 
      periodo: null
    });
  };

  const onNuevo = () => {
    limpiarState();
    navigation.navigate("NuevoIngreso");
  }

  const onCancelar = () => setModalData({ ...modalData, isVisible: false });

  const onBorrar = (id) => { 
    setModalData({ 
      title: "Eliminar ingreso",
      message: "¿Está seguro de que desea eliminar el ingreso?",
      handleBtnOnSuccess: () => onConfirmarBorrar(id),
      handleBtnOnError: () => onCancelar(),
      showErrorBtn: true,
      isVisible: true
    });
  }

  const onConfirmarBorrar = (id) => { 
    
    setIsLoading(true);

      IngresosQueries._deleteById(id, 
        () => {
          setIsLoading(false);
          setModalData({ 
            title: "¡Borrado exitoso!",
            message: "El ingreso se eliminó correctamente.",
            isVisible: true,
            isSuccess: true,
            handleBtnOnSuccess: () => { 
              limpiarState();
              onCancelar();
            },
            successBtnText: "Volver",
            showErrorBtn: false
          });
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
  }

  /* Listado */

  const deleteButton = (data, index) => (
    <TouchableOpacity onPress={() => onBorrar(data)}>
      <View style={buttonStyles.btnTable}>
        <CustomIcon name="md-trash" size={22}/>
      </View>
    </TouchableOpacity>
  );

  const tableHeaders = ["", "Fecha", "Monto", "Descripcion", "Tipo", "Categoría", "Destino", "Cuenta"];
  const columnWidth = [30, 120, 150, 300, 300, 150, 180, 450];

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

          var tableData = data?.map((item) => {
              return [item.id,
                formatStringDateFromDB(item.fecha),
                "$ " + parseFloat(item.monto).toFixed(2),
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

  if(route?.params?.isReload ?? false){ 

    /* Se vuelve a setear el isReload para que no siga actualizando el listado*/
    navigation.setParams({ isReload: false });

    if (!listado.isLoading) {
      getListado();
    }
  }

  /* Listado */
  
  return (
    <ScrollView style={screenStyles.screen}>
      <TouchableOpacity onPress={onNuevo} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Nuevo Ingreso</Text>
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

          {listado.data !== null && listado.data.length > 0 && (

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
                      {listado.data.map((rowData, index) => (
                        <TableWrapper
                          key={index}
                          style={[
                            tableStyles.tableRow,
                            index % 2 && { backgroundColor: "transparent" },
                          ]}
                        >
                          {rowData.map((cellData, cellIndex) => (
                            <Cell
                              key={cellIndex.toString()}
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
          )}

          {(listado.data === null || listado.data.length === 0) && (
                  <Alert type="danger" message="Sin información" />
              )}
        </View>
      )}

      <CustomSpinner isLoading={isLoading} text={"Cargando..."} />

      <CustomModal
        title={modalData?.title}
        message={modalData?.message}
        isSuccess={modalData?.isSuccess}
        isVisible={modalData?.isVisible}
        handleBtnOnSuccess={modalData?.handleBtnOnSuccess}
        handleBtnOnError={modalData?.handleBtnOnError}
        successBtnText={modalData?.successBtnText}
        errorBtnText={modalData?.errorBtnText}
        showErrorBtn={modalData?.showErrorBtn}
      />
    </ScrollView>
  );
}

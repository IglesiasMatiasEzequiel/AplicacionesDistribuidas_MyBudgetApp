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
  Alert,
} from "../../components";

import { 
  InversionesQueries 
} from "../../database";

import { 
  formatDateToString, 
  formatStringDateToDB, 
  formatStringDateFromDB 
} from "../../components/Formatters";

import * as Session from "../../components/Session";

export default function InversionesScreen({ route,navigation }) {

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

  /* Botón Nuevo*/

  const onNuevo = () => {
    limpiarState();
    navigation.navigate("NuevaInversion");
  }

  /* Botón Nuevo*/

  /* Botón borrar */

  const onCancelar = () => setModalData({ ...modalData, isVisible: false });

  const onBorrar = (id) => { 
    setModalData({ 
      title: "Eliminar inversion",
      message: "¿Está seguro de que desea eliminar la inversion",
      handleBtnOnSuccess: () => onConfirmarBorrar(id),
      handleBtnOnError: () => onCancelar(),
      showErrorBtn: true,
      isVisible: true
    });
  }

  const onConfirmarBorrar = (id) => { 
    
    setIsLoading(true);

      InversionesQueries._deleteById(id, 
        () => {
          setIsLoading(false);
          setModalData({ 
            title: "¡Borrado exitoso!",
            message: "La inversion se eliminó correctamente.",
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

  const deleteButton = (data, index) => (
    <TouchableOpacity onPress={() => onBorrar(data)}>
      <View style={buttonStyles.btnTable}>
        <CustomIcon name="md-trash" size={22}/>
      </View>
    </TouchableOpacity>
  );

  /* Botón borrar */

/* Listado */

  const tableHeaders = [
    "",
    "Tipo",
    "Monto",
    "Cuenta",
    "F. Inicio",
    "F. Venc.",
    "Duración",
    "Nombre"
  ];
  const columnWidth = [30, 200, 150, 450, 150, 150, 200, 200];

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
      InversionesQueries._getListado(
        usuario.id, fromFormatted, toFormatted,
        (data) => {
          var tableData =
            data?.map((item) => {
              return [item.id,
                item.tipoInversion,
                "$ " + parseFloat(item.monto).toFixed(2),
                item.cuenta,
                item.fechaInicio !== null ? formatStringDateFromDB(item.fechaInicio): "-",
                item.fechaVencimiento !== null ? formatStringDateFromDB(item.fechaVencimiento):"-",
                item.duracion,
                item.nombre,
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

 /* Listado */

  return (
    <ScrollView style={screenStyles.screen}>
     <TouchableOpacity onPress={onNuevo} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Nueva Inversion</Text>
      </TouchableOpacity>

      <View style={[ screenStyles.containerDivider, titleStyles.titleContainer ]}>
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
              Mis Inversiones
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
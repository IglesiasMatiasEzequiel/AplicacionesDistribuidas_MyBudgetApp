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
  formatDateToString, 
  formatStringDateToDB, 
  formatStringDateFromDB 
} from "../../components/Formatters";

import { CuentasQueries, IngresosQueries } from "../../database";
import * as Session from "../../components/Session";

export default function MovimientoCuenta({ route, navigation }) {

  /* State del CustomSpinner */
  const [isLoading, setIsLoading] = React.useState(false);
  
  /* State del CustomModal */
  const [modalData, setModalData] = React.useState(null);

  const [dropdownData, setDropdownData] = React.useState(null);

  /* State del Listado */
  const [listado, setListado] = React.useState({
    data: null,
    isLoading: false,
    cuenta: null,
    periodo: null
  });
  const [listado2, setListado2] = React.useState({
    data: null,
    isLoading: false,
    cuenta: null,
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
  const handleChangeCuenta = (cuenta) => {
    setListado((prevState) => ({ 
      ...prevState, 
      data: null, 
      isLoading: false,
      cuenta: cuenta
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
    navigation.navigate("NuevoIngreso");
  }

  /* Botón Nuevo*/

  /* Botón borrar */

  // const deleteButton = (data, index) => (
  //   <TouchableOpacity onPress={() => onBorrar(data)}>
  //     <View style={buttonStyles.btnTable}>
  //       <CustomIcon name="md-trash" size={22}/>
  //     </View>
  //   </TouchableOpacity>
  // );
  const ingresosButton = (data, index) => (
    <TouchableOpacity>
      {/* <View style={buttonStyles.btnTable}>
        <CustomIcon name="md-arrow-up-outline" size={22}/>
      </View> */}
    </TouchableOpacity>
  );

  /* Botón borrar */

  /* Listado */

  const tableHeaders = ["", "Fecha", "Monto", "Descripcion", "Tipo", "Categoría", "Destino", "Cuenta"];
  const columnWidth = [30, 120, 150, 300, 300, 150, 180, 350];

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
      IngresosQueries._getListadoCuenta(
        usuario.id, listado.cuenta, fromFormatted, toFormatted,
        (data) => {

          var tableData = data?.map((item) => {
              return [item.id,
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

  /* Listado */
  
  const fillDropdownData = () => {

    setIsLoading(true);

    Session.getUser().then((usuario) => {
      CuentasQueries._selectAllByIdUsuario(usuario.id, (data) => {

        var cuentas = data?.map((item) => {
          return {
            label: "CBU: " + item.cbu + " - " + item.descripcion,
            value: item.id.toString()
          }   
        }) ?? [];           

        setDropdownData({
          cuentas: cuentas,
        });

        setIsLoading(false);
      });
    });
  }

  if(dropdownData === null && !isLoading){
    fillDropdownData();
  }


  return (
    <ScrollView style={screenStyles.screen}>
      {dropdownData !== null && (
        <View>

        <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
          <Text h5 style={titleStyles.titleText}>
            Filtros
          </Text>
        </View>

        <DropDownPicker
          items={dropdownData.cuentas}
          defaultValue={listado.cuenta}
          placeholder="Seleccione una cuenta."
          containerStyle={dropdownStyles.dropdownContainer}
          style={dropdownStyles.dropdown}
          itemStyle={dropdownStyles.dropdownItem}
          onChangeItem={(item) => handleChangeCuenta(item.value)}
        />

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
                Movimientos ingresos
                {/* {listado.periodo === "1"
                  ? " de la semana"
                  : listado.periodo === "2"
                  ? " del mes"
                  : listado.periodo === "3"
                  ? " del año"
                  : ""} */}
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
                                  ? ingresosButton(cellData, index)
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
                )}

                {(listado.data === null || listado.data.length === 0) && (
                  <Alert type="danger" message="Sin información" />
                )}
              </ScrollView>
            </View>
          </View>
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

// import React from "react";
// import { ScrollView, View } from "react-native";
// import {
//   screenStyles,
//   tableStyles,
//   titleStyles,
//   dropdownStyles,
// } from "../../components/Styles";
// import {
//   periodosData
// } from "../../components/Data";

// import DropDownPicker from "react-native-dropdown-picker";
// import { Table, Row } from "react-native-table-component";
// import { Text } from "galio-framework";

// export default function MovimientoCuenta({ navigation }) {
  
//   const [cuenta, setCuenta] = React.useState(null);
//   const [periodo, setPeriodo] = React.useState(null);
//   const [montoTotal, setMontoTotal] = React.useState(null);

//   const handleChangeCuenta = (cuenta) => {
//     setCuenta(cuenta);
//     setPeriodo(null);
//   }
//   const handleChangePeriodo = (periodo) => {
//     setPeriodo(periodo);
//     setMontoTotal("15000");
//   }

//   const tableHeaders = ["Tipo", "Categoria", "Cuotas", "Fecha", "Monto"];
//   const columnWidth = [120, 150, 60, 120, 120];

//   const tableData = [
//     [
//       ["Periódico", "Servicios - Luz", "1", "17/9/2020", "$ 5000"],
//       ["Periódico", "Servicios - Gas", "1", "18/9/2020", "$ 3000"],
//       ["Periódico", "Servicios - Cable", "1", "19/9/2020", "$ 3200"],
//       ["Periódico", "Servicios - Teléfono", "1", "20/9/2020", "$ 3800"],
//     ],
//     [
//       ["Periódico", "Servicios - Gas", "1", "10/8/2020", "$ 6065"],
//       ["Periódico", "Servicios - Teléfono", "1", "11/8/2020", "$ 1800"],
//     ],
//   ];

//   const misCuentasData = [
//       { label: "CBU° 40090418135201 - Galicia", value: "1" },
//       { label: "CBU° 40090417835202 - BBVA Francés", value: "2" },
//     ];

//   return (
//     <ScrollView style={screenStyles.screen}>

//       <View style={[ screenStyles.containerDivider, titleStyles.titleContainer ]}>
//           <Text h5 style={titleStyles.titleText}>
//             Filtros
//           </Text>
//       </View>

//       <DropDownPicker
//         items={misCuentasData}
//         defaultValue={cuenta}
//         placeholder="Seleccione una cuenta."
//         containerStyle={dropdownStyles.dropdownContainer}
//         style={dropdownStyles.dropdown}
//         itemStyle={dropdownStyles.dropdownItem}
//         onChangeItem={(item) => handleChangeCuenta(item.value)}
//         zIndex={5000}
//       />

//       <DropDownPicker
//             items={periodosData}
//             defaultValue={periodo}
//             placeholder="Seleccione un periodo."
//             containerStyle={dropdownStyles.dropdownContainer}
//             style={dropdownStyles.dropdown}
//             itemStyle={dropdownStyles.dropdownItem}
//             onChangeItem={(item) => handleChangePeriodo(item.value)}
//             zIndex={5000}
//           />

//       <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
//         <Text h5 style={titleStyles.titleText}>
//           Gastos 
//           {periodo === "1" ? " semanales "
//             : periodo === "2" ? " mensuales "
//             : periodo === "3" ? " anuales " : ""}
//           de la tarjeta
//           {periodo === "1" | periodo === "2" | periodo === "3" ?  "  -  Monto Total = $ " + montoTotal : ""}
//         </Text>
//       </View>

//       {cuenta != null && periodo != null && (
//         <View>
//           <View style={tableStyles.tableContainer}>
//             <ScrollView horizontal>
//               <View>
//                 <Table borderStyle={tableStyles.tableHeaderBorder}>
//                   <Row
//                     data={tableHeaders}
//                     widthArr={columnWidth}
//                     style={tableStyles.tableHeader}
//                     textStyle={tableStyles.tableHeadertext}
//                   />
//                 </Table>
//                 <ScrollView
//                   style={[tableStyles.tableDataContainer, { height: 200 }]}
//                 >
//                   <Table borderStyle={tableStyles.tableDataBorder}>
//                     {tableData[parseInt(cuenta) - 1].map((rowData, index) => (
//                       <Row
//                         key={index}
//                         data={rowData}
//                         widthArr={columnWidth}
//                         style={[
//                           tableStyles.tableRow,
//                           index % 2 && { backgroundColor: "transparent" },
//                         ]}
//                         textStyle={tableStyles.tableRowtext}
//                       />
//                     ))}
//                   </Table>
//                 </ScrollView>
//               </View>
//             </ScrollView>
//           </View>
//         </View>
//       )}
//     </ScrollView>
//   );
// }

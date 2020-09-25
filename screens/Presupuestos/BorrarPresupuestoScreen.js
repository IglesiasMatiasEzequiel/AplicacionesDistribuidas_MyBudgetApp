import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  screenStyles,
  buttonStyles,
  tableStyles,
  titleStyles,
  radioButtonStyles,
} from "../../components/Styles";
import { CustomSpinner, CustomModal } from "../../components";

import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { Text } from "galio-framework";
import RadioButtonRN from "radio-buttons-react-native";

import { deletePresupuesto } from '../../components/DataBase';
import { selectPresupuestos } from '../../components/DataBase';

export default function BorrarPresupuesto({ navigation }) {
  const [idUsuario, setUsuario] = React.useState("1");
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [tipoBorrar, setTipoBorrar] = React.useState(null);

  const tableHeaders = [
    "",
    "Tipo",
    "Monto",
    "FechaInicio",
  ];
  const columnWidth = [60, 100, 100, 100];

  const tableData = [
    ["", "Alquiler", "$5000", "10/10/2020"],
    ["", "Luz/Gas/Agua", "$7000", "10/10/2020"],
  ];
  selectPresupuestos( idUsuario, (data) => { 
    var presupuesto = {
      id: data[0].id,
      email: data[0].tipo,
      nombre: data[0].monto,
      apellido: data[0].fechaInicio,
    };

  }, () => { 
    setIsLoading(false);
    console.log('Error buscando presupuestos...')
  });


  const onBorrar = () => {
    setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    //   setModalData({
    //     title: "¡Borrado exitoso!",
    //     message: "El presupuesto se eliminó correctamente.",
    //     isVisible: true,
    //   });
    // }, 500);

    deletePresupuesto( id, idUsuario, () => { 
      setIsLoading(false);
      setModalData({ 
        title: "¡Borrado exitoso!",
        message: "El presupuesto se eliminó correctamente.",
        isVisible: true,
        isSuccess: true,
        successBtnText: "Aceptar",
      });
    }, () => { 
      setIsLoading(false);
      console.log('Error creando presupuesto...')
    });
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
          Mis presupuestos
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
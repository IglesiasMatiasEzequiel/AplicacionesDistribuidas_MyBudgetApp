import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  screenStyles,
  buttonStyles,
  tableStyles,
  titleStyles,
  radioButtonStyles
} from "../../components/Styles";
import { CustomSpinner, CustomModal } from "../../components";

import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { Text } from "galio-framework";
import RadioButtonRN from 'radio-buttons-react-native';

export default function BorrarEgresos({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [tipoBorrar, setTipoBorrar] = React.useState(null);

  const tableHeaders = ["", "Tipo", "Destino", "Descripcion", "Monto"];
  const columnWidth = [50, 120, 120, 120, 120];

  const tableData = [
    ["X", "P-Sueldo", "Cuenta", "Sueldo", "5000"],
    ["X","P-Alquiler", "Cuenta", "Depto1", "3000"],
    ["X","P-Alquiler", "Cuenta", "Depto2", "3200"],
    ["X","P-Alquiler", "Cuenta", "Depto3", "3800"],
    ["X","Extraordinario", "Efectivo", "Tio", "400"],
    ["X","Extraordinario", "Efectivo", "Tio", "800"],
    ["X","Extraordinario", "Efectivo", "Hermano", "500"],
    ["X","Extraordinario", "Efectivo", "Hermano", "1000"],
    ["X","Extraordinario", "Efectivo", "Amigos", "2000"],
    ["X","Extraordinario", "Efectivo", "Amigos", "2000"],
    ["X","Extraordinario", "Efectivo", "Amigos", "2000"],
    ["X","Extraordinario", "Efectivo", "Amigos", "2000"],
    ["X","Extraordinario", "Efectivo", "Amigos", "2000"],
    ["X","Extraordinario", "Efectivo", "Amigos", "2000"],
    ["X","Extraordinario", "Efectivo", "Amigos", "2000"],
  ];

  const onBorrar = () => { 

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setModalData({ 
        title: "¡Borrado exitoso!",
        message: "Los egresos se eliminaron correctamente.",
        isVisible: true
      });
    }, 500);
  };

  const onCloseModal = () => setModalData({ ...modalData, isVisible: false });

  const deleteButton = (data, index) => (
    <TouchableOpacity onPress={onBorrar}>
      <View style={buttonStyles.btnTable}>
        <Text style={buttonStyles.btnText}>Borrar</Text>
      </View>
    </TouchableOpacity>
  );

  const options = [
    { label: 'Último mes', value: 1 },
    { label: 'Última semana', value: 2 },
    { label: 'Último año', value: 3 },
    { label: 'Últimos movimientos', value: 4 },
  ];

  return (
    <ScrollView style={screenStyles.screen}>
      <RadioButtonRN
        data={options}
        selectedBtn={(e) => setTipoBorrar(e)}
        circleSize={16}
        boxStyle={radioButtonStyles.rbContainer}
        textStyle={radioButtonStyles.rbText}
        activeColor="#69037B"
      />

      {tipoBorrar !== null && tipoBorrar?.value !== 4 && (
        <View>
          <TouchableOpacity onPress={onBorrar} style={buttonStyles.btn}>
            <Text style={buttonStyles.btnText}>Borrar</Text>
          </TouchableOpacity>
        </View>
      )}

      {tipoBorrar?.value === 4 && (
        <View>
          <View
            style={[screenStyles.containerDivider, titleStyles.titleContainer]}
          >
            <Text h5 style={titleStyles.titleText}>
              Últimos Egresos
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

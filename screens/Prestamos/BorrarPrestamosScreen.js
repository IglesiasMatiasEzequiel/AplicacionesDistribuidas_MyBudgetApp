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

export default function BorrarPrestamo({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [tipoBorrar, setTipoBorrar] = React.useState(null);

  const tableHeaders = [
    "",
    "Tipo",
    "Destino/Emisor",
    "Monto",
    "Intereses",
  ];
  const columnWidth = [60,150, 200, 150, 120];

  const tableData = [
    ["","Realizados", "Santiago Garcia", "$4000", "%4"],
    ["","Tomados", "Banco Santander", "$10000", "%34"],
    ["","Tomados", "Banco Galicia", "$8000", "%23"],
  ];

  const onBorrar = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setModalData({
        title: "¡Borrado exitoso!",
        message: "El prestamo se eliminó correctamente.",
        isVisible: true,
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

  return (
    <ScrollView style={screenStyles.screen}>
      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Mis prestamos
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
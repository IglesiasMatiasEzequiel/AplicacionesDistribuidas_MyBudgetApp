import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  screenStyles,
  buttonStyles,
  tableStyles,
  titleStyles,
} from "../../components/Styles";
import { CustomSpinner, CustomModal } from "../../components";

import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { Text } from "galio-framework";

export default function AdministrarCuentas({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const tableHeaders = ["Acciones",
    "Número Cuenta",
    "Descripción",
    "Monto",
    "Banco",
    "Número Tarjeta",
    "F. Venc.",,
  ];
  const columnWidth = [120, 250, 150, 200, 120, 80];

  const tableData = [
    ["", "28505909 40090418135201", "Caja de ahorro - Galicia", "$45600", "Galicia", "**** **** **** 9999", "12/24"],
    ["", "28503409 40090417835202", "Caja de ahorro", "$75300", "BBVA Francés", "**** **** **** 6789", "12/22"],
  ];

  const onBorrar = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setModalData({
        title: "¡Borrado exitoso!",
        message: "La cuenta se eliminó correctamente.",
        isVisible: true,
      });
    }, 500);
  };

  const onEditar = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setModalData({
        title: "¡Borrado exitoso!",
        message: "La cuenta se eliminó correctamente.",
        isVisible: true,
      });
    }, 500);
  };

  const onCloseModal = () => setModalData({ ...modalData, isVisible: false });

  const renderButtons = (data, index) => (
    <View style={screenStyles.containerColumns}>
      <TouchableOpacity onPress={onBorrar} style={{ width: "50%"}}>
        <View style={buttonStyles.btnTableEdit}>
          <Text style={buttonStyles.btnText}>Editar</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onEditar} style={{ width: "50%"}}>
        <View style={buttonStyles.btnTable}>
          <Text style={buttonStyles.btnText}>Borrar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={screenStyles.screen}>
      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Mis Cuentas
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
                            ? renderButtons(cellData, index)
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

      <CustomSpinner isLoading={isLoading} text={"Eliminando Cuenta..."} />

      <CustomModal
        title={modalData?.title}
        message={modalData?.message}
        isVisible={modalData?.isVisible}
        handleBtnOnSuccess={onCloseModal}
      />
    </ScrollView>
  );
}

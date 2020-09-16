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

export default function BorrarEgresos({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const tableHeaders = ["Tipo", "Destino", "Descripcion", "Monto", "Borrar"];
  const columnWidth = [120, 120, 120, 120, 60];

  const tableData = [
    ["P-Sueldo", "Cuenta", "Sueldo", "5000", "X"],
    ["P-Alquiler", "Cuenta", "Depto1", "3000", "X"],
    ["P-Alquiler", "Cuenta", "Depto2", "3200", "X"],
    ["P-Alquiler", "Cuenta", "Depto3", "3800", "X"],
    ["Extraordinario", "Efectivo", "Tio", "400", "X"],
    ["Extraordinario", "Efectivo", "Tio", "800", "X"],
    ["Extraordinario", "Efectivo", "Hermano", "500", "X"],
    ["Extraordinario", "Efectivo", "Hermano", "1000", "X"],
    ["Extraordinario", "Efectivo", "Amigos", "2000", "X"],
    ["Extraordinario", "Efectivo", "Amigos", "2000", "X"],
    ["Extraordinario", "Efectivo", "Amigos", "2000", "X"],
    ["Extraordinario", "Efectivo", "Amigos", "2000", "X"],
    ["Extraordinario", "Efectivo", "Amigos", "2000", "X"],
    ["Extraordinario", "Efectivo", "Amigos", "2000", "X"],
    ["Extraordinario", "Efectivo", "Amigos", "2000", "X"],
  ];

  const onUltimoMes = () => navigation.navigate("Egresos");
  const onUltimaSemana = () => navigation.navigate("Egresos");
  const onDeleteButton = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsModalVisible(true);
    }, 1500);
  };

  const deleteButton = (data, index) => (
    <TouchableOpacity onPress={onDeleteButton}>
      <View style={buttonStyles.btnTable}>
        <Text style={buttonStyles.btnText}>Borrar</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={screenStyles.screen}>
      <TouchableOpacity onPress={onUltimoMes} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Último Mes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onUltimaSemana} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Última Semana</Text>
      </TouchableOpacity>

      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
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
                          cellIndex === 4
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
        title="¡Borrado exitoso!"
        message="El egreso se eliminó correctamente."
        isVisible={!isLoading && isModalVisible}
        successBtnText="Volver"
        handleBtnOnSuccess={() => setIsModalVisible(false)}
      />
    </ScrollView>
  );
}

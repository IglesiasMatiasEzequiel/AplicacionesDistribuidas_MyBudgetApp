import React from "react";
import { ScrollView, SafeAreaView, View, FlatList, TouchableOpacity } from "react-native";
import {
  screenStyles,
  titleStyles,
  buttonStyles,
  notificationStyles
} from "../../components/Styles";
import { Text } from "galio-framework";

export default function Notificaciones({ navigation }) {

  const notificaciones = [
    {
      id: 1,
      titulo: 'Titulo notificacion',
      mensaje: 'Texto notificacion... bla bla.. esto tiene que ser un texto largo por las dudas... para ver cómo quedaría',
      leido: false
    },
    {
      id: 2,
      titulo: 'Titulo notificacion 2',
      mensaje: 'Texto notificacion... bla bla.. esto tiene que ser un texto largo por las dudas... para ver cómo quedaría',
      leido: true
    },
    {
      id: 3,
      titulo: 'Titulo notificacion 3',
      mensaje: 'Texto notificacion... bla bla.. esto tiene que ser un texto largo por las dudas... para ver cómo quedaría',
      leido: true
    },
    {
      id: 4,
      titulo: 'Titulo notificacion 4',
      mensaje: 'Texto notificacion... bla bla.. esto tiene que ser un texto largo por las dudas... para ver cómo quedaría',
      leido: true
    },
    {
      id: 5,
      titulo: 'Titulo notificacion 5',
      mensaje: 'Texto notificacion... bla bla.. esto tiene que ser un texto largo por las dudas... para ver cómo quedaría',
      leido: true
    },
    {
      id: 6,
      titulo: 'Titulo notificacion 6',
      mensaje: 'Texto notificacion... bla bla.. esto tiene que ser un texto largo por las dudas... para ver cómo quedaría',
      leido: true
    },
    {
      id: 7,
      titulo: 'Titulo notificacion 7',
      mensaje: 'Texto notificacion... bla bla.. esto tiene que ser un texto largo por las dudas... para ver cómo quedaría',
      leido: true
    },
    {
      id: 8,
      titulo: 'Titulo notificacion 8',
      mensaje: 'Texto notificacion... bla bla.. esto tiene que ser un texto largo por las dudas... para ver cómo quedaría',
      leido: true
    },
    {
      id: 9,
      titulo: 'Titulo notificacion 9',
      mensaje: 'Texto notificacion... bla bla.. esto tiene que ser un texto largo por las dudas... para ver cómo quedaría',
      leido: true
    },
    {
      id: 10,
      titulo: 'Titulo notificacion 10',
      mensaje: 'Texto notificacion... bla bla.. esto tiene que ser un texto largo por las dudas... para ver cómo quedaría',
      leido: true
    }

  ];

  const onMarcarComoLeidas = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setModalData({
        message: "El ingreso se guardó correctamente.",
        isVisible: true,
        isSuccess: true,
        successBtnText: "Aceptar",
      });
    }, 500);
  };

  const Notificacion = ({ index, titulo, mensaje, leido }) => (
    <View style={[notificationStyles.notification, index % 2 && { backgroundColor: "transparent" }]}>
      <Text style={[notificationStyles.notificationTitle, { fontWeight: leido ? '400' : 'bold'}]}>{titulo}</Text>
      <Text style={[notificationStyles.notificationMessage, { fontWeight: leido ? '400' : 'bold'}]}>{mensaje}</Text>
    </View>
  );

  const renderNotificacion = ({ item, index }) => (
    <Notificacion 
      index={index}
      titulo={item.titulo}
      mensaje={item.mensaje}
      leido={item.leido} />
  );

  return (
    <ScrollView style={screenStyles.screen}>
      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Mis Notificaciones
        </Text>
      </View>

      <ScrollView style={{ maxHeight: 350 }}>
        <SafeAreaView style={notificationStyles.notificationContainer}>
          <FlatList
            data={notificaciones}
            renderItem={renderNotificacion}
            keyExtractor={(notificacion) => notificacion.id}
          />
        </SafeAreaView>
      </ScrollView>

      <TouchableOpacity onPress={onMarcarComoLeidas} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Marcar como leídas</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack() } style={buttonStyles.btnBack}>
        <Text style={buttonStyles.btnBackText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

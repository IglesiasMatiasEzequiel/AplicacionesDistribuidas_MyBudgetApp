import React from "react";

import { 
  ScrollView, 
  SafeAreaView, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Text 
} from "react-native";

import {
  screenStyles,
  titleStyles,
  buttonStyles,
  notificationStyles
} from "../../components/Styles";

import { 
  NotificacionesQueries 
} from "../../database";

import { 
  CustomSpinner,
  Alert 
} from "../../components";

import * as Session from "../../components/Session";
import { formatStringDateFromDB } from "../../components/Formatters";

export default function Notificaciones({ route, navigation }) {

  /* State del CustomSpinner */
  const [isLoading, setIsLoading] = React.useState(false);

  /* State del listado */
  const [listado, setListado] = React.useState({
    data: null,
    isLoading: false
  });

  const limpiarState = () => {
    setListado({
      data: null, 
      isLoading: false      
    });
  };

  const getListado = () => {

    setListado((prevState) => ({ ...prevState, isLoading: true }));
    
    Session.getUser().then((usuario) => {
      NotificacionesQueries._getListado(
        usuario.id,
        (data) => {

          setListado((prevState) => ({ 
            ...prevState, 
            data: data,
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

  const onMarcarComoLeidas = () => {
    setIsLoading(true);

    Session.getUser().then((usuario) => {
      NotificacionesQueries._updateMarcarLeidos(usuario.id, () => {
        setIsLoading(false);
        limpiarState();
      });
    });
  };

  const Notificacion = ({ index, titulo, mensaje, fecha, leido }) => (
    <View style={[notificationStyles.notification, index % 2 && { backgroundColor: "transparent" }]}>
      <Text style={[notificationStyles.notificationTitle, { fontWeight: leido ? '400' : 'bold'}]}>{formatStringDateFromDB(fecha)} - {titulo}</Text>
      <Text style={[notificationStyles.notificationMessage, { fontWeight: leido ? '400' : 'bold'}]}>{mensaje}</Text>
    </View>
  );

  const renderNotificacion = ({ item, index }) => (
    <Notificacion 
      index={index}
      titulo={item.titulo}
      mensaje={item.mensaje}
      fecha={item.fecha}
      leido={item.leido} />
  );

  return (
    <ScrollView style={screenStyles.screen}>
      <View style={[screenStyles.containerDivider, titleStyles.titleContainer]}>
        <Text h5 style={titleStyles.titleText}>
          Mis Notificaciones
        </Text>
      </View>

      <ScrollView style={{ height: 350 }}>
        {!listado.isLoading && (
          <View>
            {listado.data !== null && listado.data.length > 0 && (
              <SafeAreaView style={notificationStyles.notificationContainer}>
                <FlatList
                  data={listado.data}
                  renderItem={renderNotificacion}
                  keyExtractor={(notificacion) => notificacion.id}
                />
              </SafeAreaView>
            )}

            {(listado.data === null || listado.data.length === 0) && (
              <Alert type="info" message="Sin notificaciones" />
            )}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity onPress={onMarcarComoLeidas} style={buttonStyles.btn}>
        <Text style={buttonStyles.btnText}>Marcar como leídas</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={buttonStyles.btnBack}>
        <Text style={buttonStyles.btnBackText}>Volver</Text>
      </TouchableOpacity>

      <CustomSpinner isLoading={isLoading} text={"Cargando..."} />
    </ScrollView>
  );
}

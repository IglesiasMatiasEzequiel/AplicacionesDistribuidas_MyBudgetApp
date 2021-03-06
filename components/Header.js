import React from "react";
import { withNavigation } from "@react-navigation/compat";
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  View
} from "react-native";
import { Block, NavBar, theme } from "galio-framework";

import Icon from "react-native-vector-icons/Ionicons";
import materialTheme from "../constants/Theme";
import * as Session from "../components/Session";
import { NotificacionesQueries } from "../database";


const { height, width } = Dimensions.get("window");
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

function Header({ route, navigation, title, white, transparent, back, hideNotificationsButton }) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [notify, setNotify] = React.useState(null);

  const NotificationsButton = ({ isWhite, style, navigation }) => (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => navigation.navigate("Notificaciones", { isReload: true })}
    >
      <Icon
        size={24}
        name="md-notifications"
        color={theme.COLORS[isWhite ? "WHITE" : "ICON"]}
      />
      <Block middle style={notify ? styles.notify : {}} />
    </TouchableOpacity>
  );

  const handleLeftPress = () => back ? navigation.goBack() : navigation.openDrawer();
  const renderNotifications = () => hideNotificationsButton ? <View/> : <NotificationsButton navigation={navigation} isWhite={white} />;

  const limpiarState = () => {
    setIsLoading(false);
    setNotify(false);
  };

  const isNotify = () => {

    setIsLoading(true);

    Session.getUser().then((usuario) => {
      NotificacionesQueries._isNotify(
        usuario.id,
        (data) => {

          setIsLoading(false);
          setNotify(data[0].cantidad !== 0);
        },
        (error) => {
          
          setIsLoading(false);
          setNotify(false);

          console.log(error);
        }
      );
    });
  };

  if((notify === null
    || (route?.params?.isReload ?? false))
    && !isLoading){ 

    /* Se vuelve a setear el isReload para que no siga actualizando el listado*/
    navigation.setParams({ isReload: false });

    isNotify();
  }

  return (
    <Block styles={styles.shadow}>
      <NavBar
        back={back}
        title={title}
        style={styles.navbar}
        transparent={transparent}
        right={renderNotifications()}
        rightStyle={{ alignItems: "center" }}
        leftStyle={{ flex: 0.3, paddingTop: 2 }}
        leftIconName={back ? "chevron-left" : "navicon"}
        leftIconColor={white ? theme.COLORS.WHITE : theme.COLORS.ICON}
        titleStyle={[
          styles.title,
          { color: theme.COLORS[white ? "WHITE" : "ICON"] },
        ]}
        onLeftPress={handleLeftPress}
      />
    </Block>
  );
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: "relative",
  },
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: "absolute",
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
});

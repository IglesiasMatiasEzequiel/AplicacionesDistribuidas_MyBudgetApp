import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";

import { Icon, MenuItem } from '../components/';
import { materialTheme } from "../constants/";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#4B1958',
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'center',
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
  },
  seller: {
    marginRight: 16,
  }
});

export default function Menu({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const insets = useSafeArea();

  const screens = [
    { name: "Home", title: "Home"},
    { name: "Ingresos", title: "Ingresos"},
    { name: "Egresos", title: "Egresos"},
    { name: "Tarjetas", title: "Tarjetas"},
    { name: "CuentasBancarias", title: "Cuentas Bancarias"},
    { name: "Inversiones", title: "Inversiones"},
    { name: "Prestamos", title: "Prestamos"},
    { name: "Presupuestos", title: "Presupuesto"}
  ];

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.25} style={styles.header}>
          <Block style={styles.profile}>
            <Text h5 color={"white"}>
              {profile.apellido + ', ' + profile.nombre}
            </Text>
          </Block>
        <Block row>
          <Text size={16} muted style={styles.seller}>
            {profile.type ?? 'Sin perfil'}
          </Text>
          <Text size={16} color={materialTheme.COLORS.WARNING}>
            {profile.rating ?? '0'}{" "}
            <Icon name="shape-star" family="GalioExtra" size={14} />
          </Text>
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 7, paddingRight: 14 }}>
        <ScrollView
          contentContainerStyle={[
            {
              paddingTop: insets.top * 0.4,
              paddingLeft: drawerPosition === "left" ? insets.left : 0,
              paddingRight: drawerPosition === "right" ? insets.right : 0
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {screens.map((item, index) => {
            return (
              <MenuItem
                name={item.name}
                title={item.title}
                key={index}
                navigation={navigation}
                focused={state.index === index}
              />
            );
          })}
        </ScrollView>
      </Block>
      <Block style={{ paddingLeft: 7, paddingRight: 14 }}>
        <MenuItem
          name="Login"
          title="Cerrar Sesión"
          navigation={navigation}
        />
      </Block>
    </Block>
  );
}

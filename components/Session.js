import AsyncStorage from "@react-native-community/async-storage";

export async function cleanSession() {
  try {
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.log("Error limpiando sesión...");
  }
}

export async function setUser(user) {
  try {
    const u = JSON.stringify(user);
    await AsyncStorage.setItem("user", u);
  } catch (error) {
    console.log("Error guardando usuario en sesión...");
  }
}

export async function getUser() {
  try {
    const u = await AsyncStorage.getItem("user");
    return u != null ? JSON.parse(u) : null;
  } catch (error) {
    console.log("Error obteniendo usuario de sesión...");
  }
}

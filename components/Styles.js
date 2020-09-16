
 import { StyleSheet, Dimensions } from 'react-native'
 import { theme } from "galio-framework";
  
 const { width } = Dimensions.get("screen");

 const screenStyles = StyleSheet.create({
   screen: {
     flex: 1,
     backgroundColor: theme.COLORS.DEFAULT,
     padding: 20,
   }
 });
  
 const buttonStyles = StyleSheet.create({
   btn: {
     width: width - 40,
     backgroundColor: "#69037B",
     borderRadius: 5,
     height: 50,
     alignItems: "center",
     justifyContent: "center",
     marginTop: 10,
     marginBottom: theme.SIZES.BASE,
   },
   btnGreen: {
    width: width - 40,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: theme.SIZES.BASE,
  },
   btnText: {
     color: "white",
   },
   btnBack: {
    alignItems: "center",
    justifyContent: "center",
   },
   btnBackText: {
    color: "black",
    fontSize: 11,
  }
 });

 const dropdownStyles = StyleSheet.create({
    dropdownContainer: {
        width: width - 40,
        height: 50,
        marginBottom: 15,
      },
      dropdown: {
        backgroundColor: "#FAFAFA"
      }
  });

  const textboxStyles = StyleSheet.create({
    textboxContainer: {
      width: width - 40,
      backgroundColor: "white",
      borderRadius: 5,
      height: 50,
      marginBottom: 15,
      justifyContent: "center",
      padding: 20,
    },
    textbox: {
      height: 50,
      color: "black",
    },
  });

  const spinnerStyles = StyleSheet.create({
    spinnerText: {
        color: "#FFF",
      }
  });
  
 export { screenStyles, buttonStyles, textboxStyles, dropdownStyles, spinnerStyles }    
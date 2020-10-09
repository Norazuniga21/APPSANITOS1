import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
    },
    greeting: {
      marginTop: 84,
      fontSize: 20,
      fontWeight: "400",
      textAlign: "center",
      color: "#424242",
    },
    errorMessage: {
      color: "#E9446A",
      height: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    error: {
      color: "#E9446A",
      fontSize: 13,
      fontWeight: "600",
      textAlign: "center",
    },
    inputTitle: {
      color: "#8A8F9E",
      fontSize: 10,
      textTransform: "uppercase",
    },
    input: {
      marginTop: 18,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: "#C4C4C4",
      height: 40,
      fontSize: 16,
      color: "#161F3D",
      padding: 10,
    },
    button: {
      marginTop: 18,
      backgroundColor: "#E9446A",
      borderRadius: 4,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    back: {
      position: "absolute",
      top: 48,
      left: 32,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: "rgba(251, 22, 98, 0.1)",
      alignItems: "center",
      justifyContent: "center",
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: "#E1E2E6",
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonFb: {
      marginTop: 18,
      backgroundColor: "#3C609F",
      borderRadius: 4,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    form: {
      marginTop: 70,
    },
    buttonText: { 
        color: "#ffffff", 
        fontWeight: "500" 
    },
    touchContainer: { 
        alignSelf: "center", 
        position: "absolute", 
        top: 564 
    },
    textButton: { 
        color: "#414959", 
        fontSize: 14 
    },
    textButton2: { 
        fontWeight: "500", 
        color: "#05A4AC" 
    },
  });

export default styles;
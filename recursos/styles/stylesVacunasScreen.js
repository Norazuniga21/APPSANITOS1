import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },
  form: {
    alignItems: "center",
  },
  boxVacuna1:{
    flexDirection: "row", justifyContent: "space-around"
},
  button: {
    backgroundColor: "#4DA6AF",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "33.3%",
  },
  buttonActive: {
    backgroundColor: "#1D96A3",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "33.3%",

  },
  vacunaAplicada: {
    color: "#9b9b9b"
  },
  vacunaPendiente: {
    color: "#9b9b9b"
  },
  infoCard: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#05A4AC",
    borderRadius: 4,
    width: "100%",
    flexDirection: "column",
  },
  textName: {
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#1D96A3",
    padding: 6,
    color: "#fff",
    textTransform: "uppercase",
  },
  targetVacunas: {
    width: "100%",
  },
  paddingCard: {
    marginTop: 4,
    padding: 6,
    backgroundColor: "#fff",
    borderRadius: 4,
    elevation: 10,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      widht: 0,
      height: -1
    }
  },
  boxVacunas: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  textCard: {
    textAlign: "center",
    marginTop: 6,
    fontSize: 14,
    color: "#C4C4C4",
  },
  targetTitle: {
    backgroundColor: "#1D96A3",
    shadowColor: "#000",
    width: "100%",
    padding: 6,
    borderRadius: 4,
    elevation: 10,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      widht: 0,
      height: -1
    }
  },
  textVacuna: {
    fontSize: 14,
    textAlign: "center",
    color: "#838383"
  },
  titleStyle: {
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
  },
  buttonModal: {
    marginTop: 18,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
  },
  titleBtnFilter: {
    fontSize: 14,
    paddingHorizontal: 10,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  subtitle: {
    marginLeft: 10,
  },
  listTab: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 20,
  },
  btnTab: {
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 10,
    justifyContent: "center",
  },
  textTab: {
    fontSize: 16,
  },
  btnTabActive: {
    backgroundColor: "#E6838D",
  },
  infoCard: {
    flexDirection: "row",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#05A4AC",
    borderRadius: 4,
    width: "90%",
    height: 50,
    marginHorizontal: "5%",
    backgroundColor: "white",
  },
  pickerComponent: {
    height: 40,
    width: 270,
    fontSize: 16,
    color: "#C4C4C4",
  },
  dateComponent: {
    borderRadius: 4,
  },
  centeredViews: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(212, 228, 231, 0.5)",
  },
  modalView: {
    margin: 20,
    width: 300,
    height: 350,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonBox: {
    borderTopWidth: 1,
    borderTopColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  col1: {
    borderRightWidth: 1,
    borderRightColor: "#1C94A4",
    width: "30%",
    height: 49,
    justifyContent: "center",
    alignItems: "center",
  },
  col2: {
    borderRightWidth: 1,
    borderRightColor: "#1C94A4",
    width: "55%",
    height: 49,
    justifyContent: "center",
    alignItems: "center",
  },
  col3: {
    width: "15%",
    height: 49,
    justifyContent: "center",
    alignItems: "center",
  },
  formBox: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    width: 270,
    height: 40,
    borderRadius: 4,
    padding: 0,
    color: "#C4C4C4",
  },
  cumpleaños: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    width: 270,
    height: 40,
    borderRadius: 4,
    padding: 10,
    color: "#C4C4C4",
  },
  textCumpleaños: {
    textAlign: "left",
    color: "#C4C4C4",
    fontSize: 16,
  },
  textAgregar: {
    color: "#ffffff",
    fontWeight: "500",
  },
  text: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default styles;

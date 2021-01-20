import React, { useState, useEffect } from "react";
import {
  Picker,
  TextInput,
  Image,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  LayoutAnimation,
  Modal,
  YellowBox,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment/locale/es";
import { MaterialIcons } from "@expo/vector-icons";
import { firebase } from "../utils/firebase";
import styles from "../styles/stylesHomeScreen";
import Userpermision from "../utils/Userpermision";
import CardChildUsers from "../components/cardChildUsers";
import { newbornVaccines, vaccines } from "../utils/const";
import { saveRemindersNewborn } from "../hooks/firebase";
import AwesomeAlert from "react-native-awesome-alerts";
import * as ImagePicker from "expo-image-picker";

//VISTA HOME PRINCIPAL
const HomeScreen = ({ navigation }) => {
  LayoutAnimation.easeInEaseOut();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [sangre, setSangre] = useState("");
  const [foto, setFoto] = useState("");
  const [childUsers, setChildUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState(false);
  const [uidUser, setUidUser] = useState("");
  const [labelDate, setLabelDate] = useState("Fecha de nacimiento");
  const [nameUser, setNameUser] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const { email, uid, displayName } = firebase.auth().currentUser;
    getData(uid);
    setEmail(email);
    setUidUser(uid);
    setNameUser(displayName);
  }, []);

  useEffect(() => {
    Userpermision.getPermissionAsync();
  }, []);

  //FUNCION OBTENER DATOS DE FIRESTORE
  const getData = async (uid) => {
    const querySnapshot = firebase
      .firestore()
      .collection("usuarios")
      .doc(uid)
      .collection("childUsers");
    querySnapshot.onSnapshot((querySnapshot) => {
      var children = [];
      querySnapshot.forEach((doc) => {
        const { birthday } = doc.data();
        const formatoFecha = moment(birthday.toDate()).format("DD/MM/YY");
        children.push({
          ...doc.data(),
          birthday: formatoFecha,
          id: doc.id,
        });
      });

      if (children.length > 0) {
        setChildUsers(children);
      }
    });
  };

  const changeName = (name) => {
    setName(name);
  };

  //FUNCION AGREGAR NIÑA/O
  const buttonPressed = () => {
    if (selectDate && name !== "" && gender !== "" && sangre !== "") {
      let now = new Date(date);

      const documentChildUser = {
        birthday: firebase.firestore.Timestamp.fromDate(now),
        bloodType: sangre,
        gender,
        name,
        image,
      };
      handleAddChildUser(documentChildUser, now);
    } else {
      setShowAlert(true);
    }
  };

  //FUNCION GUARDAR RECORDATORIOS
  const handleSaveReminders = async (
    firstReminder,
    SecondReminder,
    thirdReminder,
    fourthReminder,
    childId,
    vaccine,
    idVaccine,
    vaccinationDate
  ) => {
    const ArrayRecordatorios = [
      {
        date: firebase.firestore.Timestamp.fromDate(new Date(firstReminder)),
        days: 15,
      },
      {
        date: firebase.firestore.Timestamp.fromDate(new Date(SecondReminder)),
        days: 7,
      },
      {
        date: firebase.firestore.Timestamp.fromDate(new Date(thirdReminder)),
        days: 3,
      },
      {
        date: firebase.firestore.Timestamp.fromDate(new Date(fourthReminder)),
        days: 1,
      },
    ];

    const doc = {
      ArrayRecordatorios,
      childId: childId,
      userId: uidUser,
      child: name,
      user: nameUser,
      vaccine,
      stateReminder: true,
      idVaccine,
      vaccinationDate: firebase.firestore.Timestamp.fromDate(
        new Date(vaccinationDate)
      ),
    };

    await saveRemindersNewborn(doc);

    setName("");
    setGender("");
    setSangre("");
    setLabelDate("Fecha de nacimiento");
    setSelectDate(false);
  };

  const handleReminders = (idChild, vacuna, now, idVaccine) => {
    const { days, vaccine } = vacuna;
    const vaccinationDate = moment(now).add(days - 1, "d");
    const vaccinationDateRemider = moment(now).add(days, "d");
    const firstReminder = moment(vaccinationDateRemider).subtract(15, "d");
    const SecondReminder = moment(vaccinationDateRemider).subtract(7, "d");
    const thirdReminder = moment(vaccinationDateRemider).subtract(3, "d");
    const fourthReminder = moment(vaccinationDateRemider).subtract(1, "d");
    handleSaveReminders(
      firstReminder,
      SecondReminder,
      thirdReminder,
      fourthReminder,
      idChild,
      vaccine,
      idVaccine,
      vaccinationDate
    );
  };

  //FUNCION ELIMINAR NIÑO DE FIRESTORE
  const handleDeleteChildUser = () => {
    const ref = firebase
      .firestore()
      .collection("usuarios")
      .doc(uidUser)
      .collection("childUsers");

    ref
      .delete()
      .then((docRef) => {
        const { id } = docRef;
        setOpenModal(false);
        setName("");
        setGender("");
        setSangre("");
        setFoto("");
        setLabelDate("Fecha de nacimiento");
        setSelectDate(false);
        setImage(null);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
         const upload =
          Fire.addPhoto(image).then(() => {
            setImage(null)
          })
            .catch(err => {
              alert(err.message)
            }) 
  };

    //FUNCION AGREGAR NIÑO A FIRESTORE
    const handleAddChildUser = (documentChildUser, now) => {
      const ref = firebase
        .firestore()
        .collection("usuarios")
        .doc(uidUser)
        .collection("childUsers");
  
      ref
        .add(documentChildUser)
        .then((docRef) => {
          const { id } = docRef;
          setModalVisible(false);
          handleAddVaccines(ref, id, now);
          setName("");
          setGender("");
          setSangre("");
          setFoto("");
          setLabelDate("Fecha de nacimiento");
          setSelectDate(false);
          setImage(null);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      /*     const upload =
            Fire.addPhoto(image).then(() => {
              setImage(null)
            })
              .catch(err => {
                alert(err.message)
              }) */
    };

  //FUNCION AGREGAR VACUNAS
  const handleAddVaccines = (ref, id, now) => {
    const refChild = ref.doc(id).collection("vacunas");
    const ChildId = id;
    const vaccinesArray = newbornVaccines();
    const arrayUserVaccines = vaccines();
    const formatToday = new Date();
    const serverDate = moment(formatToday).format("L");
    const nowDate = moment(now).format("L");
    var x = moment(nowDate, "DD-MM-YYYY");
    const comparisonDates = x.isAfter(moment(serverDate, "DD-MM-YYYY"));

    if (comparisonDates) {
      vaccinesArray.forEach((Element) => {
        refChild
          .add(Element)
          .then((docRef) => {
            const { id } = docRef;
            handleReminders(ChildId, Element, now, id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      });
    } else {
      arrayUserVaccines.forEach((Element) => {
        refChild
          .add(Element)
          .then((docRef) => {
            const { id } = docRef;
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      });
    }
  };

  const onChange = (event, selectedDate) => {
    const dateFormat = moment(selectedDate).format("DD/MM/YY");
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setLabelDate(dateFormat);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setSelectDate(true);
    showMode("date");
  };

  //FUNCION OBTENER URI DE IMAGEN , FOTO QUE SE AGREGA DEL NIÑO
  const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        // something went wrong
        reject(new Error("uriToBlob failed"));
      };

      // this helps us get a blob
      xhr.responseType = "blob";

      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  //FUNCION ALMACENAR FOTO EN STORAGE
  const uploadToFirebase = (blob) => {
    return new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref();

      storageRef
        .child("uploads/photo.jpg")
        .put(blob, {
          contentType: "image/jpeg",
        })
        .then((snapshot) => {
          blob.close();

          resolve(snapshot);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  //FUNCION PARA PODER SELECCIONAR UNA FOTO DE LIBRERIA DE USUARIO 
  const pickImage = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
      .then((result) => {
        if (!result.cancelled) {
          // User picked an image
          const { height, width, type, uri } = result;
          setImage(result.uri);
          return uriToBlob(uri);
        }
      })
      .then((blob) => {
        return uploadToFirebase(blob);
      })
      .then((snapshot) => {
        console.log("File uploaded");
      })
      .catch((error) => {
        throw error;
      });
  };

  /* const openModal = (doc) => {
    const {} = doc;
    
  }; */

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.textWelcome}> Hola, gracias por estar aquí.</Text>
      <View style={styles.containerCards}>
        <View>
          {childUsers.map((doc, index) => {
            const { name, birthday, bloodType, gender, image } = doc;
            return (
              <TouchableOpacity
                style={styles.infoCard}
                key={index}
                onPress={() => {
                  navigation.navigate("Nino", {
                    id: doc,
                  });
                }}
              >
                <View style={styles.nameContainer} >
                  <Text style={styles.textName}>{name}</Text>
                  <TouchableOpacity style={styles.iconName} onPress={() => setOpenModal(true)}>
                    <MaterialIcons name="delete" size={24} color="white" />
                  </TouchableOpacity>
                </View>

                <View style={styles.rowCard}>
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <Image
                        source={{ uri: image }}
                        style={{
                          width: 60,
                          height: 60,
                          marginHorizontal: 18,
                          marginVertical: 6,
                          borderRadius: 360,
                        }}
                      />
                    </View>
                    <View style={styles.paddingCard}>
                      <Text style={styles.textCardChild}>Nacimiento: {birthday} </Text>
                      <Text style={styles.textCardChild}>
                        Tipo de sangre: {bloodType}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.infoCard1}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.textAgregar}>
              {" "}
              + Agregue los datos de su niño/niña{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.centeredViews}>
          <View style={styles.modalView}>
            <MaterialIcons
              name="close"
              size={24}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={styles.iconBox}
            />

            <View>
              <View>
                <Text style={styles.titleModal}>Registrar niñ@</Text>
              </View>

              <View style={styles.input1}>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre*"
                  autoCapitalize="none"
                  onChangeText={(name) => changeName(name)}
                  value={name}
                />
              </View>

              <View style={styles.pickerBox}>
                <Picker
                  style={styles.picker}
                  selectedValue={gender}
                  onValueChange={(itemValor) => setGender(itemValor)}
                >
                  <Picker.Item label="Sexo*" value="" />
                  <Picker.Item label="Niña" value="Niña" />
                  <Picker.Item label="Niño" value="Niño" />
                </Picker>
              </View>

              <View style={styles.pickerBox}>
                <Picker
                  style={styles.picker}
                  selectedValue={sangre}
                  onValueChange={(itemValor) => setSangre(itemValor)}
                >
                  <Picker.Item label="Tipo de sangre*" value="" />
                  <Picker.Item label="A positivo" value="A positivo" />
                  <Picker.Item label="A negativo" value="A negativo" />
                  <Picker.Item label="B positivo" value="B positivo" />
                  <Picker.Item label="B negativo" value="B negativo" />
                  <Picker.Item label="O negativo" value="O negativo" />
                  <Picker.Item label="O positivo" value="O positivo" />
                  <Picker.Item label="AB positivo" value="AB positivo" />
                  <Picker.Item label="AB negativo" value="AB negativo" />
                </Picker>
              </View>
              <View>
                <View>
                  <TouchableOpacity
                    onPress={showDatepicker}
                    style={styles.inputBirthday}
                  >
                    <Text style={styles.textAgregar1}>{labelDate}</Text>
                  </TouchableOpacity>

                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="spinner"
                      onChange={onChange}
                    />
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={styles.buttonFoto}
                onPress={() => pickImage()}
              >
                <View>
                  {image === null ? (
                    <Text
                      style={{
                        color: "#B0B0B0",
                        fontWeight: "500",
                        textAlign: "center",
                        textDecorationLine: "underline",
                      }}
                    >
                      Agregar foto
                    </Text>
                  ) : (
                      <View>
                        <Image
                          source={{ uri: image }}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 4,
                          }}
                        ></Image>
                      </View>
                    )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonModal}
                onPress={() => buttonPressed()}
              >
                <Text style={{ color: "#ffffff", fontWeight: "500" }}>
                  Registrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ELIMINAR NIÑO MODAL */}
      <Modal visible={openModal} transparent={true} animationType="fade">
        <View style={styles.centeredViews}>
          <View style={styles.modalViewDelete}>
            <View >
            <MaterialIcons
              name="close"
              size={24}
              onPress={() => {
                setOpenModal(!openModal);
              }}
              style={styles.iconBox}
            />
              <View >
                <Text style={{ color: "#B0B0B0", fontWeight: "500", fontSize:15,marginHorizontal:30, textAlign:"center" }}>
                  ¿Esta seguro que desea eliminar este registro?
                </Text>
              </View >

              <TouchableOpacity
                style={styles.buttonModalDelete}
                onPress={() => handleDeleteChildUser()}
              >
                <Text style={{ color: "#ffffff", fontWeight: "500" }}>
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Importante"
        message="Debe llenar todos los campos para registrar a su niño."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="Cancelar"
        confirmText="Aceptar"
        confirmButtonColor="#C13273"
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
    </ScrollView>
  );
};

export default HomeScreen;

import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native-gesture-handler";
import { firebase } from "./utils/firebase";
import styles from "./styles/stylesSignupScreen";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import { saveTokenPhone } from "./hooks/firebase";
import { getPhoneToken } from "./commons/user";
import Constants from 'expo-constants';
import * as Google from 'expo-google-app-auth';
import * as Facebook from "expo-facebook";
import { androidClientId } from "./utils/const";

/* SOCIAL MEDIA */
const appId = Constants.manifest.facebookAppId;

const LoginWithGoogle = async () => {
  try {
    const { type, idToken, accessToken } = await Google.logInAsync({
      androidClientId,
      clientId: androidClientId,
      // iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ['profile', 'email'],
    });
    if (type === 'success') {
      // return result.accessToken;
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
      firebase.auth().signInWithCredential(credential)
        .then(user => { // All the details about user are in here returned from firebase
          // console.log('Logged in successfully', user)
        })
        .catch((error) => {
          console.log('Error occurred ', error)
        });
    } else {
      return { cancelled: true };
    }
  } catch ({ message }) {
    alert(`LoginWithGoogle Login Error: ${message}`);
  }
}

const Facebooklogin = async () => {
  try {
    await Facebook.initializeAsync(appId); // enter your Facebook App Id 
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      // SENDING THE TOKEN TO FIREBASE TO HANDLE AUTH
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential)
        .then(user => { // All the details about user are in here returned from firebase
          // console.log('Logged in successfully', user)
        })
        .catch((error) => {
          console.log('Error occurred ', error)
        });
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}


const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertPassword, setShowAlertPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);


  const handleSignUp = async () => {
    try {
      if (email !== "" && password !== "" && cpassword !== "" && name !== "") {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        await user.updateProfile({
          displayName: name,
        });

        await saveTokenPhone(getPhoneToken(), user.uid);
      } else {
        setShowAlertPassword(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
      <Text style={styles.textTitle}>Regístrese</Text>
      <View style={styles.errorMessage}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>

      <View>
        <View style={styles.input1}>
          <TextInput
            placeholder={"Nombre"}
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(name) => setName(name)}
            value={name}
          ></TextInput>
        </View>

        <View style={styles.input2}>
          <TextInput
            placeholder={"Email"}
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
            value={email}
          ></TextInput>
        </View>
        <View style={styles.input3}>
          <TextInput
            placeholder={"Contraseña"}
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(password) => setPassword(password)}
            value={password}
          ></TextInput>
        </View>
        <View style={styles.input4}>
          <TextInput
            placeholder={"Repetir contraseña"}
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(cpassword) => setCPassword(cpassword)}
            value={cpassword}
          ></TextInput>
        </View>
      </View>

      <View style={styles.button1}>
        <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
          <Text style={styles.textbutton}>Regístrate</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button2}>
        <TouchableOpacity style={styles.buttonFb} onPress={Facebooklogin}>
          <EvilIcons name="sc-facebook" size={30} color="white" />
          <Text style={styles.textbutton}>Ingresar con Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button3}>
        <TouchableOpacity style={styles.buttonGo}
          onPress={() => LoginWithGoogle()}>
          <AntDesign name="google" size={20} color="red" />
          <Text style={styles.textbutton1}>Ingresar con Google</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.containerTextSignIn}
        onPress={() => navigation.push("Login")}
      >
        <Text style={{ color: "#B0B0B0", fontSize: 12 }}>
          Ya tienes cuenta?{" "}
          <Text style={{ fontWeight: "500", color: "#1D96A3" }}>
            Inicia sesión
          </Text>
        </Text>
      </TouchableOpacity>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Importante"
        message="Debe ingresar todos los campos."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="Cancelar"
        confirmText="Aceptar"
        confirmButtonColor="#E9446A"
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
      <AwesomeAlert
        show={showAlertPassword}
        showProgress={false}
        title="Importante"
        message="Las contraseñas no coinciden."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="Cancelar"
        confirmText="Aceptar"
        confirmButtonColor="#E9446A"
        onCancelPressed={() => {
          setShowAlertPassword(false);
        }}
        onConfirmPressed={() => {
          setShowAlertPassword(false);
        }}
      />
    </View>
  );
};

export default SignupScreen;

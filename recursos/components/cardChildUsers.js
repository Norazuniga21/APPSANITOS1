import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/stylesHomeScreen";

const CardChildUsers = ({ childUsers, navigation }) => {
  return childUsers.map((doc, index) => {
    console.log(doc);
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
        <View>
          <Text style={styles.textName}>{name}</Text>
        </View>

        <View style={styles.rowCard}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={{uri:image}}
                style={{ width: 60, height: 60, marginHorizontal: 18, marginVertical:6, borderRadius:360,}}
              />
            </View>
            <View style={styles.paddingCard}>
              <Text style={styles.textCardChild}>Fecha nacimiento:{"\n"}{birthday} </Text>

            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  });
};

export default CardChildUsers;

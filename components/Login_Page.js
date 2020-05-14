import React, { useState, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  AsyncStorage,
  AsyncStorageStatic,
} from "react-native";
import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";

export default function LogIn({ navigation }){
  const [userLogin, setUserLogin] = useState("");
  const [passLogin, setPassLogin] = useState("");

  const setPass = (passLog) => {
    setPassLogin(passLog);
  };

  const setUser = (userLog) => {
    setUserLogin(userLog);
  };

  const tryLogin = () => {
    if (userLogin == "" || passLogin == "") {
      alert("Please complete sign in details");
    } else {
      console.log(userLogin + " " + passLogin);
      const data = {
        db_identifier: "UNILEVER",
        username: userLogin,
        password: passLogin,
      };
      const username = userLogin;
      const password = passLogin;
      const db_identifier = "UNILEVER";

      const params = new URLSearchParams({
        db_identifier: db_identifier,
        username: username,
        password: password,
      });

      const url =
        "http://unilever-test.au-syd.mybluemix.net/shepherd/packuserslogin?";
      const url2 = url + params.toString();
      console.log(params.toString());
      fetch(url2, {
        method: "POST",
        body: params,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            alert("Sign In Successful!");
            navigation.navigate("User List");
          }
          else{
            alert("STATUS: " + data.status);
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };
  return (
    <View
      style={{
        padding: 30,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#EDC7B7",
      }}
    >
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 30 }}>Hello, Welcome.</Text>
        <Text style={{ fontSize: 30 }}>Kindly Sign In.</Text>
      </View>
      <View style={styles.username}>
        <Text style={{ fontSize: 20 }}>Username</Text>
        <TextInput
          style={styles.inputUP}
          placeholder="username"
          value={userLogin}
          onChangeText={(userLOGNAME) => setUser(userLOGNAME)}
          required
        />
      </View>

      <View style={styles.password}>
        <Text style={{ fontSize: 20 }}>Password</Text>
        <TextInput
          style={styles.inputUP}
          placeholder="password"
          onChangeText={(passLOG) => setPass(passLOG)}
          required
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonSign}>
        <Button color="#123C69" title="Sign In" onPress={tryLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    justifyContent: "center",
  },
  inputUP: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: "gray",
    borderBottomWidth: 2,
    fontSize: 20,
    backgroundColor: "rgba(73,70,71,.5)",
  },
  buttonSign: {
    marginTop: 30,
    paddingHorizontal: 50,
  },
  buttons: {},
  username: { marginTop: 10, paddingHorizontal: 20 },
  password: { marginTop: 10, paddingHorizontal: 20 },
});

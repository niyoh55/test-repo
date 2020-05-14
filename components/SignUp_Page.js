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
import { ScrollView } from "react-native-gesture-handler";

export default function SignUp({ navigation }) {
  const [username, getUsername] = useState("");
  const [password, getPassword] = useState("");

  const [fullname, setFullName] = useState("");
  const [fsurname, setSurname] = useState("");
  const [contactno, setContact] = useState("");
  const [address, setAddress] = useState("");

  const getUser = (user) => {
    getUsername(user);
  };

  const getPass = (pass) => {
    getPassword(pass);
  };

  const getFullName = (fName) => {
    setFullName(fName);
  };

  const getSurname = (surname) => {
    setSurname(surname);
  };

  const getAddress = (addr) => {
    setAddress(addr);
  };

  const getContact = (contact) => {
    setContact(contact);
  };
  const alreadyHave = () => {
    navigation.navigate("Sign In");
  };

  const tryConnect = () => {
    if (
      username == "" ||
      password == "" ||
      address == "" ||
      contactno == "" ||
      fullname == "" ||
      fsurname == ""
    ) {
      alert("Please complete sign up details");
    } else {
      const data = {
        db_identifier: "UNILEVER",
        username: username,
        password: password,
        address: address,
        contact_number: contactno,
        firstname: fullname,
        lastname: fsurname,
      };

      fetch("http://unilever-test.au-syd.mybluemix.net/shepherd/packusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())

        .then((data) => {
          alert("MESSAGE: " + data.message + "\r\n" + "STATUS: " + data.status);
          console.log(data);
          if (data.status == "success") {
            navigation.navigate("Sign In");
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };
  return (
    <View style={styles.screen}>
      <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',flex:1}}></View>
      <View style={{flex:1,justifyContent:'center',alignContent:'center',flexDirection:'row'}}><Text style={{fontSize:40}}>Sign Up</Text></View>
      
      <ScrollView>
        <View style={styles.inputField}>
          <View style={styles.username}>
            <TextInput
              style={styles.inputUP}
              placeholder="First Name"
              onChangeText={(fName) => getFullName(fName)}
              value={fullname}
              required
            />
          </View>

          <View style={styles.username}>
            <TextInput
              style={styles.inputUP}
              placeholder="Last Name"
              onChangeText={(surname) => getSurname(surname)}
              value={fsurname}
              required
            />
          </View>

          <View style={styles.username}>
            <TextInput
              style={styles.inputUP}
              placeholder="Address"
              onChangeText={(addr) => getAddress(addr)}
              value={address}
              required
            />
          </View>

          <View style={styles.username}>
            <TextInput
              style={styles.inputUP}
              placeholder="Contact Number"
              onChangeText={(contact) => getContact(contact)}
              value={contactno}
              required
            />
          </View>

          <View style={styles.username}>
            <TextInput
              style={styles.inputUP}
              placeholder="Username"
              onChangeText={(user) => getUser(user)}
              value={username}
              required
            />
          </View>

          <View style={styles.password}>
            <TextInput
              style={styles.inputUP}
              placeholder="Password"
              onChangeText={(pass) => getPass(pass)}
              required
              secureTextEntry={true}
            />
          </View>
          <View style={styles.buttonSign}>
            <Button color="#123C69" title="Sign Up" onPress={tryConnect} />
          </View>
          <View style={styles.buttonSign}>
            <Button
            color="#123C69"
              title="Have an Account?"
              onPress={alreadyHave}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 20, flex: 1,backgroundColor:'#EDC7B7' },
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
    marginTop:30,
    paddingHorizontal: 50,
  },
  buttons:{
      
  },
  username: { marginTop: 10, paddingHorizontal: 20 },
  password: { marginTop: 10, paddingHorizontal: 20 },

});

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

export default function editUser({ route, navigation }) {
  
  const { username } = route.params;
  const { password } = route.params;
  const { contact_number } = route.params;
  const { created_at } = route.params;
  const { deleted_at } = route.params;
  const { firstname } = route.params;
  const { lastname } = route.params;
  const { address } = route.params;



  const [username1, getUsername] = useState(username);
  const [password1, getPassword] = useState(password);
  const [fullname1, setFullName] = useState(firstname);
  const [fsurname1, setSurname] = useState(lastname);
  const [contactno1, setContact] = useState(contact_number);
  const [address1, setAddress] = useState(address);

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
      const data = {
        db_identifier: "UNILEVER",
        username: username1,
        address: address1,
        contact_number: contactno1,
        firstname: fullname1,
        lastname: fsurname1,
      };

      fetch("http://unilever-test.au-syd.mybluemix.net/shepherd/packusers", {
        method: "PUT",
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
            const randomnumber = Math.random()
            navigation.navigate("User List", { caption: randomnumber });
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    };


  return (
    <View style={styles.screen}>
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',flex:1}}><Text style={{fontSize:40}}></Text></View>
      <ScrollView>
        <View style={styles.inputField}>
          <View style={styles.username}>
            <Text style={styles.textAbove}>First Name</Text>
            <TextInput
              style={styles.inputUP}
              placeholder="First Name"
              onChangeText={(fName) => getFullName(fName)}
              value={fullname1}
              required
            />
          </View>

          <View style={styles.username}>
          <Text style={styles.textAbove}>Lasst Name</Text>
            <TextInput
              style={styles.inputUP}
              placeholder="Last Name"
              onChangeText={(surname) => getSurname(surname)}
              value={fsurname1}
              required
            />
          </View>

          <View style={styles.username}>
          <Text style={styles.textAbove}>Address</Text>
            <TextInput
              style={styles.inputUP}
              placeholder="Address"
              onChangeText={(addr) => getAddress(addr)}
              value={address1}
              required
            />
          </View>

          <View style={styles.username}>
          <Text style={styles.textAbove}>Contact Number</Text>
            <TextInput
              style={styles.inputUP}
              placeholder="Contach Number"
              onChangeText={(contact) => getContact(contact)}
              value={contactno1}
              required
            />
          </View>

          
          <View style={styles.buttonSign}>
            <Button color="#123C69" title="Submit" onPress={tryConnect} />
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
  textAbove:{fontSize:20}
});

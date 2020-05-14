import React, { useState, Component, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  AsyncStorage,
  AsyncStorageStatic,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRoute} from "@react-navigation/native";
import { Icon } from "react-native-elements";

export default function userList({ navigation }) {



  const [counter, setCounter] = useState(0);
  const [count, setCount] = React.useState(0);

  const tryfunc = () => {
    incCount();
    console.log("try func: " + counter);
  };

  navigation.setOptions({
    headerRight: () => (
      <Icon
        name="refresh"
        type="evilicon"
        color="#517fa4"
        raised
        onPress={tryfunc}
      />
    ),
  });

  const [isLoading, setLoading] = useState(true);
  const [isContentAvail, setAvail] = useState(true);
  const [dataItems, setData] = useState({});

  const gotoAddUser = () => {
    navigation.navigate("Add User");
  };

  const loadItems = () => {
    fetch(
      "http://unilever-test.au-syd.mybluemix.net/shepherd/packusers?db_identifier=UNILEVER",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())

      .then((json) => setData(json.return))
      .then(() => {
        console.log("eto yung length" + dataItems.length);
        if (dataItems.length == 0) {
          setAvail(false);
        } else if (dataItems.length == 1) {
          setAvail(true);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => loadItems(), [counter]);


  const route = useRoute();
  useEffect(() => incCount(), [route.params.caption]);




  function sendItems(items) {
    navigation.navigate("Edit User", items);
  }
  const incCount = () => {
    setCounter(counter + 1);
  };

  const deleteItem = (userDelete) => {
    var urlDelete =
      "http://unilever-test.au-syd.mybluemix.net/shepherd/packusers?db_identifier=UNILEVER&username=" +
      userDelete;
    fetch(urlDelete, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())

      .then((data) => {
        if (data.status == "success") {
          alert(
            "The account of " + userDelete + " has been successfully deleted."
          );
          incCount();
          console.log(counter);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <View style={styles.screen}>
      
      <View style={{ flex: 9.5, paddingHorizontal: 5 }}>
        {isContentAvail ? (
          <View></View>
        ) : (
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 35 }}>No Items Available</Text>
          </View>
        )}
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={dataItems}
            keyExtractor={(item) => item.username}
            renderItem={({ item }) => (
              <View style={styles.itemlist}>
                <View style={{ flex: 3 }}>
                  <Text style={{ fontSize: 20 }}>
                    {item.firstname} {item.lastname}
                    {"\n"}
                    {item.address}
                    {"\n"}
                    {item.contact_number}
                  </Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Button
                    color="#123C69"
                    title="EDIT"
                    onPress={() => sendItems(item)}
                  />
                </View>
                <View style={{ flex: 1, justifyContent: "center", padding: 0 }}>
                  <Button
                    color="red"
                    title="DEL"
                    onPress={() => deleteItem(item.username)}
                  />
                </View>
              </View>
            )}
          />
        )}
      </View>

      <View style={{ flex: 0.3 }}>
        <Button
          color="#123C69"
          title="Add User"
          onPress={() => gotoAddUser()}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    paddingTop: 10,
    paddingBottom: 20,

    flex: 10,
    backgroundColor: "#EDC7B7",
  },
  itemlist: {
    paddingLeft: 5,
    //borderBottomColor: "gray",
    //borderBottomWidth: 3,
    borderColor: "gray",
    borderWidth: 3,
    flexDirection: "row",
    marginVertical: 10,
    flex: 3,
  },
});

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./components/SignUp_Page";
import LogIn from "./components/Login_Page";
import userList from "./components/userList";
import AddUser from "./components/addUserPage";
import editUser from "./components/editUser";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign Up">
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign In"
          component={LogIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="User List"
          component={userList}
          options={{
            headerShown: true,
            headerLeft: null,
            headerTitle: "List of Users",
            headerTitleAlign: "center",
          }}
          initialParams={{ randomnumber: 123 }}
        />
        <Stack.Screen
          name="Add User"
          component={AddUser}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Edit User"
          component={editUser}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

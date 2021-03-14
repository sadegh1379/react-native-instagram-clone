import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {  View, ActivityIndicator } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import firebase from "firebase";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import Main from "./components/Main";
import Add from "./components/main/Add";
import Save from "./components/main/Save";

const firebaseConfig = {
  apiKey: "AIzaSyCv_SvUSSaeysGwzyfHjTfKQxZIQD8eMXg",
  authDomain: "instagram-demo-c185a.firebaseapp.com",
  projectId: "instagram-demo-c185a",
  storageBucket: "instagram-demo-c185a.appspot.com",
  messagingSenderId: "865861173598",
  appId: "1:865861173598:web:f330b8eb54a81a9cb2cfcf",
  measurementId: "G-B54G6MVETF",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();
export default function App() {
  const [myApp, setMyApp] = useState({
    loaded: true,
    loggedIn: false,
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // console.log("user" , user)
      if (!user) {
        setMyApp({
          loaded: false,
          loggedIn: false,
        });
      } else {
        setMyApp({
          loaded: false,
          loggedIn: true,
        });
      }
    });
  }, []);

  if (myApp.loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="red" size={30} />
      </View>
    );
  }
  if (!myApp.loggedIn) {
    return (
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Add"
            component={Add}
          />
           <Stack.Screen
            name="Save"
            component={Save}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

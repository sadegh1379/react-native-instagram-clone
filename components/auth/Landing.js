import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.headText}>Instagram</Text>
        </View>
        <View style={styles.body}>
          <Pressable style={styles.myPres} onPress={()=>navigation.navigate('Register')}>Register</Pressable>
          <Pressable style={styles.myPres} onPress={()=>navigation.navigate('Login')}>Login</Pressable>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
    justifyContent:'center',
  },
  head: {
    justifyContent: "center",
    alignItems: "center",
    padding:20
  },
  body: {
  },
  headText:{
      fontSize : 24,
      fontWeight : 'bold'
  },
  myPres :{
    padding : 10,
    textAlign:'center',
    borderWidth : 1,
    borderColor : 'red',
    marginTop : 10,
    borderRadius : 10
  }
});

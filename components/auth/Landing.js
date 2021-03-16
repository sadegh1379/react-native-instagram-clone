import React from "react";
import { Text, View, Pressable, StyleSheet, Image } from "react-native";
import * as Animatable from "react-native-animatable";


export default function Landing({ navigation }) {
  return (
    <Animatable.View animation="bounceIn" style={styles.container}>
        <View style={{justifyContent:'center' , alignItems:'center'}}>
            <Image style={{width : 100 , height : 100}} source={require('../../assets/images/head.jpg')} />
        </View>
        <View style={styles.head}>
          <Text style={styles.headText}>Instagram</Text>
        </View>
        <View style={styles.body}>
          <Pressable style={styles.myPres} onPress={()=>navigation.navigate('Register')}><Text style={{fontWeight : 'bold'}}>Register</Text></Pressable>
          <Pressable style={styles.myPres} onPress={()=>navigation.navigate('Login')}><Text style={{fontWeight:'bold'}}>Login</Text></Pressable>
        </View>
    </Animatable.View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
    justifyContent:'flex-start',
    paddingTop : 100,
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
    borderColor : '#e91e63',
    marginTop : 10,
    borderRadius : 10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
  }
});

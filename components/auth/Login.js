import React, { useState } from "react";
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from "firebase";

const Login = (props) => {
  const [passwordError, setPasswordError] = useState('');

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("required!")
      .min(2, "too short")
      .max(20, "too long"),
  });

  const timer = (time)=>{
    setTimeout(()=>{
        setPasswordError('');
    } , time)
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        console.log("values : ", values);
        const user = {
          email: values.email,
          password: values.password,
        };
        firebase
          .auth()
          .signInWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            console.log(res);
          })
          .catch((err) =>{
            setPasswordError('email or password is not correct !');
            timer(3000);
          }) 
      }}
      validationSchema={SignupSchema}
    >
      {({ handleChange, errors, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Login</Text>
          <View>
          {passwordError.length > 0 ? (
            <View style={styles.cError}>
              <Text>{passwordError}</Text>
            </View>
          ) : null}
          </View>
         
         

          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            placeholder="email"
            style={[styles.myInput, { marginTop: 50 }]}
          />
          <View>
          {errors.email ? (
            <Animatable.Text animation="fadeIn" style={styles.errorText}>
              {errors.email}
            </Animatable.Text>
          ) : null}
          </View>
          
          <TextInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry={true}
            placeholder="password"
            style={styles.myInput}
          />
          <View>
          {errors.password ? (
            <Animatable.Text animation="fadeIn" style={styles.errorText}>
              {errors.password}
            </Animatable.Text>
          ) : null}
          </View>
         
          <Pressable onPress={handleSubmit} style={styles.press}>
            <Text style={{ fontWeight: "bold" }}>Log In</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    
    paddingTop: 100,
  },
  errorText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "red",
    opacity: 0.8,
  },
  myInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
    marginTop: 10,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  press: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 18,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cError: {
    padding: 8,
    width: "100%",
    fontSize: 15,
    fontWeight: "bold",
    borderWidth : 1,
    borderColor : '#E91E63',
    marginTop: 10,
    borderRadius: 10,
    textAlign: "center",
  },
});

export default Login;

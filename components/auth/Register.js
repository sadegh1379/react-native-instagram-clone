import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from "firebase";

const Register = (props) => {
  const [emailAlready, setEmailAlready] = useState("");
  const [loading, setLoading] = useState(false);
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("required!")
      .min(6, "too short")
      .max(20, "too long"),
  });

  return (
    <Animatable.View animation="bounceIn">
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={(values) => {
        setLoading(true);
        firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then((res) => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                name: values.name,
                email: values.email,
              });
          })
          .catch((err) => {
            setEmailAlready(err.message);
            
          });
          setLoading(false);
      }}
      validationSchema={SignupSchema}
    >
      {({ handleChange, errors, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          {/* <Text style={{fontSize:24 , fontWeight:'bold'}}>Register</Text> */}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("../../assets/images/head.jpg")}
            />
          </View>
          <View>
            {emailAlready.length > 0 ? (
              <View style={styles.cError}>
                <Text>{emailAlready}</Text>
              </View>
            ) : null}
          </View>
          <TextInput
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
            placeholder="name"
            style={[styles.myInput, { marginTop: 30 }]}
          />
          {errors.name ? (
            <Animatable.Text animation="fadeIn" style={styles.errorText}>
              {errors.name}
            </Animatable.Text>
          ) : null}
          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            placeholder="email"
            style={styles.myInput}
          />
          {errors.email ? (
            <Animatable.Text animation="fadeIn" style={styles.errorText}>
              {errors.email}
            </Animatable.Text>
          ) : null}
          <TextInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry={true}
            placeholder="password"
            style={styles.myInput}
          />
          {errors.password && (
            <Animatable.Text animation="fadeIn" style={styles.errorText}>
              {errors.password}
            </Animatable.Text>
          )}
          <Pressable onPress={handleSubmit} style={styles.press}>
            {loading ? (
              <ActivityIndicator color="#e91e63" />
            ) : (
              <Text style={{ fontWeight: "bold" }}>Sin Up</Text>
            )}
          </Pressable>
        </View>
      )}
    </Formik>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    // backgroundColor:'#fff',
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
    borderWidth: 1,
    borderColor: "#E91E63",
    marginTop: 10,
    borderRadius: 10,
    textAlign: "center",
  },
});

export default Register;

import React from "react";
import { Text, View, TextInput, Pressable ,StyleSheet } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Formik } from "formik";
import * as Yup from "yup";


const Register = (props) => {

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password : Yup.string().required('required!').min(2 , 'too short').max(20 , 'too long')
  });

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={(values) => console.log(values)}
      validationSchema={SignupSchema}
    >
      {({ handleChange, errors, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <TextInput
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
            placeholder="name"
          />
          {errors.name && <Animatable.Text animation="fadeIn" style={styles.errorText}>{errors.name}</Animatable.Text>}
          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            placeholder="email"
          />
            {errors.email && <Animatable.Text animation="fadeIn"  style={styles.errorText}>{errors.email}</Animatable.Text>}
          <TextInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry={true}
            placeholder="password"
          />
         {errors.password && <Animatable.Text animation="fadeIn" style={styles.errorText}>{errors.password}</Animatable.Text>}
          <Pressable onPress={handleSubmit}>
            <Text>Sin Up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : '80%',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    errorText : {
        fontSize : 12,
        fontWeight : 'bold',
        color : 'red',
        opacity : .8,
    }
})

export default Register;

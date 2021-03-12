import React from "react";
import { Text, View, TextInput, Pressable ,StyleSheet  } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from 'firebase';

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
      onSubmit={(values) =>{
          console.log("values : " , values);
          const user = {
              email : values.email,
              password : values.password
          }
          firebase.auth().createUserWithEmailAndPassword(user.email , user.password)
          .then((res)=>{
              console.log(res)
          }).catch(err=>console.log(err));
      }}
      validationSchema={SignupSchema}
    >
      {({ handleChange, errors, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
            <Text style={{fontSize:24 , fontWeight:'bold'}}>Register</Text>
          
          <TextInput
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
            placeholder="name"
            style={[styles.myInput , {marginTop : 30}]}
          />
          {errors.name ? <Animatable.Text animation="fadeIn" style={styles.errorText}>{errors.name}</Animatable.Text> : null}
          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            placeholder="email"
            style={styles.myInput}

          />
            {errors.email ? <Animatable.Text animation="fadeIn"  style={styles.errorText}>{errors.email}</Animatable.Text> : null}
          <TextInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            secureTextEntry={true}
            placeholder="password"
            style={styles.myInput}

          />
         {errors.password && <Animatable.Text animation="fadeIn" style={styles.errorText}>{errors.password}</Animatable.Text>}
          <Pressable onPress={handleSubmit} style={styles.press}>
            <Text style={{fontWeight : 'bold'}}>Sin Up</Text>
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
        justifyContent:'flex-start',
        alignItems:'center',
        alignSelf:'center',
        // backgroundColor:'#fff',
        paddingTop : 100
    },
    errorText : {
        fontSize : 12,
        fontWeight : 'bold',
        color : 'red',
        opacity : .8,
    },
    myInput :{
        padding : 10,
        borderWidth : 1,
        borderColor : 'grey',
        marginTop : 10,
        width :'100%',
        borderRadius : 10,
        backgroundColor:'#fff'
    },
    press:{
        padding : 10,
        borderWidth : 1,
        borderColor :'black',
        marginTop : 18,
        borderRadius : 10,
        width : '100%',
        justifyContent:'center',
        alignItems:'center'
    },
 
})

export default Register;

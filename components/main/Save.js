import React , {useState} from 'react';
import {Text , View , StyleSheet , TextInput , Image , ActivityIndicator , TouchableOpacity} from 'react-native';
import firebase from 'firebase';

require("firebase/firestore");
require("firebase/firebase-storage");

export default function Save(props) {
    const image = props.route.params.image;
    const childPath = `posts/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
    const [caption , setCaption] = useState('')
    const [loading , setLoding] = useState(false);
    // console.log(image)

    const uploadImage =async ()=>{
        setLoding(true);
        const response  = await fetch(image);
        const blob = await response.blob();
        const task = firebase.storage()
                     .ref()
                     .child(childPath)
                     .put(blob);
        const taskProgrees = snapShot=>{
            console.log("transferred : " , snapShot.bytesTransferred);
        }
        const taskCompeleted = snapShot=>{
            task.snapshot.ref.getDownloadURL()
            .then((snapShot)=> uploadDataInFirestore(snapShot))
        }
        const taskError = (snapShot)=>{
            console.log(snapShot)
        }
        task.on("state_change" , taskProgrees , taskError , taskCompeleted  )
        console.log(childPath);

    }

    const uploadDataInFirestore =(DownloadURL)=>{
        firebase.firestore().collection("posts")
        .doc(firebase.auth().currentUser.uid)
        .collection("userPosts")
        .add({
            DownloadURL,
            caption ,
            creation : firebase.firestore.FieldValue.serverTimestamp(),
        }).then(function (){
            setLoding(false);
            props.navigation.popToTop();
        })
    }

    return (
        <View style={{flex : 1 , backgroundColor:'#fff'}}>
            {/* {loading && <ActivityIndicator style={{position:'absolute' , zIndex : 10 , top :0 , left : 0 , right : 0 ,bottom : 0}} size={30} color="red"/>} */}
            <Image style={{flex : 1 , margin : 5}} source={{uri : image}}/>
            <View style={{flex : 1}}>
            <TextInput
            placeholder="Caption . . . "
            style={{
                padding : 10,
                borderWidth : 1,
                borderColor : '#e91e63',
                borderRadius : 10,
                height : 50,
                margin : 5
            }}
            onChangeText={(text)=>setCaption(text)}
            value={caption}
            />
            <TouchableOpacity onPress={()=>uploadImage()} style={styles.circle}>
                {loading ? (<ActivityIndicator style={{position:'absolute' , zIndex : 10 , top :0 , left : 0 , right : 0 ,bottom : 0}} size={30} color="red"/>)
                :<Text style={{fontWeight : 'bold'}}>Save</Text>
            }
            </TouchableOpacity>
            </View>
           
        </View>
    )

  
}
const styles = StyleSheet.create({
    circle:{
        padding : 20,
        // backgroundColor : '#e91e63',
        borderWidth : 1,
        borderColor : '#e91e63',
        width : 100,
        height : 100,
        borderRadius : 100,
        alignSelf:'center',
        justifyContent:'center',
        alignItems : 'center',
        marginTop : 30
    }
})

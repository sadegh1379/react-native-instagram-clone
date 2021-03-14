import React ,{useState , useEffect} from 'react';
import { Text , StyleSheet , View ,FlatList , Image } from 'react-native'
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';
import { Avatar, Caption } from 'react-native-paper';
import firebase from 'firebase';
require("firebase/firestore");

const Profile = (props)=>{
    const [myUser , setMyUser]= useState([]);
    const [userPost , setUserPost] = useState([]);
    const user = useSelector(state=>state.user);
    // const newUser = props.route.params.user;

    // console.log(newUser)

    useEffect(()=>{
        const {currentUser , posts} = user;
        if(props.route.params.uid === firebase.auth().currentUser.uid){
            setMyUser(currentUser);
            setUserPost(posts);
        }else{
            firebase.firestore().collection("users")
            .doc(props.route.params.uid)
            .get()
            .then((snap)=>{
                if(snap.exists){
                    setMyUser(snap.data())
                }else{
                    console.log('dos noe exsist');
                }
            })
            firebase.firestore().collection("posts")
            .doc(props.route.params.uid)
            .collection("userPosts")
            .orderBy("creation" , "asc")
            .get()
            .then((snap)=>{
                const posts = snap.docs.map(doc=>{
                    const data = doc.data();
                    const id = doc.id;
                    return{
                        id , 
                        ...data
                    }
                })
                setUserPost(posts);
            })
        }
    },[props.route.params.uid] )
     return(
      <Animatable.View  animation="bounceInUp" style={styles.container}>
            <View style={styles.headContainer}>
                 <Avatar.Image size={100} style={styles.avatar}  />
                 <View style={{justifyContent:'flex-start'}}>
                     <Text style={{fontWeight :'bold'}}>{myUser.name}</Text>
                     <Caption style={{marginTop : 10}}>{myUser.email}</Caption>
                 </View>
            </View>
            <View style={styles.bodyContainer}>
            <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPost}
                    renderItem={({item})=>(
                            <Image style={{width : '33%' , height :100}} source={{uri : item.DownloadURL}}/>

                    )}
                />
            </View>
                
        </Animatable.View>
    )
}

const styles= StyleSheet.create({
    container : {
        flex : 1,
    },
    headContainer:{
        margin : 10,
        padding : 10,
        // backgroundColor:'grey',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth : 2,
        borderBottomColor:'grey'
    },
    bodyContainer:{
        flex : 1,
        margin : 5
    },
    

   
})

export default Profile;
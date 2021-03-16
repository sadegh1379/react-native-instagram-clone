import React ,{useState , useEffect} from 'react';
import { Text , StyleSheet , View ,FlatList , Image, TouchableOpacity, Button } from 'react-native'
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';
import { Avatar, Caption , Title } from 'react-native-paper';
import firebase from 'firebase';
require("firebase/firestore");

const Profile = (props)=>{
    const [myUser , setMyUser]= useState([]);
    const [userPost , setUserPost] = useState([]);
    const [folowing , setFollowing] = useState(false);
    const [numOfFollowing , setNumOfFollowing] = useState(0);
    const user = useSelector(state=>state.user);
    // const newUser = props.route.params.user;

    // console.log(newUser)

    useEffect(()=>{
        const {currentUser , posts , following} = user;
        if(props.route.params.uid === firebase.auth().currentUser.uid){
            setMyUser(currentUser);
            setUserPost(posts);
            setNumOfFollowing(following.length);
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
            firebase.firestore().collection("following")
            .doc(props.route.params.uid)
            .collection("userFollowing")
            .onSnapshot((snap)=>{
                const following = snap.docs.map(doc=>{
                    return doc.id
                })
                setNumOfFollowing(following.length);
            })
            if(user.following.indexOf(props.route.params.uid) > -1){
                setFollowing(true);
            }else{
                setFollowing(false)
            }
        }
    },[props.route.params.uid , user.following] )

    const onFollow = ()=>{
        firebase.firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .set({})

        
    }

    const onunFollow = ()=>{
        firebase.firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .delete()
        
    }
    const sinout = ()=>{
        firebase.auth().signOut();
        alert('sinout')
    }
    if(myUser === null){
        return <View/>
    }
     return(
      <Animatable.View  animation="bounceInUp" style={styles.container}>
            <View style={styles.headContainer}>
                 <Avatar.Text size={100} style={styles.avatar} label="XD"  />
                 <View style={{justifyContent:'flex-start'}}>
                     <Text style={{fontWeight :'bold'}}>{myUser.name}</Text>
                     <Caption style={{marginTop : 10}}>{myUser.email}</Caption>
                 </View>
                
            </View>
            <View style={{flexDirection:'row' , justifyContent :'space-around' , alignItems:'center'}}>
                <View style={styles.box}>
                    <Text>Posts</Text>
                    <Title>{userPost.length}</Title>
                </View>
                <View style={styles.box}>
                     <Text>Followers</Text>
                     <Title>12</Title>
                </View>
                <View style={styles.box}>
                    <Text>Following</Text>
                    <Title>{numOfFollowing}</Title>
                </View>
               
            </View>
            <View style={{borderBottomWidth : 2,borderBottomColor:'grey'}}>
            {props.route.params.uid !== firebase.auth().currentUser.uid ? 
                   (
                       <View>
                           {folowing ? (
                            <TouchableOpacity onPress={()=>onunFollow()} style={[styles.follow , {backgroundColor:'#e91e63'}]}>
                                <Text>
                                  Following
                                </Text>
                            </TouchableOpacity>
                           ) : (
                          <TouchableOpacity onPress={()=>onFollow()}  style={[styles.follow , {backgroundColor:'#fce4ec' }]}>
                                <Text>
                                    Follow
                                </Text>
                            </TouchableOpacity>
                           )}
                       </View>
                   ) : (<Button title="sinOut" onPress={()=>sinout()}/>)
                           }
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
       
    },
    bodyContainer:{
        flex : 1,
        margin : 5
    },
    follow :{
        padding : 10,
        borderRadius : 10,
        justifyContent:'center',
        alignItems:'center',
        margin : 5
        
    },
    box:{
        flexDirection : 'column',
        justifyContent:'center',
        alignItems:'center',
        padding : 5,
        
    }

   
})

export default Profile;
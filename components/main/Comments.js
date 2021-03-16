import React , {useEffect , useState} from 'react';
import { Text , FlatList , View ,ActivityIndicator  , TextInput , Button ,StyleSheet, Pressable, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import firebase from 'firebase';
require("firebase/firestore");
import {useSelector , useDispatch} from 'react-redux';
import {fetchUsers} from '../../redux/actions/index';
import { FontAwesome } from '@expo/vector-icons';





function Comments(props) {
    const {postId , uid} = props.route.params;
    const state = useSelector(state => state.users.users);
    const dispatch = useDispatch();
    const [text , setText] = useState('');
    const [comments , setComments] = useState([]);
    const [postIds , setPostIds] = useState('');
    const [loading , setLoading] = useState(false);

    useEffect(()=>{
        function matchUserToComments(comments){
           
            for(let i = 0 ; i < comments.length ; i++){
                if(comments[i].hasOwnProperty('user')){
                    continue;
                }
                const user = state.find(el => el.uid == comments[i].creator);
                
                if(user == undefined){
                    dispatch(fetchUsers(comments[i].creator  , false))
                }else{
                    comments[i].user = user;
                }
            }
            setComments(comments , state);
        }
        if(postId != postIds){
            firebase.firestore()
            .collection('posts').doc(uid)
            .collection('userPosts').doc(postId)
            .collection('comments')
            .get().then((snapshot)=>{
                let comments = snapshot.docs.map(doc=>{
                    const data = doc.data();
                    const id = doc.id;
                    return{id , ...data}
                })
                matchUserToComments(comments);
                setPostIds(postId)
            })
        }else{
            matchUserToComments(comments);
        }
    } , [postId , state])

    const addComment = ()=>{
       
            setLoading(true)
            firebase.firestore()
            .collection('posts').doc(uid)
            .collection('userPosts').doc(postId)
            .collection('comments')
            .add({
                text : text,
                creator : uid
            })

            setText('');
            setLoading(false);
       
    }
   

    return (
        <Animatable.View style={styles.container}  animation="bounceInUp">
            
            <FlatList
            numColumns={1}
            horizontal={false}
            scrollEnabled={true}
            data={comments}
            renderItem={({item})=>(
                <View style={styles.item}>
                    <View style={{flexDirection:'row'}}>
                        <FontAwesome name="user-circle-o" size={24} color="black" />
                        {item.user != undefined ? (<Text style={{marginLeft : 10 , fontWeight :'bold'}}>{item.user.name}</Text>) : null}
                    </View>
                    <View style={{overflow:'visible'}}>
                     <Text>{item.text}</Text>
                    </View>
                   
                </View>
            )}
            />
                 {
             loading ? (<ActivityIndicator style={{marginBottom : 10}} size={30} color="#e91e63"/>) : null
                 }
            <View style={styles.buttomContainer}>
                <TextInput
                placeholder="type comment ..."
                onChangeText={(text)=>setText(text)}
                style={styles.input}
                />
                <Pressable style={styles.add} onPress={()=>addComment()}>
                    <Text style={{fontSize : 12 , color : '#fff'}}>ADD</Text>
                </Pressable>
            </View>
        
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fff'
    },
    item:{
        flexDirection : 'row',
        justifyContent :'space-between',
        alignItems:'center',
        padding : 8
    },
    input:{
        padding : 10,
        paddingRight : 80,
        borderRadius : 10,
        borderWidth : 1,
        borderColor : '#e91e63',
        margin : 5
    },
    add:{
        backgroundColor:'#e91e63',
        padding : 10,
        width : 60,
        height : 30,
        borderRadius :10,
        position :'absolute',
        right : 10,
        bottom : 10,
        justifyContent:'center',
        alignItems:'center'
    },
   
})

export default Comments

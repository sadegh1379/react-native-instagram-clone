import React , {useEffect , useState} from 'react';
import { Text , FlatList , View  , TextInput , Button } from 'react-native';
import * as Animatable from 'react-native-animatable';
import firebase from 'firebase';
require("firebase/firestore");
import {useSelector , useDispatch} from 'react-redux';
import {fetchUsers} from '../../redux/actions/index';


function Comments(props) {
    const {postId , uid} = props.route.params;
    const state = useSelector(state => state.users.users);
    const dispatch = useDispatch();
    const [text , setText] = useState('');
    const [comments , setComments] = useState([]);
    const [postIds , setPostIds] = useState('');

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
            .collection('commnets')
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
        if(text !== ''){
            firebase.firestore()
            .collection('posts').doc(uid)
            .collection('userPosts').doc(postId)
            .collection('commnets')
            .add({
                text : text,
                creator : uid
            })
        }
    }
   

    return (
        <Animatable.View  animation="bounceInUp">
            <FlatList
            numColumns={1}
            horizontal={false}
            data={comments}
            renderItem={({item})=>(
                <View>
                    {item.user != undefined ? (<Text>{item.user.name}</Text>) : null}
                    <Text>{item.text}</Text>
                </View>
            )}
            />
            <View>
                <TextInput
                placeholder="type ..."
                onChangeText={(text)=>setText(text)}
                />
                <Button title="add" onPress={()=>addComment()}/>
            </View>
        </Animatable.View>
    )
}

export default Comments

import {FETCH_USER_DATA , FETCH_USER_POSTS} from '../types';
import firebase from 'firebase';

export const fetchUser = ()=>{
    return((dispatch)=>{
        firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snap)=>{
            if(snap.exists){
                dispatch({type : FETCH_USER_DATA , payload : snap.data()})
            }else{
                console.log('dos noe exsist');
            }
        })
    })
}
export const fetchUserPosts = ()=>{
    return((dispatch)=>{
        firebase.firestore().collection("posts")
        .doc(firebase.auth().currentUser.uid)
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
            dispatch({type : FETCH_USER_POSTS , payload : posts})
        })
    })
}
import {FETCH_USER_DATA} from '../types';
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
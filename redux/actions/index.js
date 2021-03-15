import {FETCH_USER_DATA , FETCH_USER_POSTS , FETCH_USER_FOLLOWING , FETCH_USERS_DATA , FETCH_USERS_POSTS} from '../types';
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

export const fetchUserFollowing = ()=>{
    return((dispatch)=>{
        firebase.firestore().collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .onSnapshot((snap)=>{
            const following = snap.docs.map(doc=>{
                const id = doc.id;
                return id
            })
            dispatch({type : FETCH_USER_FOLLOWING , payload : following})
            for(let i = 0 ; i < following.length ; i++){
                dispatch(fetchUsers(following[i]));
            }
        })
    })
}

// users actions

export const fetchUsers = (uid)=>{
    return((dispatch  , usersState)=>{
        let found = usersState().users.users.some(el => el.uid === uid)
        if(!found){
            firebase.firestore().collection("users")
            .doc(uid)
            .get()
            .then((snap)=>{
                if(snap.exists){
                    let user = snap.data();
                    user.uid = snap.id;
                    dispatch({type : FETCH_USERS_DATA , payload : user})
                    dispatch(fetchFollowingPosts(snap.id))
                    

                }else{
                    console.log('dos noe exsist');
                }
            })
        }
       
    })
}

export const fetchFollowingPosts = (uid)=>{
    return((dispatch  , usersState)=>{
        firebase.firestore().collection("posts")
        .doc(uid)
        .collection("userPosts")
        .orderBy("creation" , "asc")
        .get()
        .then((snapshot)=>{
            // console.log(snapshot.d_.query.C_.path.segments[1]);
           const uid = snapshot.d_.query.C_.path.segments[1];
        //    console.log({snapshot , uid})
           let user = usersState().users.users.find(el => el.uid === uid);

           const posts = snapshot.docs.map(doc=>{
            const data = doc.data();
            const id = doc.id;
            return{
                id , 
                ...data,
                user
            }
        })
        //    console.log("posts : " , posts);
           dispatch({type : FETCH_USERS_POSTS , payload :{ posts , uid}})
        //    console.log("state : " , usersState())
            })
           
        })
}
import React , {useState} from 'react';
import { Text , View , FlatList , TextInput, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable';
import firebase from 'firebase';
require("firebase/firestore");

const Search = (props)=>{
    const [users , setUsers] = useState([]);

    const SearchUser = (text)=>{
        const user = firebase.firestore()
        .collection('users')
        .where('name' , '>=' , text)
        .get()
        .then((snapShot)=>{
            const users = snapShot.docs.map(doc=>{
                const data = doc.data();
                const id = doc.id;
                return{
                    id , 
                    ...data
                }
            })
            setUsers(users);
            
        })
    }
    return(
        <Animatable.View style={{flex : 1 , padding : 5}} animation="bounceInUp">
            <View>
                <TextInput
                 style={{padding : 10 , margin : 10 , borderWidth : 1 , borderColor:'#e91e63' , borderRadius:10 , fontWeight:'bold'}}
                 placeholderTextColor="#e91e63"
                 placeholder="Search..."
                 onChangeText={(text)=>SearchUser(text)}
                />
            </View>
            <View>
                <FlatList
                 numColumns={1}
                 horizontal={false}
                 data={users}
                 renderItem={({item})=>(
                     <TouchableOpacity onPress={()=>props.navigation.navigate('Profile' , {uid : item.id})} style={{padding : 10 , backgroundColor:'#e91e63',justifyContent:'center' , alignItems:'center' , borderRadius:10 , margin : 5}}>
                         <Text style={{fontSize:12 , fontWeight:'bold'}}>{item.name}</Text>
                     </TouchableOpacity>
                 )}
                />
            </View>
        </Animatable.View>
    )
}

export default Search;
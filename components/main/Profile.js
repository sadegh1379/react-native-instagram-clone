import React from 'react';
import { Text , StyleSheet , View ,FlatList , Image } from 'react-native'
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';
import { Avatar, Caption } from 'react-native-paper';
{/* <Avatar.Image size={24} source={require('../assets/avatar.png')} /> */}

const Profile = (props)=>{
    const user = useSelector(state=>state.user);
    const newUser = props.route.params;

    const {currentUser , posts} = user;
    console.log(newUser)
     return(
      <Animatable.View  animation="bounceInUp" style={styles.container}>
            <View style={styles.headContainer}>
                 <Avatar.Image size={100} style={styles.avatar}  />
                 <View style={{justifyContent:'flex-start'}}>
                     <Text style={{fontWeight :'bold'}}>{currentUser.name}</Text>
                     <Caption style={{marginTop : 10}}>{currentUser.email}</Caption>
                 </View>
            </View>
            <View style={styles.bodyContainer}>
            <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={posts}
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
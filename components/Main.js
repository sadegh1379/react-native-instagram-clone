import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser , fetchUserPosts , fetchUserFollowing } from "../redux/actions";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Profile from './main/Profile';
import Feed from './main/Feed';
import EmptyScreen from './static/Empty';
import Search from "./main/Search";
import firebase from 'firebase'


const Tab = createMaterialBottomTabNavigator();

const Main = (props) => {
  const state = useSelector((state) => state.user);
//   console.log(state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchUserPosts());
    dispatch(fetchUserFollowing());
  }, []);

  return (
      <Tab.Navigator labeled={false}
      activeColor="#000"
      inactiveColor="grey"
      barStyle={{ backgroundColor: '#fff' }}
      >
        <Tab.Screen name="Feed" component={Feed} 
            options={{
                tabBarIcon : ({size , color})=>(<MaterialCommunityIcons name="home" size={24} color={color}/>)
            }}        
        />
         <Tab.Screen name="Search" component={Search} 
            options={{
                tabBarIcon : ({size , color})=>(<MaterialCommunityIcons name="magnify" size={24} color={color}/>)
            }}        
        />
        <Tab.Screen name="AddContainer" component={EmptyScreen}
        listeners={({navigation})=>({
            tabPress:event=>{
                event.preventDefault();
                navigation.navigate('Add');
            }
        })}
        options={{
            tabBarIcon : ({size , color})=>(<MaterialCommunityIcons name="plus-box" size={24} color={color}/>)
        }}     
        />
        <Tab.Screen name="Profile" component={Profile}
         listeners={({navigation})=>({
            tabPress:event=>{
                event.preventDefault();
                navigation.navigate('Profile',{uid : firebase.auth().currentUser.uid});
            }
        })}
        options={{
            tabBarIcon : ({size , color})=>(<MaterialCommunityIcons name="account" size={24} color={color}/>)
        }}     
        />
      </Tab.Navigator>
  );
};

export default Main;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser , fetchUserPosts } from "../redux/actions";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Profile from './main/Profile';
import Feed from './main/Feed';
import EmptyScreen from './static/Empty';


const Tab = createMaterialBottomTabNavigator();

const Main = (props) => {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchUserPosts());
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
        options={{
            tabBarIcon : ({size , color})=>(<MaterialCommunityIcons name="account" size={24} color={color}/>)
        }}     
        />
      </Tab.Navigator>
  );
};

export default Main;

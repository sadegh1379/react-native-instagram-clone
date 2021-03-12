import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loader = ()=> {
    return (
        <ActivityIndicator color="red" style={{alignSelf:'center' , position:'absolute'}}/>
    )
}

export default Loader;

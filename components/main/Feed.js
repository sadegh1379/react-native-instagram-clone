import React from 'react';
import { Text , View } from 'react-native'
import * as Animatable from 'react-native-animatable';

const Feed = (props)=>{
    return(
        <Animatable.View animation="bounceInUp">
            <Text>Add feed</Text>
        </Animatable.View>
    )
}

export default Feed;
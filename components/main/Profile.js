import React from 'react';
import { Text , View } from 'react-native'
import * as Animatable from 'react-native-animatable';

const Profile = (props)=>{
    return(
      <Animatable.View animation="bounceInUp">
            <Text>profile Screen</Text>
        </Animatable.View>
    )
}

export default Profile;
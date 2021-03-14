import {FETCH_USER_DATA , FETCH_USER_POSTS} from '../types';

const initState = {
    currentUser : null,
    posts : []
}

export const userReducer = (state =  initState , action)=>{
    switch(action.type){
        case FETCH_USER_DATA : 
        
            return{
                ...state ,
                currentUser : action.payload
            }
        case FETCH_USER_POSTS :
           
            return{
                ...state,
                posts : action.payload
            }

        default:
            return state;
    }
    
}

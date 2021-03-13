import {FETCH_USER_DATA} from '../types';

const initState = {
    currentUser : null
}

export const userReducer = (state =  initState , action)=>{
    return{
        ...state ,
        currentUser : action.payload
    }
}

import {combineReducers} from 'redux';
import {userReducer } from './userReducer';
import {usersReducer} from './usersReducer'

export const rootReducer = combineReducers({
    user : userReducer,
    users : usersReducer
})
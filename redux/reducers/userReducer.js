import { FETCH_USER_DATA, FETCH_USER_FOLLOWING, FETCH_USER_POSTS , CLEAR_DATA } from "../types";

const initState = {
  currentUser: null,
  posts: [],
  following: [],
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {
        ...state,
        currentUser: action.payload,
      };
    case FETCH_USER_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case FETCH_USER_FOLLOWING:
      return {
        ...state,
        following: action.payload,
      };
    case CLEAR_DATA : 
     return{
         currentUser: null,
         posts: [],
        following: [],
     }

    default:
      return state;
  }
};

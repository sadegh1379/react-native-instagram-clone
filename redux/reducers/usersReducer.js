import { FETCH_USERS_DATA , FETCH_USERS_POSTS } from "../types";

const initState = {
  users: [],
  usersLoaded: 0,
};

export const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_USERS_DATA:
      return {
        ...state,
        users: [...state.users , action.payload]
      };
    case FETCH_USERS_POSTS:
      return {
        ...state,
        usersLoaded: state.usersLoaded + 1,
        users : state.users.map((user)=> user.uid === action.payload.uid ? {...state.users , posts:action.payload.posts}
         : user)
      };
    default:
      return state;
  }
};

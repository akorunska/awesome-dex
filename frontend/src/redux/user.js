import { users } from "../api/constants";

const initialState = users.alice;

const SET_USER = "SET_USER";

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export const setUser = user => {
  return { type: SET_USER, payload: user };
};

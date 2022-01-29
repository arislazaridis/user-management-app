import { setSignUpData } from "./actions";
import { setSignInData } from "./actions";
import { setUsersData } from "./actions";

const initialState = {
  signUpData: { username: "", password: "", confirmPassword: "" },
  signInData: { username: "", password: "" },
  usersData: {
    id: "",
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    age: 0,
    isAdmin: false,
  },
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case setSignUpData.type:
      return {
        ...state,
        signUpData: {
          ...state.signUpData,
          [action.payload.key]: action.payload.value,
        },
      };
    case setSignInData.type:
      return {
        ...state,
        signInData: {
          ...state.signInData,
          [action.payload.key]: action.payload.value,
        },
      };

    case setUsersData.type:
      return {
        ...state,
        usersData: {
          ...state.usersData,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

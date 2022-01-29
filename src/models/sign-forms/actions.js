const SET_SIGNUP_DATA = "SIGN_UP//SET_SIGNUP_DATA";
const SET_SIGNIN_DATA = "SIGN_IN//SET_SIGNIN_DATA";
const SET_USERS_DATA = "USERS_DATA//SET_USERS_DATA";

export const setSignUpData = (payload) => {
  return {
    type: SET_SIGNUP_DATA,
    payload,
  };
};

setSignUpData.type = SET_SIGNUP_DATA;

export const setSignInData = (payload) => {
  return {
    type: SET_SIGNIN_DATA,
    payload,
  };
};

setSignInData.type = SET_SIGNIN_DATA;

export const setUsersData = (payload) => {
  return {
    type: SET_USERS_DATA,
    payload,
  };
};

setUsersData.type = SET_USERS_DATA;

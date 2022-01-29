import { PAGES } from "../../config/config";
import { goToPage } from "./actions";

const initialState = {
  page: PAGES.LogInSignUpPage,
};

export const routingReducer = (state = initialState, action) => {
  switch (action.type) {
    case goToPage.type:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

import { combineReducers } from "redux";
import { routingReducer } from "./routing/reducer";
import { formReducer } from "./sign-forms/reducer";

export const RootReducer = combineReducers({
  router: routingReducer,
  signForms: formReducer,
});

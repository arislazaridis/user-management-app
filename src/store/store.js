import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { RootReducer } from "../models/";

export const store = createStore(RootReducer, composeWithDevTools());

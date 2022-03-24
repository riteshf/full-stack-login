import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authenticateReducer from "../features/authenticate/authenticate.slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authenticate: authenticateReducer,
  },
});

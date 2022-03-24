import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "../features/authenticate/authenticate.slice";

export const store = configureStore({
  reducer: {
    authenticate: authenticateReducer,
  },
});

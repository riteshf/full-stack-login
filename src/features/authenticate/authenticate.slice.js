import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, loginCheck, logout } from "./authenticate.api";

const initialState = {
  loggedInUser: {},
  accessToken: localStorage.getItem("accessToken") || "",
};

export const loginAsync = createAsyncThunk(
  "authenticate/login",
  async (params) => {
    const response = await login(params);
    return response.data;
  }
);
export const loginCheckAsync = createAsyncThunk(
  "authenticate/check",
  async (params) => {
    const response = await loginCheck(params);
    return response.data;
  }
);
export const logoutAsync = createAsyncThunk(
  "authenticate/logout",
  async (params) => {
    const response = await logout(params);
    return response.data;
  }
);

export const authenticateReducer = createSlice({
  name: "authenticate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.accessToken = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginCheckAsync.fulfilled, (state, action) => {
        state.accessToken = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.accessToken = "";
        state.user = {};
      });
  },
});

export const {} = authenticateReducer.actions;

export const selectAccessToken = (state) => state.authenticate.accessToken;

export default authenticateReducer.reducer;

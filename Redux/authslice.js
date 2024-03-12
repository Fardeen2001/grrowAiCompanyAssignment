"use client";
import { createSlice } from "@reduxjs/toolkit";
const intialAuthState = {
  token: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: intialAuthState,
  reducers: {
    isUserLoggedIn: (state, action) => {
      state.token = action.payload;
    },
    login: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.token = true;
    },
    logout: (state) => {
      state.token = false;
      localStorage.removeItem("token");
    },
  },
});
export const { isUserLoggedIn, login, logout } = authSlice.actions;
export default authSlice.reducer;

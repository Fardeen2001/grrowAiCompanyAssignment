"use client";
import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";
import messageSlice from "./messageSlice";

const store = configureStore({
  reducer: {
    auth: authslice,
    responses: messageSlice,
  },
});
export default store;

import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "responses",
  initialState: {
    messages: [],
  },
  reducers: {
    addResponses: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});
export const { addResponses } = messageSlice.actions;
export default messageSlice.reducer;

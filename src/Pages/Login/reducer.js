import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",

  initialState: {
    userName: null,
    token: null,
  },

  reducers: {
    setName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setName } = loginSlice.actions;
export default loginSlice.reducer;

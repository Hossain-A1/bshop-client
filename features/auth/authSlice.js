import { createSlice } from "@reduxjs/toolkit";
const user = localStorage.getItem("token") ? localStorage.getItem("token") : "";
const initialState = {
  token: user,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem("authToken") || null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      // Save to localStorage
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      // Clear localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
    checkAuthStart: (state) => {
      state.loading = true;
    },
    checkAuthSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    checkAuthFailure: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      // Clear localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logoutSuccess, checkAuthStart, checkAuthSuccess, checkAuthFailure } =
  authSlice.actions;

export default authSlice.reducer;

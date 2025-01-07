import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginSuccess,
  logoutSuccess,
  checkAuthStart,
  checkAuthSuccess,
  checkAuthFailure,
} from "./authSlice";

// Check auth status
export const checkAuth = () => async (dispatch) => {
  dispatch(checkAuthStart());
  try {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      // Here you would typically validate the token with your backend
      dispatch(checkAuthSuccess({ user, token }));
    } else {
      dispatch(checkAuthFailure());
    }
  } catch (error) {
    dispatch(checkAuthFailure());
  }
};

// Login action
export const login = (credentials) => async (dispatch) => {
  try {
    // This is where you'd make your API call to login
    // For demo purposes, we'll simulate a successful login
    const response = {
      user: {
        id: 1,
        name: "Admin User",
        email: credentials.email,
      },
      token: "demo-token-123",
    };

    dispatch(loginSuccess(response));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Logout action
export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutSuccess());
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

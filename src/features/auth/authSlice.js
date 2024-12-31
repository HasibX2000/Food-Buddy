import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../services/supabase";

const initialState = {
  user: null,
  session: null,
  status: "idle", // 'idle' | 'loading' | 'authenticated' | 'unauthenticated'
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, session } = action.payload;
      state.user = user;
      state.session = session;
      state.status = "authenticated";
      state.error = null;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.session = null;
      state.status = "unauthenticated";
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = "unauthenticated";
    },
  },
});

// Action creators
export const { setCredentials, clearCredentials, setError } = authSlice.actions;

// Thunks
export const initializeAuth = () => async (dispatch) => {
  try {
    // Get initial session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      dispatch(
        setCredentials({
          user: session.user,
          session,
        })
      );
    } else {
      dispatch(clearCredentials());
    }

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        dispatch(
          setCredentials({
            user: session.user,
            session,
          })
        );
      } else {
        dispatch(clearCredentials());
      }
    });

    // Return cleanup function
    return () => {
      subscription?.unsubscribe();
    };
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export const signIn =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      dispatch(setCredentials(data));
      return data;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    }
  };

export const signOut = () => async (dispatch) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    dispatch(clearCredentials());
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentSession = (state) => state.auth.session;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthStatus = (state) => state.auth.status;

export default authSlice.reducer;

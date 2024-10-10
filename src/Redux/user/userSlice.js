// UserSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  signupUser,
  loginUser,
  updateUser,
} from "./userActions";

const initialState = {
  User: null,
  loading: false,
  isLogin: false,
  isSignup: false,
  error: null,
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.User = action.payload;
      state.isLogin = true;
    },
    clearUserInfo: (state) => {
      state.User = null;
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isSignup = true; 
        state.error = null; 
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.isSignup = false;
        state.error = action.payload; 
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        
        state.User = action.payload; 
        state.error = null; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isLogin = false;
        state.error = action.payload; 
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.User = action.payload; 
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.isLogin = false;
        state.error = action.payload; 
      });
  },
});

export const { setUserInfo, clearUserInfo } = UserSlice.actions;
export default UserSlice.reducer;

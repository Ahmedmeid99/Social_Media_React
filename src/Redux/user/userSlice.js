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
        state.isSignup = true; // from response
        state.error = null; // Reset the error state
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.isSignup = false;
        state.error = action.payload; // from thunkAPI.rejectWithValue(error.response.data);
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.User = action.payload; // from response
        state.error = null; // Reset the error state
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isLogin = false;
        state.error = action.payload; // from thunkAPI.rejectWithValue(error.response.data);
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.User = action.payload; // from response
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.isLogin = false;
        state.error = action.payload; // from thunkAPI.rejectWithValue(error.response.data);
      });
  },
});

export const { setUserInfo, clearUserInfo } = UserSlice.actions;
export default UserSlice.reducer;

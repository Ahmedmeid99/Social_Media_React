import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  SignUpUser,
  LoginUser,
  UpdateUserInfo,
} from "../../API/User";

export const signupUser = createAsyncThunk(
  "User/signup",
  async (UserData, thunkAPI) => {
    try {
      //
      await SignUpUser(UserData);
      return data; // Return the data directly if successful
    } catch (error) {
      console.error('loginUser Error:', error);
      if (!error.response) {
        // Network error or no response from server
        return thunkAPI.rejectWithValue({ message: 'Network error. Please try again.' });
      }
      switch (error.response.status) {
        case 400:
          return thunkAPI.rejectWithValue({ message: 'Bad Request. Check your input.' });
        case 401:
          return thunkAPI.rejectWithValue({ message: 'Unauthorized. Invalid credentials.' });
        case 403:
          return thunkAPI.rejectWithValue({ message: 'Forbidden. You don’t have permission.' });
        case 404:
          return thunkAPI.rejectWithValue({ message: 'Not Found. The endpoint does not exist.' });
        default:
          return thunkAPI.rejectWithValue({ message: 'Unexpected error occurred.' });
      }
    }
  }
);


export const loginUser = createAsyncThunk(
  "User/login",
  async (credentials, thunkAPI) => {
    try {
      const data = await LoginUser(credentials);
      return data; // Return the data directly if successful
    } catch (error) {
      console.error('loginUser Error:', error);
      if (!error.response) {
        // Network error or no response from server
        return thunkAPI.rejectWithValue({ message: 'Network error. Please try again.' });
      }
      switch (error.response.status) {
        case 400:
          return thunkAPI.rejectWithValue({ message: 'Bad Request. Check your input.' });
        case 401:
          return thunkAPI.rejectWithValue({ message: 'Unauthorized. Invalid credentials.' });
        case 403:
          return thunkAPI.rejectWithValue({ message: 'Forbidden. You don’t have permission.' });
        case 404:
          return thunkAPI.rejectWithValue({ message: 'Not Found. The endpoint does not exist.' });
        default:
          return thunkAPI.rejectWithValue({ message: 'Unexpected error occurred.' });
      }
    }
  }
);


export const updateUser = createAsyncThunk(
  "User/update",
  async (credentials, thunkAPI) => {
    try {
       await UpdateUserInfo(credentials);
      return data; // Return the data directly if successful
    } catch (error) {
      console.error('loginUser Error:', error);
      if (!error.response) {
        // Network error or no response from server
        return thunkAPI.rejectWithValue({ message: 'Network error. Please try again.' });
      }
      switch (error.response.status) {
        case 400:
          return thunkAPI.rejectWithValue({ message: 'Bad Request. Check your input.' });
        case 401:
          return thunkAPI.rejectWithValue({ message: 'Unauthorized. Invalid credentials.' });
        case 403:
          return thunkAPI.rejectWithValue({ message: 'Forbidden. You don’t have permission.' });
        case 404:
          return thunkAPI.rejectWithValue({ message: 'Not Found. The endpoint does not exist.' });
        default:
          return thunkAPI.rejectWithValue({ message: 'Unexpected error occurred.' });
      }
    }
  }
);

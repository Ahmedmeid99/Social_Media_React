import { URL } from "../API/APIVariables";
import axios from "axios";

const api = axios.create({
  baseURL: URL,
});

export const SignUpUser = async (data) => {
  try {
    const response = await api.post(`/Api/User/signup`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const LoginUser = async (data) => {
  try {
    const response = await api.post(`/Api/user/login`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateUserInfo = async (id, data) => {
  try {
    const response = await api.post(`/Api/user/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/*
{
  "userName": "string",
  "password": "string",
  "gendor": "string",
  "dateOfBirth": "2024-06-15T00:31:04.724Z",
  "phone": "string",
  "email": "string",
  "address": "string",
  "countryID": 0
}
*/

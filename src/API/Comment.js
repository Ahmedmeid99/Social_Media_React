import { URL } from "../API/APIVariables";
import axios from "axios";

export const GetComments = async (postId) => {
  try {
    const response = await axios.get(`${URL}/Api/Comment/post/${postId}`);
    return response.data;
  } catch (error) {
    //throw error;
  }
};

export const PostComment = async (data) => {
  try {
    const response = await axios.post(`${URL}/api/Comment`, data);
    return response.data;
  } catch (error) {
    //throw error;
  }
};
export const DeleteComment = async (CommentId) => {
  try {
    const response = await axios.delete(`${URL}/api/Comment/${CommentId}`);
    return response.data;
  } catch (error) {
    //throw error;
  }
};

export const UpdateComment = async (CommentId, CommentData) => {
  try {
    const response = await axios.put(
      `${URL}/api/Comment/${CommentId}`,
      CommentData
    );
    return response.data;
  } catch (error) {
    //throw error;
  }
};

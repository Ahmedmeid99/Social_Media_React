import { URL } from "../API/APIVariables";
import axios from "axios";

const api = axios.create({
  baseURL: URL,
});

export const GetUserBackgroundPicture = async (userId) => {
  try {
    const response = await api.get(`/Api/UserBackgroundPicture/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetMediaDataByPostId = async (postId) => {
  try {
    const response = await api.get(`/Api/Post/Post/${postId}/mediaData`);
    return response.data;
  } catch (e) {
    throw error;
  }
};

export const AddnewPost = async (userId, postContent, selectedFiles) => {
  try {
    const formData = new FormData();

    formData.append("Content", postContent);

    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0]; 
      formData.append("FormFile", file); 

    } else {
      formData.append("MediaType", "None"); 
    }
    

    formData.append("UserId", userId);

    const response = await api.post(`/Api/Post`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",  
      },
    });

    console.log("Post added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding post:", error);
    throw error; 
  }
};
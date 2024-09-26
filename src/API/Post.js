import { URL } from "../API/APIVariables";
import axios from "axios";

const api = axios.create({
  baseURL: URL,
});

export const GetPosts = async () => {
  try {
    const response = await api.get(`/Api/Post`);
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


export const UpdatePost = async (postId,postContent, selectedFiles) => {
  try {
    const formData = new FormData();

    formData.append("Content", postContent);

    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0]; 
      formData.append("FormFile", file); 

    } else {
      formData.append("MediaType", "None"); 
    }
    

    formData.append("PostId", postId);

    const response = await api.put(`/Api/Post/${postId}`, formData, {
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

export const DeletePost = async (postId) => {
  try {
    const response = await api.delete(`/Api/Post/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

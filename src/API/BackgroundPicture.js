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
    //throw error;
  }
};


export const AddnewBackgroundPicture = async (userId, selectedFiles) => {
  try {
    const formData = new FormData();

    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0]; 
      formData.append("ImageFile", file); 

    } else {
      formData.append("MediaType", "None"); 
    }
    

    formData.append("UserId", userId);

    const response = await api.post(`/Api/UserBackgroundPicture`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",  
      },
    });

    console.log("Post added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding post:", error);
    //throw error; 
  }
};

export const UpdatenewBackgroundPicture = async (BackgroundPictureId ,selectedFiles) => {
  try {
    const formData = new FormData();

    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0]; 
      formData.append("ImageFile", file); 

    } else {
      formData.append("MediaType", "None"); 
    }
    

    const response = await api.put(`/Api/UserBackgroundPicture/${BackgroundPictureId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",  
      },
    });

    console.log("Post added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding post:", error);
    //throw error; 
  }
};

import { URL } from "../API/APIVariables";
import axios from "axios";

const api = axios.create({
  baseURL: URL,
});

export const AddUserReaction = async (userReactionData) => {
  try {
    const response = await api.post(`/Api/UserReaction`, userReactionData);
    return response.data;
  } catch (error) {
    //throw error;
  }
};

export const DeleteUserReaction = async (PostId, UserId) => {
  try {
    const response = await api.delete(
      `/Api/UserReaction/user/${UserId}/post/${PostId}`
    );
    return response.data;
  } catch (error) {
    //throw error;
  }
};

// must not be used
export const UpdateUserReaction = async (
  PostId,
  UserId,
  newUserReactionData
) => {
  try {
    const response = await api.put(
      `/Api/UserReaction/user/${UserId}/post/${PostId}`,
      newUserReactionData
    );
    return response.data;
  } catch (error) {
    //throw error;
  }
};

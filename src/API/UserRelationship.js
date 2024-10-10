import { URL } from "./APIVariables";
import axios from "axios";

const api = axios.create({
  baseURL: URL,
});

export const GetUserRelationship = async (userId1,userId2) => {
  try {
    const response = await api.get(`/Api/UserRelationship/user1/${userId1}/user2/${userId2}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddUserRelationship = async ({UserId1,UserId2,RelationshipTypeId}) => {
    try {
      const response = await api.post(`/Api/UserRelationship`,{UserId1,UserId2,RelationshipTypeId});
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const UpdateUserRelationship = async (userId1,userId2,{RelationshipTypeId}) => {
    try {
      const response = await api.put(`/Api/UserRelationship/user1/${userId1}/user2/${userId2}`,{RelationshipTypeId});
      return response.data;
    } catch (error) {
      throw error;
    }
};

  export const DeleteUserRelationship = async (id) => {
    try {
      const response = await api.delete(`/Api/UserRelationship/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
// UserId1
// UserId2
// RelationshipTypeId

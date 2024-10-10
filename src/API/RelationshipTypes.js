import { URL } from "./APIVariables";
import axios from "axios";

const api = axios.create({
  baseURL: URL,
});

export const GetRelationshipTypes = async () => {
  try {
    const response = await api.get(`/Api/RelationshipTypes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
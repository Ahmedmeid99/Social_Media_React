import { URL } from "../API/APIVariables" ;
import axios from "axios"


export const GetCountries = async () => {
    try {
        const response = await axios.get(`${URL}/Api/country`);
        return response.data;
    } catch (error) {
         
        //throw error;
    }
}
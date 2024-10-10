import {LOCALSTORAGE_APP_Name} from "./Variables"


export  const getUserInfo = () => {
    const storedUserInfo = localStorage.getItem(LOCALSTORAGE_APP_Name);

    // Check if user info exists in localStorage
    if (storedUserInfo) {
      return JSON.parse(storedUserInfo); 
    }
    return null; 
  };

  export const StoreLogin = (userData) => {
    // Overwrite any existing user data
    localStorage.setItem(LOCALSTORAGE_APP_Name, JSON.stringify(userData));
  };
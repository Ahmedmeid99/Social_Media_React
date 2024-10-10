import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserInfo } from "../../Global/Methods";

const PrivateRouters = () => {

  const [isLogedin, setIsLogedin] = useState(Usertoken.get);
  

  return isLogedin ? <Outlet /> : <Navigate to="/login" />;
};
export const Usertoken = {
  get: getUserInfo(),
};

export default PrivateRouters;

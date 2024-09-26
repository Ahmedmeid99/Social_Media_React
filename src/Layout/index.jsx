import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { loginUser } from "../Redux/user/userActions";
import {getUserInfo} from "../Global/Methods"

import Header from "./Header";
import { setUserInfo } from "../Redux/user/userSlice";

function Layout(props) {
  // const UserDispatch = useDispatch();

  // const { User, isLogin, loading, error } = useSelector((state) => state.User);
  // const navigate = useNavigate(); //

  // useEffect(() => {
  //   const userInfo = getUserInfo();
  //   if (userInfo) {
  //     UserDispatch(setUserInfo(userInfo));
  //   }
  // }, [UserDispatch]);

 
  
  

  return (
    <div className=" bg-gray-50 dark:bg-darkColor-800">
      <Header />
      {props.children}
      {/* <Footer/> */}
    </div>
  );
}

export default Layout;

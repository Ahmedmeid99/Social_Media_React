import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isLogin = useSelector((state) => state.User.isLogin);
 const [isLogedin, setIsLogedin] = useState(isLogin)
  // useEffect(() => {
  //   setTimeout(() => {
      
  //   }, 300);
  
  //   return () => {
  //     second
  //   }
  // }, [third])
  
  return isLogedin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

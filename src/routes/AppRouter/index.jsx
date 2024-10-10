
import React, { Suspense } from "react";
import {
  Route, 
  Routes, 
} from "react-router-dom";
import Loading from "../../Components/Loading";
import PrivateRouters from "../PrivateRouters"


const Home = React.lazy(() => import("../../Pages/Home"));
const Signup = React.lazy(() => import("../../Pages/Signup"));
const Login = React.lazy(() => import("../../Pages/Login"));
const Profile = React.lazy(() => import("../../Pages/Profile"));
const NotFound = React.lazy(() => import("../../Pages/NotFound"));
function AppRouter() {

  return (
    <>
    
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<PrivateRouters />}>
            <Route path="/Profile/:userId" element={<Profile />} />
            <Route path="/Home" element={<Home />} />
            
            <Route path="*" element={<Home />} />
          </Route>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRouter;

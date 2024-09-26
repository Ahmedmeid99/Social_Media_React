
import React, { useState, useEffect, Suspense } from "react";
import {
  Route, //select the path and eny component will render
  Routes, // never render two component in the same time onley the first path
} from "react-router-dom";
import Loading from "../../UI/Loading";
import ProtectedRoute from "../../routes/ProductRouter"
// const About = React.lazy(() => import("./Pages/About/About"));
// const CustomerInfo = React.lazy(() => import("./Pages/CustomerInfo/CustomerInfo"));

// CustomerInfo
// const Products = React.lazy(() => import("./Pages/Products/Products"));
// const ProductDetails = React.lazy(
//   () => import("./Pages/ProductDetails/ProductDetails")
// );

const Home = React.lazy(() => import("../../Pages/Home"));
const Signup = React.lazy(() => import("../../Pages/Signup"));
const Login = React.lazy(() => import("../../Pages/Login"));
const Profile = React.lazy(() => import("../../Pages/Profile"));

// import Galary from "./Components/Galary";
// import Post from "./Components/Post";
// import List from "./Components/List";
// import Badge from "./Components/Badge";
// import Header from "./Components/Header";
// import Signup from "./Components/Signup";
// import UserInformtion from "./Components/UserInformtion";
// import ModalDialog from "./Components/ModalDialog";
// import SelectMenus from "./Components/SelectMenus";
// import FlayounMenu from "./Components/FlayounMenu";

function AppRouter() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <>
    
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
            
          <Route path="*" element={<Home />} />
          </Route>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Suspense>
    

      {/* <div className=" dark:bg-neutral-900">
    <Header/>
      <div className="container m-auto p-5 bg-white dark:bg-neutral-900 text-black dark:text-white">
      <div className=" dark:bg-neutral-900 bg-sky-50 py-4">
        <Post/>
        </div>
        <Galary/>
        <Badge/>
        <Signup/>
        <div className="w-fit m-auto p-4"><SelectMenus/></div>
        <div className="w-fit m-auto p-4"><FlayounMenu/></div>
        <List/>
        <UserInformtion/>
        <ModalDialog opened={isOpenDialog} setOpened={setIsOpenDialog}/>
        <button className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-full" onClick={()=>setIsOpenDialog(!isOpenDialog)}>open dialog</button>
      </div>
    </div> */}
    </>
  );
}

export default AppRouter;

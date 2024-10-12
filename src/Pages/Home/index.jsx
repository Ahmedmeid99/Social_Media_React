import React from "react";
import Layout from "../../Layout";
import Posts from "../../Components/Post";
import background from "../../assets/images/background/background5.jpg";
import ProfileBox from "../../Components/ProfileBox";
import UsersList from "../../Components/UserList";
import { getUserInfo } from "../../Global/Methods";

function Home() {
  const User = getUserInfo();
 
  return (
    <Layout>
      <div className="h-52 rounded-s-md">
        <img
          className="w-full h-full rounded-ee-md rounded-es-md"
          src={background}
          alt="background !"
        />
      </div>
      <div className="flex justify-center md:justify-between gap-3 px-3 py-3 w-full dark:bg-darkColor-800 bg-gray-50 min-h-14">
        {/* Left Sidebar */}
        <ProfileBox userId={User?.UserId} userName={User?.UserName} email={User?.Email}/>

        {/* Middle Section (Posts) */}
        <div className="m-auto w-11/12  md:w-8/12 lg:w-4/12 xl:w-6/12 ">
          <Posts />
        </div>

        {/* Right Sidebar (Users List) */}
        <div className="hidden lg:block lg:w-4/12 xl:w-3/12">
          <UsersList/>
        </div>
      </div>
    </Layout>
  );
}



export default Home;

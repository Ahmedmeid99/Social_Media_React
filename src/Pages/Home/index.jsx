import React, { useState, useEffect } from "react";

import Layout from "../../Layout";
import Posts from "../../Components/Post";
import Card from "../../UI/Card";
import background from "../../assets/images/background/background5.jpg";
import ProfileBox from "../../Components/ProfileBox";
import { useSelector } from "react-redux";

function Home() {
  const { User } = useSelector((state) => state.User);

  return (
    <Layout>
      <div className="h-52 rounded-s-md">
        <img
          className="w-full h-full rounded-ee-md rounded-es-md"
          src={background}
          alt="background !"
        />
      </div>
      <div className="flex justify-center md:justify-between gap-3 px-3 py-3 w-full dark:bg-darkColor-800 bg-gray-50">
        {/* Left Sidebar */}
        <ProfileBox userId={User?.UserId} userName={User?.UserName} email={User?.Email}/>

        {/* Middle Section (Posts) */}
        <div className="m-auto w-11/12  md:w-8/12 lg:w-4/12 xl:w-6/12">
          <Posts />
        </div>

        {/* Right Sidebar (Users List) */}
        <div className="hidden lg:block lg:w-4/12 xl:w-3/12">
          <Card>Users List</Card>
        </div>
      </div>
    </Layout>
  );
}



export default Home;

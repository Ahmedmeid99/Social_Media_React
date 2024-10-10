import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { useSelector } from "react-redux";
import BackgroundPicture from "./Components/BackgroundPicture";
import ProfilePicture from "./Components/ProfilePicture";
import { ProfileContent } from "./Components/ProfileContent";
import { GetUser } from "../../API/User";
import { useParams } from "react-router-dom";
import UserActions from "./Components/UserActions";

function Profile() {
  const params=useParams();

  const [user, setUser] = useState({})

  const { User} = useSelector((state) => state.User);
  const [userProfileId, setUserProfileId] = useState(params.userId);

  useEffect(() => {
    setUserProfileId(params.userId)
  
    return () => {
    }
  }, [location.pathname,params.userId]);


  const fetchUser = async(userId)=>{
    const response = await GetUser(userId);
    setUser(response);
  }

  useEffect(() => {
    fetchUser(userProfileId);
    console.log(User)
    return () => {
      
    }
  }, [location.pathname,params.userId])
  

  return (
    <Layout>
      <div>
        <BackgroundPicture userID={params.userId}/>
      </div>
      <div className=" -translate-y-16 ">
        <ProfilePicture userID={params.userId}/>
        <div className="min-w-0 flex-auto  *:text-center">
          <p className=" text-xl font-semibold mb-1 text-gray-900  dark:text-slate-50">
            {user?.UserName}
          </p>
          <p className="mt-0 truncate text-base text-neutral-400 ">
            {user?.Email}
          </p>
        </div>
        {User.UserId != params.userId && <UserActions userID={params.userId}/>}
      </div>
      <ProfileContent userID={params.userId}/>

    </Layout>
  );
}

export default Profile;

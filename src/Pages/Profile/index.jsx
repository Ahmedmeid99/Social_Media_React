import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { useSelector } from "react-redux";
import { GetUserProfilePicture } from "../../API/ProfilePicture";
import { GetUserBackgroundPicture } from "../../API/BackgroundPicture";
import background from "../../assets/images/background/background2.jpg";
function Profile() {
  const { User } = useSelector((state) => state.User);
  const [profilePicture, setProfilePicture] = useState(null);
  const [backgroundPicture, setBackgroundPicture] = useState(null);

  const fetchUserProfilePicture = async (userId) => {
    const response = await GetUserProfilePicture(userId);
    setProfilePicture(response);

    return response;
  };

  const fetchUserBackgroundPicture = async (userId) => {
    const response = await GetUserBackgroundPicture(userId);
    setBackgroundPicture(response);

    return response;
  };
  useEffect(() => {
    fetchUserProfilePicture(User.UserId);
    fetchUserBackgroundPicture(User.UserId);
    console.log(User);

    return () => {};
  }, []);

  return (
    <Layout>
      <div className="h-72 rounded-s-md">
        {backgroundPicture?.MediaType.startsWith("image") && (
          <img
            className="w-full h-full rounded-ee-md rounded-es-md"
            src={`data:${backgroundPicture?.MediaType};base64,${backgroundPicture?.PictureData}`}
            alt="background !"
          />
        )}
        {!backgroundPicture?.MediaType.startsWith("image") && (
          <img
            className="w-full h-full rounded-ee-md rounded-es-md"
            src={background}
            alt="default background !"
          />
        )}
      </div>
      <div className=" -translate-y-16 ">
        {profilePicture?.MediaType.startsWith("image") && (
          <img
            className="w-40 h-40 block rounded-full m-auto mb-3 p-1  dark:bg-darkColor-800 bg-gray-50"
            src={`data:${profilePicture?.MediaType};base64,${profilePicture?.PictureData}`}
            alt="Medium avatar"
          />
        )}
        {!profilePicture?.MediaType.startsWith("image") && (
          <div class="relative w-32 h-32 m-auto mb-3 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-36 h-36  text-gray-400 -left-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        )}
        <div className="min-w-0 flex-auto  *:text-center">
          <p className=" text-xl font-semibold leading-4 mb-2 text-gray-900  dark:text-slate-50">
            {User?.UserName}
          </p>
          <p className="mt-0 truncate text-base leading-4 text-neutral-400 ">
            {User?.Email}
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;

import React, { useEffect, useState } from "react";
import Card from "../../UI/Card";
import { GetUserProfilePicture } from "../../API/ProfilePicture";
import { Link } from "react-router-dom";

export default function ProfileBox({ userId, userName, email }) {
  const [profilePicture, setProfilePicture] = useState(null);

  const fetchUserProfilePicture = async (userId) => {
    const response = await GetUserProfilePicture(userId);
    setProfilePicture(response);

    return response;
  };
  useEffect(() => {
    fetchUserProfilePicture(userId);
    return () => {};
  }, []);

  return (
    <div className="hidden lg:block lg:w-4/12 xl:w-3/12">
      <Card>
      {profilePicture?.MediaType.startsWith("image") &&(
          <img
            className="w-20 h-20 rounded-full m-auto mb-3"
            src={`data:${profilePicture?.MediaType};base64,${profilePicture?.PictureData}`}
            alt="Medium avatar"
          />
        )}
        
        {!profilePicture?.MediaType.startsWith("image") &&(
          <div className="relative w-20 h-20 m-auto mb-3 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-24 h-24 text-gray-400 -left-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        )}
        <div className="min-w-0 flex-auto  *:text-center">
          <p className=" text-lg font-semibold leading-4 mb-1 text-gray-900  dark:text-slate-50">
            {userName}
          </p>
          <p className="mt-0 truncate text-sm leading-4 text-neutral-400 ">
            {email}
          </p>
        </div>
        <div className="w-10/12 mx-auto mb-2 flex justify-center items-center gap-3">
          <ProfileInfo count={"500+"} title={"Connections"} />
          <ProfileInfo count={"88.7 k"} title={"Followe"} />
          <ProfileInfo count={"1,334"} title={"Followings"} />
        </div>
        <Link to={`/Profile/${userId}`} className="text-inherit">
        <button
          type="button"
          className="text-white mx-auto block bg-sky-600 hover:bg-sky-700  dark:bg-darkColor-700 border dark:hover:bg-darkColor-800 dark:hover:border focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-12 py-2.5 text-center mb-2  dark:focus:ring-blue-800"
        >
            Open
        </button>
          </Link>
      </Card>
    </div>
  );
}

export function ProfileInfo({ count, title }) {
  return (
    <div className="*:text-center py-5">
      <h4 className="text-neutral-900  dark:text-darkColor-900 font-bold text-xl">
        {count}
      </h4>
      <p className="text-sm text-neutral-300 dark:text-neutral-500">{title}</p>
    </div>
  );
}

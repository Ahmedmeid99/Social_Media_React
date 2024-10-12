import React, { useEffect, useState } from "react";
import {
  AddnewProfilePicture,
  GetUserProfilePicture,
  UpdatenewProfilePicture,
} from "../../../../API/ProfilePicture";
import { useSelector } from "react-redux";

function ProfilePicture({ userID }) {
  
  const [profilePicture, setProfilePicture] = useState(null);
  const { User} = useSelector((state) => state.User);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const fetchUserProfilePicture = async (userId) => {
    const response = await GetUserProfilePicture(userId);
    setProfilePicture(response);

    if (response) {
      setIsUpdateMode(true);
    }

    return response;
  };

  useEffect(() => {
    fetchUserProfilePicture(userID);
    return () => {};
  }, [location.pathname]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const pictureData = event.target.result;

        // Ensure pictureData is not null
        if (pictureData) {
          setProfilePicture({
            UserProfilePictureId: profilePicture?.UserProfilePictureId,
            PictureData: pictureData.split(",")[1], // Strip the base64 prefix
            MediaType: files[0].type,
          });

          // Call insert or update after file selection
          if (isUpdateMode) {
            await handleUpdate(files);
          } else {
            await handleInsert(files);
          }
        } else {
          console.error("Failed to read the file data.");
        }
      };

      reader.readAsDataURL(files[0]);
    }
  };

  const openFileSelector = async (acceptType) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = acceptType; // Set file type filter (image, video, pdf)
    input.multiple = false; // Allow multiple file selection
    input.onchange = handleFileChange; // Trigger file change event
    input.click(); // Open file explorer
  };

  // Handle insert action
  const handleInsert = async (files) => {
    // Await the result from SetNewProfilePicture and handle the response
    const filesToSend = files.length > 0 ? files : null;
    try {
      const result = await AddnewProfilePicture(userID, filesToSend);
      setSelectedFiles(files);
    } catch (error) {
      throw error;
    }
  };

  const handleUpdate = async (files) => {
    // Await the result from SetNewProfilePicture and handle the response
    const filesToSend = files.length > 0 ? files : null;
    try {
      const result = await UpdatenewProfilePicture(
        profilePicture.UserProfilePictureId,
        filesToSend
      );

      // setSelectedFiles(files);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className=" relative w-fit m-auto">
      {profilePicture?.MediaType?.startsWith("image") && (
        <img
          className="w-40 h-40 block rounded-full m-auto mb-3 p-1 dark:bg-darkColor-800 bg-gray-50"
          loading="lazy"
          src={`data:${profilePicture?.MediaType};base64,${profilePicture?.PictureData}`}
          alt="Medium avatar"
        />
      )}
      {!profilePicture?.MediaType?.startsWith("image") && (
        <div className="relative w-32 h-32 m-auto mb-3 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-36 h-36  text-gray-400 -left-2"
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
      {/* Upload Image Button */}
      {User.UserId == userID && 

      <button
        type="button"
        onClick={() => openFileSelector("image/*")}
        className=" absolute bottom-5 right-0 bg-gray-100 dark:bg-darkColor-700 border-2 border-cyan-700 dark:border-slate-100 w-9 h-9 flex justify-center items-center py-0.5 px-1 rounded-full cursor-pointer  hover:bg-gray-100 "
      >
        <svg
          className="size-5 text-yellow-600 dark:text-yellow-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            fill="currentColor"
            d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
          />
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
          />
        </svg>
      </button>}
    </div>
  );
}

export default ProfilePicture;

import React, { useEffect, useState } from 'react'
import background from "../../../../assets/images/background/background2.jpg";

import { AddnewBackgroundPicture, GetUserBackgroundPicture, UpdatenewBackgroundPicture } from '../../../../API/BackgroundPicture';
import { useSelector } from 'react-redux';

function BackgroundPicture({userID}) {
  const [backgroundPicture, setBackgroundPicture] = useState(null);
  const { User} = useSelector((state) => state.User);

  const [isUpdateMode, setIsUpdateMode] = useState(false);

  
  const fetchUserBackgroundPicture = async (userId) => {
    const response = await GetUserBackgroundPicture(userId);
    setBackgroundPicture(response);

    if(response){
      setIsUpdateMode(true);
    }

    return response;
  };

  useEffect(() => {
    fetchUserBackgroundPicture(userID);
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
          setBackgroundPicture({
            UserBackgroundPictureId:backgroundPicture?.UserBackgroundPictureId,
            PictureData: pictureData.split(',')[1], // Strip the base64 prefix
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
  

  const openFileSelector = async(acceptType) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = acceptType; // Set file type filter (image, video, pdf)
    input.multiple = false; // Allow multiple file selection
    input.onchange = handleFileChange; // Trigger file change event
    input.click(); // Open file explorer
    
  };
  

  // Handle insert action
  const handleInsert = async (files) => {
    // Await the result from SetNewBackgroundPicture and handle the response
    const filesToSend = files.length > 0 ? files : null;
    try{
    await AddnewBackgroundPicture(userID, filesToSend);

  }catch(error){
      throw error;
    }
  };


  const handleUpdate = async (files) => {

    // Await the result from SetNewBackgroundPicture and handle the response
    const filesToSend = files.length > 0 ? files : null;
try{
    await UpdatenewBackgroundPicture(backgroundPicture?.UserBackgroundPictureId, filesToSend);

  }catch(error){
    throw error;
  }
  };
  return (
    <div className="h-96 rounded-s-md relative">
        {backgroundPicture?.MediaType?.startsWith("image") && (
          <img
            className="w-full h-full rounded-ee-md rounded-es-md"
            src={`data:${backgroundPicture?.MediaType};base64,${backgroundPicture?.PictureData}`}
            alt="background !"
          />
        )}
        {!backgroundPicture?.MediaType?.startsWith("image") && (
          <img
            className="w-full h-full rounded-ee-md rounded-es-md"
            src={background}
            alt="default background !"
          />
        )}
        {/* Upload Image Button */}
        {User.UserId == userID && 
        <button
            type="button"
            onClick={() => openFileSelector("image/*")}
            className=" absolute top-4 right-4 bg-gray-100 dark:bg-darkColor-700 border-2 border-cyan-700 dark:border-slate-100 w-9 h-9 flex justify-center items-center py-0.5 px-1 rounded-full cursor-pointer  hover:bg-gray-100 "
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
  )
}

export default BackgroundPicture
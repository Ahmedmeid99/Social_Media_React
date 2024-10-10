import React, { useEffect, useState } from 'react'
import { HiVideoCamera } from 'react-icons/hi'
import { GetVideosByUserId } from '../../../../../../API/Post';

function Videos({userID}) {
  const [userVideos, setUserVideos] = useState([]);

  const [loading, setLoading] = useState(false);
  const fetchVideos = async () => {
    try {
      setLoading(true);
      let results = await GetVideosByUserId(userID);

      setLoading(false);
      if(results != null){
      setUserVideos(results);
      }
    } catch (error) {
      throw error;
    }
  };
  
  useEffect(() => {
    fetchVideos();
  }, [location.pathname]); 
  return (
    <div className='flex justify-start items-center flex-wrap gap-2'>
      {loading&&   <div className='text-gray-400 flex justify-center flex-col items-center gap-2 w-fit mx-auto my-32 text-base'>Loading...</div> }
        {!loading&& Array.isArray(userVideos) &&
              userVideos?.length > 0 
              && userVideos?.map((userVideo)=> 
           (<div className='w-full md:w-8/12 lg:w-4/12' key={userVideo?.PostId}>
            {userVideo?.MediaType?.startsWith("video") && <video
            controls
            className="w-full h-80 mb-3 bg-gray-50 object-cover rounded-lg block"
          >
            <source
              src={`data:${userVideo?.MediaType};base64,${userVideo?.MediaData}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>}
          </div>)
        )}
        {!loading&&userVideos?.length == 0 && <p className="text-gray-400 flex justify-center flex-col items-center gap-2 w-fit mx-auto my-32 text-base">
            <HiVideoCamera  className="text-4xl text-gray-200" /> <span>No videos available.</span>
          </p>}
    </div>
  
)}

export default Videos
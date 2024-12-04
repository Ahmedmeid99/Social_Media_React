import React, { useEffect, useState } from 'react'
import Post from '../../../../../../Components/Post/Components/Post';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { GetPostsByUserId } from '../../../../../../API/Post';

function UserPosts({userID}) {
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDeletePost = () => {
        fetchPosts();
      };
  const fetchPosts = async () => {
    try {
        setLoading(true);
      let results = await GetPostsByUserId(userID);
      setLoading(false);
      if (results != null) {
        setUserPosts(results);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [location.pathname]); 
  return (
     
    <div className=" w-full lg:w-8/12 m-auto md:ml-0">
      {loading&&   <div className='text-gray-400 flex justify-center flex-col items-center gap-2 w-fit mx-auto my-32 text-base'>Loading...</div> }
      {!loading && Array.isArray(userPosts) && userPosts?.length > 0 && (
      userPosts?.map((post) => (
        <Post
          key={post?.PostID}
          postinfo={post}
          onDelete={handleDeletePost}
        />
      ))
    ) }{!loading&&userPosts?.length == 0 &&(
      <p className="text-gray-400 flex justify-center flex-col items-center gap-2 w-fit mx-auto my-32 text-base">
        <HiOutlineClipboardList className="text-4xl text-gray-200" />{" "}
        <span>No posts available.</span>
      </p>
    )}
  </div>
  )
}

export default UserPosts
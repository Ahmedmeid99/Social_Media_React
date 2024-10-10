import { useSelector } from "react-redux";
import Card from "../../../../UI/Card"; 
import PostInfo from "../../Components/PostInfo";
import ImagePlaceHolder from "../../../../UI/PlaceHolders/Image";
import VideoPlaceHolder from "../../../../UI/PlaceHolders/Video";
import AddEditPost from "../AddEditPost"
import PdfViewer from "../../Components/PdfViewer";
import {  GetMediaDataByPostId, DeletePost } from "../../../../API/Post";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Post = ({ postinfo , onDelete}) => {
    const [media, setMedia] = useState({});
    const [loading, setLoading] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [post, setPost] = useState(postinfo);
    const { User} = useSelector((state) => state.User);
  
    const toggleOptions = () => {
      setShowOptions(!showOptions);
    };
  
    const closeEditMode = () => {
      setEditMode(false);
    };
    
    
    
    const fetchMediaDataOfPostId = async (postID) => {
      try {
        setLoading(true);
        let response = await GetMediaDataByPostId(postID);
        setLoading(false);
        return response;
      } catch (error) {
        return null;
      }
    };

   
    const handleGetMediaData = async () => {
      const response = await fetchMediaDataOfPostId(post?.PostID);
  
      if (response) {
        setMedia(response);
      }
    };
  
    useEffect(() => {
      handleGetMediaData();
      return () => {};
    }, []);   
    
  
    const handleDeletePost= async(postId)=>{
      await DeletePost(postId);
      onDelete();
    }
  
    const handleUpdatePost= (post)=>{
      handleGetMediaData();
      setPost(post)
    }
  
    return (
      <Card>
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex items-center justify-between">
        <Link to={`/Profile/${post?.UserID}`} className="flex items-center justify-between">

          {post?.PictureData ? (
            <img
              alt="s"
              src={`data:image/jpeg;base64,${post?.PictureData}`} 
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
            />
          ) : (
           
              <div className="relative h-12 w-12 m-auto mb-3 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                  className="absolute h-14 w-14 text-gray-400 -left-1"
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
  
          <div className="min-w-0 flex-auto ml-4">
            <p className=" text-sm font-semibold leading-4 text-gray-900 dark:text-slate-50">
              {post?.UserName}
            </p>
            <p className="mt-0 truncate text-xs leading-4 text-gray-500 dark:text-slate-400">
              {post?.Email}
            </p>
          </div>
          </Link>
          </div>
          {/* Options Button (Three Dots) */}
          <div className="relative">
            <button
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300"
              onClick={toggleOptions}
            >
              ⋮
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-2  w-40 bg-white rounded-md shadow-xl dark:bg-gray-700 *:text-sm z-10">
                  {User.UserId == post?.UserID && <button
                    className="w-full text-left block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-600"
                    onClick={() => setEditMode(true)} //show input to update Post Text
                  >
                    {" "}
                    {/*Display the addedit input */}
                    Edit Post
                  </button>}
                  {User.UserId == post?.UserID && <button
                    className="w-full text-left block px-4 py-2 text-gray-800 dark:text-gray-200  hover:bg-slate-100 dark:hover:bg-slate-600"
                    onClick={() => handleDeletePost(post?.PostID)}
                  >
                    Delete Post
                  </button>}
                <button
                  className="w-full text-left block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-600"
                  onClick={() => 0}
                >
                  Copy
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Full-width Image */}
        <p className="pt-5 text-sm text-slate-600 dark:text-slate-200">
          {/* {post?.Content} */}
          {!editMode && <div dangerouslySetInnerHTML={{ __html: post?.Content }} />}
  
          {/*Input for update post */}
          {editMode && <AddEditPost postText={post?.Content} postId={post?.PostID} MediaData={post?.MediaData} onUpdatePost={handleUpdatePost} onClose={closeEditMode} isUpdateMoed={true}/>}
        </p>
        <div className="mt-3 max-w-full">
          {media.MediaType == "None" && <span></span>}
          {media.MediaType?.startsWith("image") && loading && <ImagePlaceHolder />}
          {media.MediaType == "video/mp4" && loading && <VideoPlaceHolder />}
          {media.MediaType == "application/pdf" && loading && <VideoPlaceHolder />/*NEED FIX */}
  
          {media.MediaType?.startsWith("image") && !loading && (
            <img
              loading="lazy"
              alt=""
              // src={post?.imageUrl}
              src={`data:${media.MediaType};base64,${media.MediaData}`}
              className="w-full h-80 mb-3 bg-gray-50 object-cover rounded-lg block"
            />
          )}
  
          {media.MediaType == "video/mp4" && !loading && (
            <video
              controls
              preload="none"  
              loading="lazy" 
              className="w-full h-80 mb-3 bg-gray-50 object-cover rounded-lg block"
            >
              <source
                src={`data:video/mp4;base64,${media.MediaData}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
          {media.MediaType == "application/pdf" && !loading && <PdfViewer mediaData={media.MediaData}/>}
        </div>
        <PostInfo
          postId={post?.PostID}
          LikesCount={post?.LikesCount}
          LoveCount={post?.LoveCount}
          DisLikeCount={post?.DisLikeCount}
          WowCount={post?.WowCount}
          SadCount={post?.SadCount}
          AngryCount={post?.AngryCount}
        />
      </Card>
    );
  };

  export default Post;
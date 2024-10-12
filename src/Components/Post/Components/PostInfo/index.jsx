import React, { useEffect, useRef, useState } from "react";
import AddEditComment from "../AddEditComment";
import CommentsList from "../PostComments";
import {
  GetComments,
  PostComment,
  DeleteComment,
  UpdateComment,
} from "../../../../API/Comment";
import { useSelector } from "react-redux";
import {
  AddUserReaction,
  DeleteUserReaction,
} from "../../../../API/Reaction";

import clickSound from "../../../../assets/Sound_Effects/pop-up.mp3"
const PostActions = ({
  postId,
  LikesCount,
  LoveCount,
  DisLikeCount,
  WowCount,
  SadCount,
  AngryCount,
}) => {
  // State to manage comments visibility and reactions counts
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [likes, setLikes] = useState(LikesCount);
  const [loves, setLoves] = useState(LoveCount);
  const [dislikes, setDislikes] = useState(DisLikeCount);
  const [wows, setWows] = useState(WowCount);
  const [sads, setSads] = useState(SadCount);
  const [angrys, setAngrys] = useState(AngryCount);
  const [comments, setComments] = useState([]);
  const [SelectedReact, setSelectedReact] = useState("");
 
  const audioRef = useRef(new Audio(clickSound));

  const { User} = useSelector((state) => state.User);

  const FetchComments = async (postId) => {
    const response = await GetComments(postId);
    setComments(response);
  };

  useEffect(() => {
    FetchComments(postId);
    return () => {};
  }, []);

  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  const PostNewComment = async (CommentData) => {
    try {
      const response = await PostComment(CommentData);
      return response;
    } catch (e) {
      return null;
    }
  };

  const handleAddComment = async (CommentText) => {
    if (CommentText.trim() === "" && !User) {
      return; // Prevent empty comments
    }

    const comment = {
      PostId: postId,
      UserId: User.UserId, 
      CommentText,
    };

    await PostNewComment(comment);

    await FetchComments(postId);
  };

  const handleUpdateComment = async (commentId, CommentText) => {
    if (CommentText.trim() === "" && !User) {
      return; // Prevent empty comments
    }

    const comment = {
      CommentText,
    };

    await UpdateComment(commentId, comment);

    await FetchComments(postId);
  };

  const handleDeleteComment = async (commentId) => {
    await DeleteComment(commentId);
    await FetchComments(postId);
  };

  const UserReactions = [
    { Id: 1, ReactionType: "Like" },
    { Id: 2, ReactionType: "Love" },
    { Id: 4, ReactionType: "Wow" },
    { Id: 5, ReactionType: "Sad" },
    { Id: 6, ReactionType: "Angry" },
    { Id: 8, ReactionType: "Dislike" },
  ];

  const PostReaction = async (ReactionData) => {
    const response = await AddUserReaction(ReactionData);
  };

  const DeleteReaction = async (PostId,UserId) => {
    const response = await DeleteUserReaction(PostId,UserId);
  };

const GetSelectedReactionId = (ReactionType)=>{
  const SelectedReaction = UserReactions.find((u)=>u.ReactionType == ReactionType);

  if(SelectedReaction){
    return SelectedReaction.Id;
  }
  return -1;
}

  const handleAddReaction = async(ReactionData) =>{
    await PostReaction(ReactionData);
  }

  const handleDeleteReaction = async(PostId,UserId) =>{
    
      await DeleteReaction(PostId,UserId);
    
  } 

 
  const resetReactions = () => {
    setLikes(LikesCount);

    setLoves(LoveCount);

    setDislikes(DisLikeCount);

    setWows(WowCount);

    setSads(SadCount);

    setAngrys(AngryCount);
  };

  const handleSelectedReaction = (ReactionType) => {
    // in each case insert userReaction
    switch (ReactionType) {
      case UserReactions[0]["ReactionType"]:
        setLikes(likes + 1);
        break;
      case UserReactions[1]["ReactionType"]:
        setLoves(loves + 1);
        break;
      case UserReactions[2]["ReactionType"]:
        setWows(wows + 1);
        break;
      case UserReactions[3]["ReactionType"]:
        setSads(sads + 1);
        break;
      case UserReactions[4]["ReactionType"]:
        setAngrys(angrys + 1);
        break;
      case UserReactions[5]["ReactionType"]:
        setDislikes(dislikes + 1);
        break;

      default:
        break;
    }
  };


  const handleButtonClick = () => {
    audioRef.current.play().catch(error => {
      console.error('Error playing sound:', error);
    });

    // Your existing button click logic here
    console.log('Button clicked!');
  };

  const handleSelectReaction = async (ReactionType) => {
    // sound of clicking
    handleButtonClick();
    const ReactionTypeId = GetSelectedReactionId(ReactionType);
    if(ReactionTypeId == -1) {return;}
    
    const ReactionData = {
      UserId:User.UserId,
      PostId:postId,
      ReactionTypeId:ReactionTypeId
    }
    resetReactions();

    if (SelectedReact == ReactionType) {
      setSelectedReact("");
      // Delete UserReaction
      await handleDeleteReaction(postId,User.UserId); 

    }  else {
      // Add UserReaction
      handleAddReaction(ReactionData)
      setSelectedReact(ReactionType);
      handleSelectedReaction(ReactionType);
    }

  };

  return (
    <div className="shadow-sm rounded-lg py-2 px-3 bg-gray-50 dark:bg-gray-700">
      <div className="flex justify-between items-center">
        <div className="flex space-x-3 *:text-sm">
          {/* Likes */}
          <button
            className="flex items-end justify-center gap-0.5 text-gray-600 hover:text-blue-600 dark:text-gray-300"
            onClick={() => handleSelectReaction(UserReactions[0]["ReactionType"])}
          >
            <span className="hover:scale-150 duration-300 block">👍</span> <span className="text-xs">{likes}</span>
          </button>

          {/* Loves */}
          <button
            className="flex items-end justify-center gap-0.5 text-gray-600 hover:text-red-600 dark:text-gray-300"
            onClick={() => handleSelectReaction(UserReactions[1]["ReactionType"])}
          >
            <span className="hover:scale-150 duration-300 block">❤️</span> <span className="text-xs">{loves}</span>
          </button>

          {/* Dislikes */}
          <button
            className="flex items-end justify-center gap-0.5 text-gray-600 hover:text-blue-600 dark:text-gray-300"
            onClick={() => handleSelectReaction(UserReactions[5]["ReactionType"])}
          >
            <span className="hover:scale-150 duration-300 block">👎</span> <span className="text-xs">{dislikes}</span>
          </button>

          {/* Wows */}
          <button
            className="flex items-end justify-center gap-0.5 text-gray-600 hover:text-yellow-600 dark:text-gray-300"
            onClick={() => handleSelectReaction(UserReactions[2]["ReactionType"])}
          >
            <span className="hover:scale-150 duration-300 block">😮</span> <span className="text-xs">{wows}</span>
          </button>

          {/* Sads */}
          <button
            className="flex items-end justify-center gap-0.5 text-gray-600 hover:text-blue-600 dark:text-gray-300"
            onClick={() => handleSelectReaction(UserReactions[3]["ReactionType"])}
          >
            <span className="hover:scale-150 duration-300  block">😢</span> <span className="text-xs">{sads}</span>
          </button>

          {/* Angrys */}
          <button
            className="flex items-end justify-center gap-0.5 text-gray-600 hover:text-red-600 dark:text-gray-300"
            onClick={() => handleSelectReaction(UserReactions[4]["ReactionType"])}
          >
            <span className="hover:scale-150 duration-300 block">😠</span> <span className="text-xs">{angrys}</span>
          </button>
        </div>
        {/* Comments Toggle */}
        <button
          className="text-gray-600 hover:text-green-600 dark:text-gray-300"
          onClick={toggleComments}
        >
          💬 {comments.length}
        </button>
      </div>

      {/* Comments Section */}
      {commentsVisible && (
        <div className="p-0 rounded-lg">
          <AddEditComment onAddComment={handleAddComment} />
          <CommentsList
            comments={comments}
            onDeleteComment={handleDeleteComment}
            onUpdateComment={handleUpdateComment}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(PostActions);

import React, { useState } from "react";
import AvaterPlaceHolder from "../../../../UI/PlaceHolders/Avater";
import { useSelector } from "react-redux";
import AddEditComment from "../AddEditComment";
const Comment = ({
  avatar,
  UserName,
  Email,
  CommentText,
  commentId,
  DeleteComment,
  UpdateCurrentComment,
}) => {
  const { User } = useSelector((state) => state.User);

  const [editMode, setEditMode] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleUpdateComment = (CommentText) => {
    setShowOptions(false);
    UpdateCurrentComment(commentId, CommentText);
    handleCloseForm();
  };

  const handleDeleteComment = (commentId) => {
    DeleteComment(commentId);
    setShowOptions(false);
  };

  const handleCopyComment = () => {
    setShowOptions();
  };

  const handleCloseForm = () => {
    setEditMode(false);
  };
  return (
    <div className=" p-4 bg-white  shadow-sm rounded-lg mb-2 dark:bg-darkColor-800">
      <div className="min-w-0 flex items-center">
        {avatar ? (
          <img
            className="w-10 h-10 rounded-full"
            src={`data:image/jpeg;base64,${avatar}`}
            alt={`${UserName}'s avatar`}
          />
        ) : (
         
            <div className="relative h-10 w-10 m-auto mb-3 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute h-12 w-12 text-gray-400 -left-1"
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
        <div className="min-w-0 flex-auto ml-4">
          <p className=" text-xs font-semibold leading-4 text-gray-900 dark:text-slate-50">
            {UserName}
          </p>
          <p className="mt-0 truncate text-xs leading-4 text-gray-500 dark:text-slate-400">
            {Email}
          </p>
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
              {User.UserName == UserName && (
                <button
                  className="w-full text-left block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-600"
                  onClick={() => setEditMode(!editMode)}
                >
                  {" "}
                  {/*Display the addedit input */}
                  Edit Comment
                </button>
              )}
              {User.UserName == UserName && (
                <button
                  className="w-full text-left block px-4 py-2 text-gray-800 dark:text-gray-200  hover:bg-slate-100 dark:hover:bg-slate-600"
                  onClick={() => handleDeleteComment(commentId)}
                >
                  Delete Comment
                </button>
              )}
              <button
                className="w-full text-left block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-600"
                onClick={() => handleCopyComment()}
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
      {!editMode && (
        <p className="pl-12 mt-1 text-xs text-gray-600 dark:text-gray-300">
          {CommentText}
        </p>
      )}
      {editMode && (
        <AddEditComment
          CommentText={CommentText}
          updateMode={true}
          onUpdateComment={handleUpdateComment}
        />
      )}
    </div>
  );
};

const CommentsList = ({ comments, onDeleteComment, onUpdateComment }) => {
  return (
    <div className="max-w-2xl mx-auto mt-6">
      {comments.map((comment) => (
        <Comment
          key={comment.CommentId}
          DeleteComment={onDeleteComment}
          UpdateCurrentComment={onUpdateComment}
          commentId={comment.CommentId}
          avatar={comment.PictureData}
          Email={comment.Email}
          UserName={comment.UserName}
          CommentText={comment.CommentText}
        />
      ))}
    </div>
  );
};

export default CommentsList;

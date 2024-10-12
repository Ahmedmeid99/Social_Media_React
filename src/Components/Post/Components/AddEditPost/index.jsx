import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import Card from "../../../../UI/Card";
import { useSelector } from "react-redux";
import { AddnewPost, UpdatePost } from "../../../../API/Post";
function AddEditPost({
  onAddPost,
  onUpdatePost,
  onClose,
  postId,
  postText,
  isUpdateMoed = false,
}) {
  const [text, setText] = useState(postText || "");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const quillRef = React.useRef(null);

  const { User} = useSelector((state) => state.User);

  const handleTextChange = (value) => {
    setText(value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("Selected files:", files); // Log selected files
    setSelectedFiles(files);
  };

  const openFileSelector = (acceptType) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = acceptType; // Set file type filter (image, video, pdf)
    input.multiple = false; // Allow multiple file selection
    input.onchange = handleFileChange; // Trigger file change event
    input.click(); // Open file explorer
  };

  // Function to post new post
  const PostNewPost = async (userId, postContent, selectedFiles) => {
    try {
      const response = await AddnewPost(userId, postContent, selectedFiles);
      return response;
    } catch (error) {
      console.error("Error in PostNewPost:", error);
      return null;
    }
  };

  // Handle insert action
  const handleInsert = async () => {
    if (!text) {
      return;
    }

    // Await the result from PostNewPost and handle the response
    const filesToSend = selectedFiles.length > 0 ? selectedFiles : null;

    const result = await PostNewPost(User.UserId, text, filesToSend);
    if(result){

      onAddPost(result); // pass result to parent component
      
      // Reset text and file
      setText("");
      setSelectedFiles([]);
    }
  };
  const handleUpdate = async () => {
    if (!text) {
      return;
    }

    // Await the result from PostNewPost and handle the response
    const filesToSend = selectedFiles.length > 0 ? selectedFiles : null;

    const result = await UpdatePost(postId , text, filesToSend);

    onUpdatePost(result); // pass result to parent component

    // Reset text and file
    setText("");
    setSelectedFiles([]);
  };
  
  const handleSubmit = async () => {
    if (isUpdateMoed) {
      await handleUpdate();
        onClose();
    } else {
      await handleInsert();
    }
  };

  const modules = {
    toolbar: [
      [{ header: "2" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"],
      [{ direction: "rtl" }], // Add RTL direction option
      [{ align: [] }], // Add text alignment (including LTR)
      ["clean"], // Remove formatting
    ],
  };

  return (
    <div className=" w-full m-auto dark:bg-darkColor-800 ">
      <Card>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {`${isUpdateMoed?"Update":"Create"} Post`}
        </label>
        {/* Rich Text Editor */}
        <ReactQuill
          ref={quillRef}
          value={text}
          onChange={handleTextChange}
          modules={modules}
          className="mb-4 custom-quill dark:text-slate-100 dark:*:placeholder:text-slate-100" // Add a custom class for styling
          placeholder="Write your thoughts here..."
        />

        {/* File Upload Buttons and Insert Button */}
        <div className="flex items-center space-x-3 mt-2">
          {/* Upload Video Button */}
          <button
            type="button"
            onClick={() => openFileSelector("video/*")}
            className="inline-flex justify-center py-0.5 px-1 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            <span className="ml-2 font-normal text-sm">Video</span>
          </button>

          {/* Upload Image Button */}
          <button
            type="button"
            onClick={() => openFileSelector("image/*")}
            className="inline-flex justify-center py-0.5 px-1 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              className="size-5 text-yellow-600"
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
            <span className="ml-2 font-normal text-sm">Image</span>
          </button>

          {/* Upload PDF Button */}
          <button
            type="button"
            onClick={() => openFileSelector("application/pdf")}
            className="inline-flex justify-center py-0.5 px-1 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <span className="ml-2 font-normal text-sm">PDF</span>
          </button>

          {/* Insert Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex justify-center py-0.5 px-1 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              className="size-5 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="ml-2 font-normal text-sm">{`${isUpdateMoed?"Update":"Add"} Post`}</span>
            

          </button>
        </div>

        {/* Preview Selected Files */}
        <div className="mt-2">
          {selectedFiles.length > 0 &&
            selectedFiles.map((file, idx) => (
              <p key={idx} className="text-sm">
                {file.name}
              </p>
            ))}
        </div>
      </Card>
    </div>
  );
}

export default React.memo(AddEditPost);

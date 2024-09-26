import React,{useRef} from 'react'

function AddEditComment ({onAddComment,onUpdateComment,updateMode,CommentText}) {

  const CommentRef = useRef(CommentText || null);

  const AddSubmit = async (e) => {
    e.preventDefault();

    const commentText = CommentRef.current.value.trim(); // Trim whitespace
    if (commentText === "") {
        return; // Prevent empty comments
    }

    try {

      if(updateMode){

        await onUpdateComment(commentText);

      }else{

        await onAddComment(commentText); // Call the function to add the comment
      }

      CommentRef.current.value = ""; // Clear the input field
   
    } catch (error) {
        console.error("Error adding comment:", error); // Handle error
    }
};


  return (
    <form className="mt-4"  onSubmit={AddSubmit}>
      <label htmlFor="chat" className="sr-only">
        Your Comment
      </label>
      <div className="flex items-center py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
       
        <textarea
          id="chat"
          ref={CommentRef}
          defaultValue={CommentText}
          rows="1"
          className="block mx-1 p-2.5 w-full max-h-11 min-h-11 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your comment..."
        ></textarea>
        <button
          type="submit"
          className="disabled:hidden inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        >
          <svg
            className="w-5 h-5 rotate-90 rtl:-rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
          </svg>
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  );
}

export default AddEditComment 
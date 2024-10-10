import React, { useEffect, useState } from "react";
import PdfViewer from "../../../../../../Components/Post/Components/PdfViewer";
import { HiDocument } from "react-icons/hi";
import { GetFilesByUserId } from "../../../../../../API/Post";

function Files({ userID }) {
  const [userFiles, setUserFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      let results = await GetFilesByUserId(userID);
      setLoading(false);
      if (results != null) {
        setUserFiles(results);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [location.pathname]); //Posts
  return (
    <div className="flex justify-start items-center flex-wrap gap-2">
      {loading&&   <div className='text-gray-400 flex justify-center flex-col items-center gap-2 w-fit mx-auto my-32 text-base'>Loading...</div> }
      {!loading &&
        Array.isArray(userFiles) &&
        userFiles?.length > 0 &&
        userFiles?.map((file) => (
          <div className="w-6/12" key={file?.PostId}>
            <PdfViewer mediaData={file?.MediaData} />
          </div>
        ))}
      {!loading && userFiles?.length == 0 && (
        <p className="text-gray-400 flex justify-center flex-col items-center gap-2 w-fit mx-auto my-32 text-base">
          <HiDocument className="text-4xl text-gray-200" />{" "}
          <span>No files available.</span>
        </p>
      )}
    </div>
  );
}

export default Files;

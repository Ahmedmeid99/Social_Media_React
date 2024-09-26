import React from "react";
import Loading from "../../Loading";

function VideoPlaceHolder() {
  return (
    <div className="w-full h-80 mb-3 bg-gray-100 object-cover rounded-lg flex justify-center items-center">
      <div>
        <Loading />
      </div>
    </div>
  );
}

export default VideoPlaceHolder;

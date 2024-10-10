import { HiPhotograph } from "react-icons/hi";
import { GetImagesByUserId } from "../../../../../../API/Post";
import { useEffect, useState } from "react";

export default function Gallery({ userID }) {
  const [userImages, setUserImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
        setLoading(true);
        let results = await GetImagesByUserId(userID);
        setLoading(false);
      if (results != null) {
        setUserImages(results);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchImages();
  }, [location.pathname]);

  return (
    <div>
      {loading && (
        <div className="text-gray-400 flex justify-center flex-col items-center gap-2 w-fit mx-auto my-32 text-base">
          Loading...
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {!loading &&
        Array.isArray(userImages) &&
        userImages?.length > 0 &&
        userImages?.map((image) => (
          <div key={image?.PostId} className="relative">
            {image?.MediaData && (
              <img
                className="h-auto w-full rounded-lg object-cover"
                src={`data:${image?.MediaType};base64,${image?.MediaData}`}
                alt={`Post ${image.PostId}`}
              />
            )}
          </div>
        ))}
        </div>

      {userImages?.length == 0 && (
        <p className="text-gray-400 flex justify-center flex-col items-center gap-2 w-fit mx-auto my-32 text-base">
          <HiPhotograph className="text-4xl text-gray-200" />{" "}
          <span>No images available.</span>
        </p>
      )}

      {/* <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt=""/>
        </div>
    </div>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt=""/>
        </div>
    </div>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt=""/>
        </div>
    </div>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt=""/>
        </div>
    </div> */}
    </div>
  );
}

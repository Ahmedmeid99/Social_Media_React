import { Tabs } from "flowbite-react"; 
import {
  HiPhotograph,
  HiVideoCamera,
  HiDocumentText,
  HiClipboardList,
  HiAdjustments, 
} from "react-icons/hi"; // Added HiAdjustments for Settings icon


import Gallery from "./Components/Gallery";
import Videos from "./Components/Videos";
import Files from "./Components/Files";
import UserPosts from "./Components/UserPosts";
import { useSelector } from "react-redux";

export function ProfileContent({ userID }) {
  const { User} = useSelector((state) => state.User);

  
  

  return (
    <div className="px-3 container m-auto ">
      <Tabs aria-label="Content tabs" variant="default">
        {/* Posts Tab */}
        <Tabs.Item
          active
          title="Posts"
          icon={HiClipboardList}
          className="focus:outline-none focus:border-none focus:ring-0 z-index-revert"
        >
          <UserPosts userID={userID}/>
        </Tabs.Item>

        {/* Images Tab */}
        <Tabs.Item
          title="Images"
          icon={HiPhotograph}
          className="focus:outline-none focus:border-none focus:ring-0 z-index-revert"
        >
          <Gallery userID={userID} />
        </Tabs.Item>

        {/* Videos Tab */}
        <Tabs.Item
          title="Videos"
          icon={HiVideoCamera}
          className="focus:outline-none focus:border-none focus:ring-0 z-index-revert"
        >
          <Videos userID={userID} />
        </Tabs.Item>

        {/* Files Tab */}
        <Tabs.Item
          title="Files"
          icon={HiDocumentText}
          className="focus:outline-none focus:border-none focus:ring-0 z-index-revert"
        >
          <Files userID={userID} />
        </Tabs.Item>
        {User.UserId == userID && 

      <Tabs.Item
          title="Settings"
          icon={HiAdjustments}
          className="focus:outline-none focus:border-none focus:ring-0 z-index-revert"
        >
        </Tabs.Item>}
      </Tabs>
    </div>
  );
}

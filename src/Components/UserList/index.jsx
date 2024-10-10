import React, { useEffect, useState } from "react";
import Card from "../../UI/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetRelatedUsers } from "../../API/User";
import UserItem from "./Components/UserItem";
function UsersList() {
  const { User } = useSelector((state) => state.User);
  const [relatedUsers, setRelatedUsers] = useState([]);

  const fetchRelatedUsers = async () => {
    try {
      const response = await GetRelatedUsers(User.UserId);
      if (response) {
        setRelatedUsers(response);
      }
    } catch (error) {
      throw error;
    }
  };


  useEffect(() => {
    fetchRelatedUsers();
    console.log("relatedUsers", relatedUsers);
    return () => {};
  }, []);

  

  return (
    <Card>
      <h3 className="mb-4 font-medium">Users List</h3>
      {/*User List */}
      <ul className=" divide-y divide-slate-200">
        {/*User Item */}
        {relatedUsers?.map((user) => (
          <UserItem user={user}/>
        ))}

      </ul>
      <Link
        to="/Home"
        className="m-auto w-fit block text-blue-700 hover:text-blue-950 dark:text-blue-800 dark:hover:text-blue-700 "
      >
        <button className="">More</button>
      </Link>
    </Card>
  );
}

export default UsersList;

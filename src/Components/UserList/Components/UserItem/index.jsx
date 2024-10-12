import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { AddUserRelationship } from '../../../../API/UserRelationship';
import { useSelector } from 'react-redux';

function UserItem({user}) {
    const [relationState, setRelationState] = useState(false);
    const { User } = useSelector((state) => state.User);

    const AddNewRelationship = async ({
        UserId1,
        UserId2,
        RelationshipTypeId
      }) => {
        const response = await AddUserRelationship({
          UserId1,
          UserId2,
          RelationshipTypeId,
        });
        if(response){
          setRelationState(true);
        }
      };
    
      const handleAddedAsFrind = async(userItemId)=>{
        AddNewRelationship({UserId1:User.UserId,UserId2:userItemId,RelationshipTypeId:1});
      }
  return (
    <li
            className="min-w-0 flex items-center py-3 first:pt-0 last:pb-0"
            key={user?.UserId}
          >
            <Link to={`/Profile/${user?.UserId}`}>
              <div className="min-w-0 flex items-center py-3 first:pt-0 last:pb-0">
                {user?.MediaType?.startsWith("image") ? (
                  <img
                    alt="image !!!"
                    src={`data:${user?.MediaType};base64,${user?.PictureData}`}
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

                <div className="min-w-0 flex-auto pl-2 mb-2">
                  <p className=" text-sm font-semibold leading-4 text-gray-900 dark:text-slate-50">
                    {user?.UserName}
                  </p>
                  <p className="mt-0 truncate text-xs leading-4 text-gray-500 dark:text-slate-400">
                    {user?.Email}
                  </p>
                </div>
              </div>
            </Link>

            <div className="min-w-0 pr-2 flex justify-center items-center">
              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Message
              </button>
              {relationState && <p               
                className="text-gray-900 border border-dotted  focus:ring-4  font-medium rounded-lg text-sm px-3 py-1 me-2 mb-2  focus:outline-none"

                >Frind</p>}

              {!relationState &&  <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={()=>handleAddedAsFrind(user?.UserId)}
              >
                Frind
              </button>}
            </div>
          </li>
  )
}

export default React.memo(UserItem)
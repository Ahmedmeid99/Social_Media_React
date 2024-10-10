import React, { useEffect, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { GetRelationshipTypes } from "../../../../API/RelationshipTypes";
import { AddUserRelationship, GetUserRelationship, UpdateUserRelationship } from "../../../../API/UserRelationship";
import { useSelector } from "react-redux";

function UserActions({userID}) {
  const [editMode, setEditMode] = useState(false);

  const [selectedRelation, setSelectedRelation] = useState(null);
  const [userRelationship, setUserRelationship] = useState(null);

  const [relationshipTypes, setRelationshipTypes] = useState([]);

  const { User} = useSelector((state) => state.User);
 

  const fetchRelationshipTypes = async () => {
    try {
      const response = await GetRelationshipTypes();

      setRelationshipTypes(response);
      setSelectedRelation(response[0]);
    } catch (error) {
      throw error;
    }
  };

  const GetExistsRelationship = async (UserId1, UserId2) => {
    const response = await GetUserRelationship(UserId1,UserId2);
    if(response){
      setUserRelationship(response);
      setEditMode(true);
    }
  };

  useEffect(() => {
    fetchRelationshipTypes();

    // fetch relation if exists
    GetExistsRelationship(User?.UserId,userID);
    return () => {};
  }, [location.pathname]);


  const handleRelationshipChange =(relationshipTypeName)=>{
    setUserRelationship(null);

    const selectedRelationship = relationshipTypes
    .find((r)=> r.RelationshipTypeName == relationshipTypeName);

    setSelectedRelation(selectedRelationship);
    
  }


  const AddNewRelationship = async ({
    UserId1,
    UserId2,
    RelationshipTypeId,
  }) => {
    const response = await AddUserRelationship({
      UserId1,
      UserId2,
      RelationshipTypeId,
    });
    if(response){
      setSelectedRelation(response);
      setUserRelationship(response);
      setEditMode(true);
    }
  };

  const UpdateRelationship = async (
    userId1,
    userId2,
    RelationshipTypeId,
  ) => {
    const response = await UpdateUserRelationship(
      userId1,
      userId2,{
      RelationshipTypeId
    });
    if(response){
      setSelectedRelation(response);
      setUserRelationship(response);
      setEditMode(true);
    }
  };
  
  const setRealtionshiphandler = async () => {

    if(editMode){
      // updaet
      UpdateRelationship(User?.UserId,userID,selectedRelation?.RelationshipTypeId)
    }else{
      const relationship = {
        UserId1:User?.UserId,
        UserId2:userID,
        RelationshipTypeId:selectedRelation?.RelationshipTypeId
      }

      await AddNewRelationship(relationship);
    }
    // console.log(User.UserId);
    // console.log(userID); 
    // console.log(selectedRelation.RelationshipTypeId); 
  };
  return (
    <div className="pt-10 px-2 max-w-lg m-auto flex justify-center items-center ">
      <button
        type="button"
        className="flex-1 p-0.5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2 me-2   dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Message
      </button>
      {/* if no relationship */}
      {userRelationship ?(<div className="text-sm px-3 py-2 me-2 dark:text-gray-200">{`set as a ${userRelationship?.RelationshipTypeName}`}</div>):(
      <button
        type="button"
        className="flex-1 p-0.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 me-2   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={setRealtionshiphandler}
      >
        {`Add as ${selectedRelation?.RelationshipTypeName}`}
      </button>)}
      {/* if relationship exists */}
      <div className="flex-2 min-w-40">
        <Listbox
          value={userRelationship?.RelationshipTypeName || selectedRelation?.RelationshipTypeName}
          onChange={handleRelationshipChange}
        >
          <div className="relative w-full z-50">
            {/* <Label className="block text-sm font-light mb-1  text-gray-400">Assigned to</Label> */}
            <ListboxButton className="relative min-w-40  cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span>{userRelationship?.RelationshipTypeName || selectedRelation?.RelationshipTypeName}</span>{" "}
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-400"
                />
              </span>
            </ListboxButton>

            <ListboxOptions
              transition
              className="absolute z-10  max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
              {relationshipTypes?.map((relationshipType) => (
                <ListboxOption
                  key={relationshipType.RelationshipTypeId}
                  value={relationshipType.RelationshipTypeName}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                >
                  <span>{relationshipType.RelationshipTypeName}</span>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selectedRelation])_&]:hidden">
                    <CheckIcon aria-hidden="true" className="h-5 w-5" />
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
    </div>
  );
}

export default UserActions;

"use client";
import { getGroupMembers } from "@/utils/queries/getGroupMembers";
import { data } from "autoprefixer";
import React, { useEffect } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { Message, PartRoomUser, Room, Roomuser, User, Group } from "@/type";
import { supabase } from "@/utils/supabase/client";
import { getAllUsers } from "@/utils/queries/getAllUser";

type Props = {
  children?: React.ReactElement[];
  roomObject?: Room;
};

const GroupDetials = ({ roomObject }: Props) => {
  // const fetchAllUsers = async () => {
  //   const { data, error } = await supabase.from("user").select();
  //   if (data) {
  //     console.log("this are all users", data);
  //   }
  // };

  useEffect(() => {
    // fetchAllUsers();
    getGroupMembers(roomObject?.id as string)
      .then(async (membersIds) => {
        if (membersIds?.length) {
          // console.clear();
          console.log("the member of selected group: ", membersIds);
          // setGroupMembersIds(membersIds);
          // setSignup Users
        }
      })
      .catch((err: any) => {
        if (err instanceof Error) console.error(err);
      });

    console.log("groupMembers: ", getGroupMembers);
  }, []);

  return (
    <div>
      <div className="flex flex-col bg-white">
        <p className="m-4">2 Members</p>
        <button className="hover:bg-slate-200 flex items-center p-4 gap-2">
          <span className="bg-themecolor text-white p-2 rounded-[50%]">
            {" "}
            <IoMdPersonAdd size={25} />{" "}
          </span>
          Add member
        </button>
      </div>
    </div>
  );
};

export default GroupDetials;

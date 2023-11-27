"use client";
import {
  getGroupMembers,
  getMembersInGroup,
} from "@/utils/queries/getGroupMembers";
import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { Message, PartRoomUser, Room, Roomuser, User, Group } from "@/type";
import { supabase } from "@/utils/supabase/client";
import { getAllUsers } from "@/utils/queries/getAllUser";
import Avatar from "../Avatar";
import { LOCAL_STORAGE } from "@/utils/service/storage";

type Props = {
  children?: React.ReactElement[];
  roomObject?: Room;
};

interface UserObject {
  created_at: string;
  email: string;
  id: string;
  image: string;
  name: string;
  phone: string | null;
  created_by: string;
}

const GroupDetials = ({ roomObject }: Props) => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [groupMember, setGroupMembers] = useState<Array<UserObject>>([]);

  const [currentUser, setCurrentUser] = useState();

  const fetchAllUsers = async () => {
    const { data, error } = await supabase.from("user").select();
    if (data) {
      setUsers(data);
      // console.log("this are all users", data);
      return data;
    }
  };

  useEffect(() => {
    fetchAllUsers();
    getMembersInGroup(roomObject?.id as string)
      .then(async (membersIds) => {
        if (membersIds?.length) {
          // setMemberid(memberid);
          // console.clear();
          // console.log("the member of selected group: ", membersIds);

          const { data, error } = await supabase
            .from("user")
            .select()
            .in("id", membersIds);
          if (data) {
            setGroupMembers(data);
            console.log("group members#######", data);
          }
        }
      })
      .catch((err: any) => {
        if (err instanceof Error) console.error(err);
      });
    setCurrentUser(LOCAL_STORAGE.get("sender").id);
    // console.log("groupMembers: ", getGroupMembers);
  }, []);

  return (
    <div>
      <div className="flex flex-col bg-white max-h-screen ">
        <p className="m-4">{groupMember.length} Members</p>
        <button className="hover:bg-slate-200 flex items-center p-4 gap-2">
          <span className="bg-themecolor text-white p-2 rounded-[50%]">
            {" "}
            <IoMdPersonAdd size={25} />{" "}
          </span>
          Add member
        </button>

        {groupMember?.map((user, index) => (
          <div key={index} className="flex justify-between p-4">
            <div className="flex gap-3">
              <Avatar
                profilePicture={user.image}
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
                size={8}
              />
              <p>{user.name}</p>
            </div>
            <div>
              <p
                className={`${
                  user.id === user.created_by ? "visible" : "hidden"
                } bg-[#e7fce3] h-5 px-2 text-xs rounded items-center text-[#2f652b]`}
              >
                Group Admin
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupDetials;

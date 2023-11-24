"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import { supabase } from "@/utils/supabase/client";
// import fetchUsers from "@/utils/queries/fetchUsers";
import fetchSingleUser from "@/utils/queries/fetchSingleUser";
import { PartRoomUser, User, Group, Room } from "@/type";
import { useWhatSappContext } from "./context";
import { useProfileContext } from "./context/profileContext";
import fetchSingleRoom from "@/utils/queries/fetchSingleRoom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import fetchGroupsOfSingleUser from "@/utils/queries/fetchGroupsOfSingleUser";
import getAllGroupsPerUser from "@/utils/queries/getAllGroups";
import { AiOutlineConsoleSql } from "react-icons/ai";

import { IoIosClose } from "react-icons/io";

type Props = {
  className?: string;
  users: User[];
  groups: Group[];
  setReceiver: React.Dispatch<React.SetStateAction<User | undefined>>;
  setRoomObject: (room: User) => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setRecipient: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const DirectMessage = ({
  className,
  users,
  setReceiver,
  setRoomObject,
  setUsers,
  groups,
  setRecipient,
}: Props) => {
  // to style the select room
  const [target, setTarget] = useState("");
  const [fetchedGroups, setFetchedGroups] = useState<
    Promise<any> | undefined
  >();
  dayjs.extend(relativeTime);

  // console.log(users);

  const { setStart } = useWhatSappContext();
  const { openProfile } = useProfileContext();

  const handleDirectMessage = async (id: string) => {
    console.log(id);
    let data: User = (await fetchSingleUser(id)) as User;
    console.log("test after fetchsingleUser", data);

    setRecipient(data);
    setStart(true);
    setTarget(id);
    let room: User = (await fetchSingleRoom(id)) as User;
    setRoomObject(room);
    setReceiver(room);
    console.log("single room object", room);
  };

  const handleClick = () => {
    // console.log('updated_at', users[0].updated_at)
    // const lastMsg = dayjs().to(dayjs(users[0].updated_at))
    // console.log("time from dayjs", lastMsg);
  };

  const removeMember = (id: string) => {
    const filteredMembers = users.filter((member) => member.id !== id);
    setUsers(filteredMembers);
  };

  return (
    <div className={` ${openProfile ? "hidden" : className} `}>
      {users.reverse().length ? (
        <div className="flex gap-2 p-0 w-full h-[85vh] flex-col">
          {users?.map((item: any) => (
            <div
              onClick={() => handleDirectMessage(item.user_id)}
              key={item.id}
              className={
                target === item.user_id
                  ? "bg-gray-300 flex w-full justify-between border-b border-slate-100 py-1 gap-1 hover:cursor-pointer px-4 items-center "
                  : "flex w-full justify-between border-b border-slate-100  gap-1 hover:bg-gray-100 hover:cursor-pointer px-4 py-1 items-center "
              }
            >
              <div className="flex items-center gap-3 ">
                <Avatar
                  onClick={() => handleClick()}
                  profilePicture={
                    item.image !== ""
                      ? `${item.image}`
                      : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                  }
                  size={10}
                  className="my-auto"
                />
                <div className="leading-2 ">
                  {item.name !== "" ? (
                    <h6 className="py-1 text-[#111011] font-semibold ">
                      {item.name}
                    </h6>
                  ) : (
                    <p className="py-1 text-[#111011] font-medium">
                      {item.email}
                    </p>
                  )}

                  <span className="py-8 text-[14px]">
                    Hey there i'm using whatsapp.
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 w-[70px]">
                <span className="mx-auto ">
                  {dayjs().to(dayjs(item?.updated_at))}
                </span>
                <button
                  className="hover:bg-gray-300 rounded-full w-fit self-center"
                  onClick={() => removeMember(item.id)}
                >
                  <IoIosClose size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default React.memo(DirectMessage);

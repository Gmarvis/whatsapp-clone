"use client";
import React, { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import fetchSingleUser from "@/utils/queries/fetchSingleUser";
import { Message, User } from "@/type";
import { Message, User } from "@/type";
import { useWhatSappContext } from "./context";
import { useProfileContext } from "./context/profileContext";
import fetchSingleRoom from "@/utils/queries/fetchSingleRoom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { updateReadMessageStatus } from "../utils/queries/updateReadMessageStatus";
import { updateUnreadMessageCount } from "@/utils/queries/updateUnreadMessageCount";
import { supabase } from "@/utils/supabase/client";
import { swap } from "@/utils/queries/fetchSignupUser";

type Props = {
  className?: string;
  users: User[];
  setReceiver: React.Dispatch<React.SetStateAction<User | undefined>>;
  setRoomObject: (room: User) => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setRecipient: React.Dispatch<React.SetStateAction<User | undefined>>;
  lastMessage: Message;
  currentUserRoomId: string;
};

const DirectMessage = ({
  className,
  users,
  setReceiver,
  setRoomObject,
  setUsers,
  setRecipient,
  lastMessage,
  currentUserRoomId,
}: Props) => {
  // to style the select room
  const [target, setTarget] = useState<string>("");
  const [discussions, setDiscussons] = useState<User[]>([]);

  dayjs.extend(relativeTime);

  // console.log(users);

  const { setStart } = useWhatSappContext();
  const { openContactInfo, setOpenContactInfo } = useWhatSappContactContext();
  const { openProfile } = useProfileContext();
  const [userData, setUserData] = useState<Array<User>>();

  const handleDirectMessage = async (user_id: string) => {
    console.log(user_id);
    let data: User = (await fetchSingleUser(user_id)) as User;
    console.log("test after fetchsingleUser", data);

    setRecipient(data);
    setClicked((prev) => !prev);
    setStart(true);
    setTarget(user_id);
    let room: User = (await fetchSingleRoom(user_id)) as User;
    setRoomObject(room);
    setReceiver(room);
    console.log("single room object", room);
    const updateMessage = await updateReadMessageStatus(
      lastMessage?.sender_id,
      room.id as string
    );
  };

  const handleClick = () => {
    // console.log('updated_at', users[0].updated_at)
    // const lastMsg = dayjs().to(dayjs(users[0].updated_at))
    // console.log("time from dayjs", lastMsg);
  };

  let lastRecievedMessage = "";

  const unreadMessages = supabase
    .channel("custom-insert-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "unread_messages" },
      async (payload: any) => {
        console.log("Change received from unread_message table!", payload);

        // const ndex = users?.findIndex(
        //   (user: User) => user.user_id === payload.new.sender_id
        // );
        // if (ndex !== -1) users = swap(users, 0, ndex);

        const index = users?.findIndex(
          (user: User) =>
            user.user_id === payload.new.sender_id &&
            payload.new.receiver_room_id === currentUserRoomId
        );
        if (index !== -1) {
          console.log("trying to swap", payload);
          users[index] = {
            ...users[index],
            unread_count: payload.new.unread_count,
          };
          users[0] = users.splice(index, 1, users[0])[0];
          setUsers(users);
        }
      }
    )
    .subscribe();
  return (
    <div className={` ${openProfile ? "hidden" : className} `}>
      {users.length ? (
        <div className="flex gap-2 p-0 w-full h-[85vh] flex-col">
          {discussions?.map((discussion: any) => {
            lastRecievedMessage =
              discussion.user_id === lastMessage?.sender_id
                ? lastMessage.content
                : "";
            return (
              <div
                onClick={() => handleDirectMessage(discussion.user_id)}
                key={discussion.id}
                className={
                  target === discussion.user_id
                    ? "bg-gray-300 flex w-full justify-between border-b border-slate-100 py-1 gap-1 hover:cursor-pointer px-4 items-center "
                    : "flex w-full justify-between border-b border-slate-100  gap-1 hover:bg-gray-100 hover:cursor-pointer px-4 py-1 items-center "
                }
              >
                <div className="flex items-center gap-3 ">
                  <Avatar
                    onClick={() => handleClick()}
                    profilePicture={
                      discussion.image !== ""
                        ? `${discussion.image}`
                        : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                    }
                    size={10}
                    className="my-auto"
                  />
                  <div className="leading-2 ">
                    {discussion.name !== "" ? (
                      <h6 className="py-1 text-sm text-[#212021] ">
                        {discussion.name}
                      </h6>
                    ) : (
                      <p className="py-1 text-xs text-[#111011] font-normal">
                        {discussion.email}
                      </p>
                    )}

                    <span className="py-8 text-[14px]">
                      {lastRecievedMessage}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-[70px]">
                  <span className="mx-auto text-[#1FA855]">
                    {dayjs().to(dayjs(discussion?.updated_at))}
                  </span>
                  <span className=" p-[5px] w-6 h-6 min-w-fit min-h-fit rounded-full    bg-[#25c460] text-white text-[14px] font-[SF Pro Text] flex justify-center items-center">
                    {discussion.unread_count ?? 0}
                  </span>
                  {/* <button
                  className="hover:bg-gray-300 rounded-full w-fit self-center"
                  onClick={() => removeMember(item.id)}
                >
                  <IoIosClose size={20} />
                </button> */}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default React.memo(DirectMessage);
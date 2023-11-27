"use client";
import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Avatar from "../Avatar";
import { useWhatSappContext } from "@/components/context";
import { User } from "@/type";

type Props = {
  children: React.ReactElement;
  // title: string;
};

const ShowProfilePicture = (props: Props) => {
  const { setShowPPicture } = useWhatSappContext();
  const sender: User = JSON.parse(localStorage.getItem("sender") || "{}");

  return (
    <div className="relative w-[100vw] h-screen bg-whatsappimg z-0 cursor-pointer overflow-hidden">
      <div className="flex items-center bg-bgGray max-h-16 justify-between w-full h-max-5 px-5 pr-10 py-2 ">
        <div className="flex gap-3 w-full cursor-pointer">
          <Avatar
            onClick={() => {}}
            profilePicture={
              sender.image !== ""
                ? `${sender.image}`
                : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
            }
            size={10}
          />
          <div>
            {sender?.name !== "" ? (
              <h4 className="text-gray-700">{sender?.name}</h4>
            ) : (
              <h4 className="text-gray-700">{sender?.email}</h4>
            )}
            {sender?.phone !== "" ? (
              <p className="text-gray-500 text-xs">{sender?.phone}</p>
            ) : (
              <p className="text-gray-500 text-xs">{sender?.email}</p>
            )}
          </div>
        </div>

        <div className="flex gap-5">
          <button
            className="text-2xl text-gray-600"
            onClick={() => setShowPPicture(false)}
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default ShowProfilePicture;

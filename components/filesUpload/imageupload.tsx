"use client";
import React, { useState } from "react";
import { useWhatSappContext } from "../context";
import { IoMdClose } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";
import Image from "next/image";

import { supabase } from "@/utils/supabase/client";
import { Message, User } from "@/type";
import { toast, ToastContainer } from "react-toastify";

type Props = {
  currentUser: User;
  receiver: User;
  publicUrl: string;
};

const Imageupload = ({ currentUser, receiver, publicUrl }: Props) => {
  if (typeof localStorage === "undefined") return;

  const { openImage, setOpenImage } = useWhatSappContext();
  const [message, setMessage] = useState<string>("");
  // const [receiver, setReceiver] = useState<User>(() =>
  //   JSON.parse(localStorage.getItem("reciever") || "{}")
  // );
  // const [currentUser, setCurrentUser] = useState<User>(() =>
  //   JSON.parse(localStorage.getItem("sender") || "{}")
  // ); // state containing the user info

  const handleClose = () => {
    setOpenImage(null);
  };

  const sendMessageToDB = async () => {
    console.log("current user", currentUser?.id);
    console.log("receiver_room_id", receiver?.id);
    console.log("message", message);
    if (message === "" || !receiver?.id) {
      toast.warning("Field cannot be empty", {
        autoClose: 1000,
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      console.log("message or receiver of the message can not be empty");
      return;
    }

    const sendingMessage: Message = {
      sender_id: currentUser.id as string,
      receiver_room_id: receiver?.id as string,
      content: publicUrl,
      sender_name: currentUser?.name,
      phone_number: currentUser?.phone as string,
    };
    console.log("receiver_room_id", receiver?.id);
    console.log("message", message);

    const { error } = await supabase.from("messages").insert(sendingMessage);

    if (error) console.log("error inserting messages: ", error);
    setMessage("");
  };
  // console.log(message);

  const handlekeydown = async (event: any) => {
    if (event.key === "Enter") await sendMessageToDB();
  };

  return (
    <div className="relative bg-gray-50 h-[100vh]">
      <div className="bg-gray-100 py-4 px-4">
        <IoMdClose
          onClick={handleClose}
          className="w-[30px] h-[30px] bg-gray-500 font-bold text-white rounded"
        />
      </div>
      <Image
        src={openImage}
        alt=""
        width={500}
        height={500}
        className="flex items-center justify-center left-5 right-5 top-5 bottom-5"
      />
      <div className="absolute  inset-x-0 bottom-0 flex bg-white items-center rounded-md gap-5 p-1 w-full">
        <input
          type="text"
          className="w-full my-2 outline-none text-gray-600 px-3 "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          onKeyDown={handlekeydown}
        />
        <button className="text-2xl " onClick={sendMessageToDB}>
          <IoSendSharp />
        </button>
      </div>
    </div>
  );
};

export default Imageupload;

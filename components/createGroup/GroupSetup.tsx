"use client";
// import React from "react";
import { FaCheckCircle } from "react-icons/fa";
// import ProfilePageContent from "../profilPage/ProfilePageContent";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import CardWithoutTitle from "../CardWithoutTitle";
import { AiOutlineCheck } from "react-icons/ai";
import { FaRegLaugh } from "react-icons/fa";
// import EmojiePicker from "./EmojiePicker";
import Image from "next/image";
// import { useWhatSappContext } from "../context";
import EmojiePicker from "../profilPage/EmojiePicker";
import { IoIosArrowForward } from "react-icons/io";
import { VscPassFilled } from "react-icons/vsc";
import CreateGroup from "./CreateGroup";
import { LOCAL_STORAGE } from "@/utils/service/storage";
import { supabase } from "@/utils/supabase/client";
import { data } from "autoprefixer";
import { RealtimeChannel } from "@supabase/supabase-js";
import CardWithoutTitleB from "./CardWithoutTitleB";
import { useProfileContext } from "../context/profileContext";
import { useWhatSappContext } from "@/components/context";

const GroupSetup = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showInput1, setShowInput1] = useState<boolean>(false);
  const [shosenEmojiesup, setShosenEmojiesup] = useState<string[]>([]);
  const [shosenEmojiesdow, setShosenEmojiesdow] = useState<string[]>([]);

  // * change the name david beckamp by the user name
  const [profileName, setProfileName] = useState<string>("");
  const [profileDescription, setProfileDescription] = useState<string>("");
  const [showDropdrownProfile, setShowDropdownProfile] = useState(false);

  const { groupIcon, profileImage, setAddedGroup } = useWhatSappContext();
  const { showCreateGroup, setShowCreateGroupe } = useProfileContext();

  // const { groupIcon, setGroupIcon } = useWhatSappContext();

  const dropdownRef = useRef<HTMLUListElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const getShosenEmojieup = (emojie: any) => {
    if (emojie?.explicitOriginalTarget?.src)
      setShosenEmojiesup((shosenEmojies) => [
        ...shosenEmojies,
        emojie?.explicitOriginalTarget?.src,
      ]);
  };

  const getShosenEmojiedow = (emojie: any) => {
    if (emojie?.explicitOriginalTarget?.src)
      setShosenEmojiesdow((shosenEmojies) => [
        ...shosenEmojies,
        emojie?.explicitOriginalTarget?.src,
      ]);
  };

  const handleClickonEmpty = (event: any): void => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdownProfile(false);
    }
  };

  useEffect(() => {
    if (ref.current !== null)
      ref.current.addEventListener("click", handleClickonEmpty);

    return () => ref.current?.removeEventListener("click", handleClickonEmpty);
  }, []);

  interface User {
    created_at: string;
    email: string;
    id: string;
    image: string;
    name: string;
    phone: null;
  }

  type GroupData = [
    {
      created_at: string;
      group_icon: string;
      id: string;
      name: string;
      updated_at: string;
      user_id: string;
    }
  ];

  // handle create group
  let subscription: RealtimeChannel;
  const handleCreateGroup = async () => {
    const groupMembers = LOCAL_STORAGE.get("group_members");
    const currentUser = LOCAL_STORAGE.get("sender");
    const senderId = currentUser.id;
    const membersID = groupMembers.map((member: User) => member.id);

    const { data, error } = await supabase
      .from("rooms")
      .insert([
        {
          name: profileName,
          // user_id: senderId,
          image: groupIcon,
          status: true,
        },
      ])
      .select();

    if (error) {
      console.log("An error occured while creating group", error);
      return;
    }
    console.log("data: ", data);

    if (data) {
      const groupID = data[0].id;

      const groupData = Promise.all(
        membersID.map(async (ID: string) => {
          const { data, error } = await supabase
            .from("roomuser")
            .insert([{ room_id: groupID, user_id: ID }])
            .select();

          if (error) {
            return error;
          }

          return data;
        })
      );
      groupData
        .then((data) => {
          setAddedGroup(true);
        })
        .catch((error) => {
          console.log(error);
        });
      console.clear();
      console.log("data: ", data);
      console.log("data[0].id: ", data[0].id);
      console.log("groupData: ", groupData);
      setShowCreateGroupe(false);
    }
  };

  return (
    <div
      ref={ref}
      className="relative p-0 bg-bgGray text-[14px] h-[80vh] border-r border-r-[[#444e54]] "
    >
      {/* //** add profile image and profile name here  */}
      <CardWithoutTitleB
        image={
          groupIcon ||
          "https://i.pinimg.com/564x/cb/9d/bb/cb9dbbffa2363a2ec0d7a74602b91cd4.jpg"
        }
        ref={dropdownRef}
      />

      <div className=" rest">
        <div className=" flex flex-col gap-2 w-full pl-7 px-7  py-3  shadow shadow-zinc-200 bg-white">
          <div className=" flex items-center gap-3">
            <span className=" inline-flex items-center">
              {shosenEmojiesup?.map((emoji, index) => (
                <Image
                  src={emoji}
                  alt="emojie"
                  width={20}
                  height={20}
                  key={index}
                />
              ))}
            </span>
          </div>

          <div className="flex justify-between items-center mt-5 pb-[5px] border-solid border-b-2 border-b-[#778086]">
            <input
              type="text"
              className="inputprofile w-full pl-0 px-2 py-0 text-[#242f36] text-md focus:outline-none focus:ring-none focus:border-none"
              onChange={(e) => setProfileName(e.target.value)}
              value={profileName}
              placeholder="Group Subject (Optional)"
            />

            <div className=" flex justify-center items-center text-[#778086]">
              <span className=" mr-2 cursor-pointer">
                <EmojiePicker
                  getShosenEmojie={getShosenEmojieup}
                  placement="right"
                />
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full pb-10">
          <button
            className="flex self-center p-4 text-themecolor"
            onClick={handleCreateGroup}
          >
            <VscPassFilled size={50} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupSetup;

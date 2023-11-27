import React, { forwardRef, useEffect, useRef, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import CardWithoutTitle from "../CardWithoutTitle";
import { AiOutlineCheck } from "react-icons/ai";
import { FaPhone } from "react-icons/fa6";
import EmojiePicker from "./EmojiePicker";
import Image from "next/image";
import { useWhatSappContext } from "../context";
import updateUserName from "@/utils/queries/updateUserName";
import { IoMdClose } from "react-icons/io";

import updatePhoneNumber from "@/utils/queries/updatephoneNumber";
import { User } from "@/type";
import { LOCAL_STORAGE } from "@/utils/service/storage";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ProfilePageContent = () => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showInput1, setShowInput1] = useState<boolean>(false);
  const [shosenEmojiesup, setShosenEmojiesup] = useState<string[]>([]);
  const [shosenEmojiesdow, setShosenEmojiesdow] = useState<string[]>([]);

  const sender: User = JSON.parse(localStorage.getItem("sender") || "{}");
  const [profileName, setProfileName] = useState<string>(sender.name);
  const [phone, setPhone] = useState<string | undefined>(sender?.phone);
  const [showDropdrownProfile, setShowDropdownProfile] = useState(false);

  const { profileImage, profilepict } = useWhatSappContext();

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

  const currentUser = LOCAL_STORAGE.get("sender");

  useEffect(() => {
    if (ref.current !== null)
      ref.current.addEventListener("click", handleClickonEmpty);

    return () => ref.current?.removeEventListener("click", handleClickonEmpty);
  }, []);

  const handleUpdateName = (name: string) => {
    if (name !== "") {
      updateUserName(name)
        .then((res) => {
          toast.success("Updated successfully", { autoClose: 1500, position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err)
          toast.error('Failed to update name', { autoClose: 1500, position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
        })
      console.log("profile name", profileName);
      setShowInput1((prev) => !prev);
    } else {
      toast.error('Field cannot be empty', { autoClose: 1500, position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
    }
  };

  const handleUpdatePhone = (phone: string | undefined) => {
    setShowInput((prev) => !prev)
    if (phone === "") {
      toast.error('Field cannot be empty', { autoClose: 2000, position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
    } else {
      updatePhoneNumber(phone)
        .then((res) => {
          toast.success("Updated successfully", { autoClose: 2000, position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err)
        })
    }

  }

  return (
    <div
      ref={ref}
      className="relative p-0 bg-bgGray text-[14px] h-full border-r border-r-[[#444e54]] "
    >
      {/* //** add profile image and profile name here  */}
      <CardWithoutTitle
        image={
          currentUser?.image ||
          "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
        }
        ref={dropdownRef}
      />
      <ToastContainer />
      <div className=" rest">

        <div className=" flex flex-col gap-2 w-full pl-7 px-7  py-3  shadow shadow-zinc-200 bg-white">
          <div className=" flex items-center gap-3">
            <span className=" text-[#33a033]">Your name</span>
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

          {!showInput1 ? (
            <div className=" flex justify-between items-center mt-5">
              <span className=" text-[#444e54]">{profileName}</span>

              <span
                className=" italic text-[10px] font-thin text-black cursor-pointer"
                onClick={() => setShowInput1((prev) => !prev)}
              >
                <RiPencilFill size={25} color="#54656f" />
              </span>
            </div>
          ) : (
            <div className="flex justify-between items-center mt-5 pb-[5px] border-solid border-b-2 border-b-[#778086]">
              <input
                type="text"
                className="inputprofile w-full pl-0 px-2 py-0 text-[#242f36] text-md focus:outline-none focus:ring-none focus:border-none"
                onChange={(e) => setProfileName(e.target.value)}
                value={profileName}
              />

              <div className=" flex justify-center items-center text-[#778086]">

                <span className=" mr-2 cursor-pointer">
                  <EmojiePicker
                    getShosenEmojie={getShosenEmojieup}
                    placement="right"
                  />
                </span>
                <div>
                  <span
                    className=" mr-0 cursor-pointer hover:bg-gray-300 rounded-full w-fit self-center"
                    onClick={() => handleUpdateName(profileName)}
                  >
                    <AiOutlineCheck size={23} />
                  </span>

                </div>
                <span
                  className=" mr-0 cursor-pointer hover:bg-gray-300 rounded-full w-fit self-center"
                  onClick={() => setShowInput1((prev) => !prev)}
                >
                  <IoMdClose size={23} />
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="bg-bgGray px-7 pt-4 pb-5">
          <p>
            This is not your username but the one that will be visible to other
            users.
          </p>
        </div>
        <div className=" flex flex-col gap-4 w-full px-7 py-3 shadow shadow-zinc-200 bg-white">
          <div className=" flex items-center gap-3">
            <span className=" text-[#33a033]">Phone</span>
            <span className=" inline-flex items-center">
              {shosenEmojiesdow?.map((emoji, index) => (
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

          {!showInput ? (
            <div className="flex justify-between align-baseline">
              <div className="flex align-baseline gap-6 ">
                <FaPhone size={20} />
                {phone ? <p className="text-sm">{phone}</p> : <p className="text-sm">(+237)</p>}
              </div>
              <span
                className=" italic text-[10px] font-thin text-black cursor-pointer"
                onClick={() => setShowInput((prev) => !prev)}
              >
                <RiPencilFill size={25} color="#54656f" />
              </span>
            </div>
          ) : (
            <div className=" flex justify-between items-center pb-[5px] border-solid border-b-2 border-b-[#778086]">
              <input
                type="text"
                className="inputprofile w-full pl-0 px-2 py-0 text-[#242f36] text-md focus:outline-none focus:ring-none focus:border-none"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
              <div className=" flex justify-center items-center text-[#778086]">
                <div>
                  <span
                    className=" mr-0 cursor-pointer hover:bg-gray-300 rounded-full w-fit self-center"
                    onClick={() => handleUpdatePhone(phone)}
                  >
                    <AiOutlineCheck size={23} />
                  </span>
                  {/* <ToastContainer /> */}
                </div>
                <span
                  className=" mr-0 cursor-pointer hover:bg-gray-300 rounded-full w-fit self-center"
                  onClick={() => setShowInput((prev) => !prev)}
                >
                  <IoMdClose size={23} />
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="bg-bgGray px-7 pt-4 pb-5"></div>
      </div>
    </div>
  );
};

export default ProfilePageContent;
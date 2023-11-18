"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Avatar from "../../components/Avatar";
import { MdGroups2 } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import DropDown from "../../components/mainLayoutPage/DropDown";
import {
  dropdownRight,
  dropdownLeft,
} from "../../utils/data/mainpageDropdownLists";
import DropDownR from "../../components/mainLayoutPage/DropdownR";
import { useWhatSappContext } from "@/components/context";
import SideNavRight from "../../components/RightSideBar/SideNavRight";
import SearchField from "../../components/RightSideBar/SearchField";
import SenderMessages from "@/components/mainLayoutPage/Messages/SenderMessage";
import ReceiverMessages from "@/components/mainLayoutPage/Messages/ReceiverMessage";
import Messages from "@/components/mainLayoutPage/Messages/Message";
import ContactInfoPage from "../../components/RightSideBar/ContactInfoPage";
import { useWhatSappContactContext } from "../../components/context/Context";
import ProfilePage from "../../components/profilPage/ProfilePage";
import ProfilePageContent from "../../components/profilPage/ProfilePageContent";
import { useProfileContext } from "../../components/context/profileContext";
import ShowProfilePicture from "@/components/profilPage/ShowProfilePicture";
import Image from "next/image";
import UploadPicture from "@/components/profilPage/UploadPicture";
import { supabase } from "@/utils/supabase/client";
import { RiContactsBookLine } from "react-icons/ri";
import DirectMessage from "@/components/directMessage";
import fetchUsers from "@/utils/queries/fetchUsers";
import fetchSignupUser from "@/utils/queries/fetchSignupUser";
import insertUsersInRooms from "@/utils/queries/insertUsersInRooms";
import { Message, User } from "@/type";
import { getMessages } from "@/utils/queries/getMessage";
import CreateGrt from "@/components/profilPage/CreateGrt";
import CreateGroup from "@/components/createGroup/CreateGroup";

const Discossions = () => {
  if (typeof localStorage === "undefined") return;

  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<any>("");
  const [rooms, setRooms] = useState<Promise<any[] | undefined>[]>([]);
  const [currentUser, setCurrentUser] = useState<User>(() =>
    JSON.parse(localStorage.getItem("sender") || "{}")
  ); // state containing the user info
  const [showDropdrownleft, setShowDropdownleft] = useState<boolean>(false);
  const [allRooms, setAllRooms] = useState<User>();
  const [roomObject, setRoomObject] = useState<User>();
  const [sendingMessage, setSendingMessage] = useState<string[]>([]);
  const [receivingMessage, setReceivingMessage] = useState<string[]>([]);
  const [showDropdrownright, setShowDropdownright] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<User>();
  const [showDropdrownBottonL, setShowDropdrownBottonL] =
    useState<boolean>(false);
  const [discussionsMessages, setDiscussionsMessages] = useState<any[]>([]);
  const [showMessageEmoji, setMessageEmoji] = useState<boolean>(false);
  const { showCreateGroup, setShowCreateGroupe } = useProfileContext();

  const {
    setOpenSideNav,
    openSideNav,
    showPPicture,
    importPict,
    profilepict,
    start,
  } = useWhatSappContext();
  const { openContactInfo, setOpenContactInfo } = useWhatSappContactContext();
  const { openProfile, setOpenProfile } = useProfileContext();

  const dropdownRef = useRef<HTMLUListElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutSide = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdownleft(false);
      setShowDropdownright(false);
      setShowDropdrownBottonL(false);
      setMessageEmoji(false);
    }
    if (emojiRef.current && !emojiRef.current.contains(event.target)) {
      console.log("emoji component is clicked");
      setMessageEmoji(false);
    }
  };

  useEffect(() => {
    fetchSignupUser()
      .then((data) => setCurrentUser(data))
      .catch((err) => {
        if (err instanceof Error) console.error(err);
      });
    fetchUsers()
      .then((users) => {
        if (users) setUsers(users);
      })
      .catch((err) => {
        if (err instanceof Error) console.error(err);
      });
    insertUsersInRooms(users)
      .then((data) => {
        if (data) setRooms(data);
      })
      .catch((err) => {
        if (err instanceof Error) console.error(err);
      });

    if (ref.current !== null)
      ref.current.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, []);

  useEffect(() => {
    setDiscussionsMessages([]);
    getMessages(currentUser?.id as string, receiver?.id as string)
      .then((messages: any) => {
        if (messages.length) {
          console.log("all messages: ", messages);
          setDiscussionsMessages(messages);
        } else {
          setDiscussionsMessages([]);
        }
      })
      .catch((err) => {
        if (err instanceof Error) console.error(err);
      });
  }, [receiver?.id]);

  const sendMessageToDB = async () => {
    const sendingMessage: Message = {
      sender_id: currentUser.id as string,
      receiver_id: receiver?.id as string,
      content: message,
    };

    console.log("message to send: ", sendingMessage);

    const { error } = await supabase.from("messages").insert(sendingMessage);
    if (error) console.log("error inserting messages: ", error);
    setMessage("");
  };

  const handlekeydown = async (event: any) => {
    if (event.key === "Enter") await sendMessageToDB();
  };

  const messages = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "messages" },
      (payload: any) => {
        console.log("Change received!", payload);
        if (payload.eventType === "UPDATE") {
          const newIndex: number = discussionsMessages?.findIndex(
            (message: any) => message.id === payload.new.id
          );
          discussionsMessages[newIndex].emoji = payload.new.emoji;
          setDiscussionsMessages(discussionsMessages);
        }
        if (payload.eventType === "INSERT") {
          setDiscussionsMessages((prev) => [...prev, payload.new]);
        }
      }
    )
    .subscribe();

  // console.log("sent messages: ", sendingMessage);
  // console.log("received messages: ", receivingMessage);
  //  if (payload.eventType === "UPDATE") {
  //    setDiscussionsMessages(discussionsMessages);
  //  }
  //  if (payload.eventType === "INSERT") {
  //    setDiscussionsMessages((prev) => [...prev, payload.new]);
  //  }

  return (
    <div className="overflow-hidden">
      {showPPicture ? (
        <ShowProfilePicture>
          <div className=" w-full h-full bg-white/90 flex flex-col justify-start pt-20  items-center z-100">
            <Image
              src={
                currentUser.image ||
                "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
              }
              alt=""
              width={400}
              height={500}
            />
          </div>
        </ShowProfilePicture>
      ) : (
        <>
          <UploadPicture />
          <div className={importPict ? "hidden" : "flex w-full "}>
            <div className="bg-white w-[25vw] h-screen">
              <ProfilePage title="Profil">
                <ProfilePageContent />
              </ProfilePage>
              <div
                className={
                  openProfile || importPict
                    ? "hidden"
                    : "flex items-center max-h-16 justify-between bg-bgGray w-full h-max-5 px-3 py-2 border-r z-0 top-0 fixed"
                }
              >
                <Avatar
                  onClick={() => setOpenProfile(true)}
                  profilePicture={
                    currentUser.image !== ""
                      ? `${currentUser.image}`
                      : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                  }
                  size={10}
                />

                <div className="flex gap-5">
                  <button className="text-2xl text-gray-600">
                    <MdGroups2 />
                  </button>
                  <button
                    className="text-2xl text-gray-600 relative rounded-full"
                    onClick={() => setShowDropdownleft((prev) => !prev)}
                  >
                    <HiDotsVertical />
                  </button>

                  {showDropdrownleft && (
                    <DropDown dropdownList={dropdownLeft} ref={dropdownRef} />
                  )}
                </div>
              </div>


              <DirectMessage
                users={users}
                setReceiver={setReceiver}
                className="overflow-scroll overscroll-y-contain h-fit "
                setRoomObject={setRoomObject}
              />
            </div>

            <div
              ref={ref}
              className={
                openSideNav || openContactInfo
                  ? `relative w-[50vw] ${
                      !start
                        ? "bg-whatsappdashimg bg-no-repeat bg-cover"
                        : "bg-whatsappimg pb-10"
                    }  border-r border-r-gray-300 z-0`
                  : `relative w-[75vw] bg-whatsappdashimg z-0 pb-10 ${
                      !start
                        ? "bg-whatsappdashimg bg-no-repeat bg-cover"
                        : "bg-whatsappimg"
                    }`
              }
            >
              <div
                className={
                  !start
                    ? "hidden"
                    : "flex items-center bg-bgGray max-h-16 justify-between w-full h-max-5 px-3 py-2 cursor-pointer fixed top-0 z-10"
                }
              >
                <div
                  className="flex gap-3 w-full cursor-pointer"
                  onClick={() => setOpenContactInfo(true)}
                >
                  <Avatar
                    onClick={() => setOpenContactInfo(true)}
                    profilePicture={
                      receiver?.image ||
                      "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                    }
                    size={10}
                  />
                  <div>
                    <h4 className="text-gray-700">{receiver?.name}</h4>
                    <p className="text-gray-500 text-xs">
                      {receiver?.phone || receiver?.email}
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <button
                    className="text-2xl text-gray-600"
                    onClick={() => setOpenSideNav(true)}
                  >
                    <GoSearch />
                  </button>
                  <button
                    className="text-2xl text-gray-600"
                    onClick={() => setShowDropdownright((prev) => !prev)}
                  >
                    <HiDotsVertical />
                  </button>
                  {showDropdrownright && (
                    <DropDown dropdownList={dropdownRight} ref={dropdownRef} />
                  )}
                </div>
              </div>

              <div className="w-full mt-10 px-10 h-full overflow-y-auto z-0">
                {discussionsMessages.length ? (
                  <Messages
                    messageList={discussionsMessages}
                    currentUser={currentUser}
                    receiver={receiver as User}
                    ref={emojiRef}
                    showMessageEmoji={showMessageEmoji}
                    setMessageEmoji={setMessageEmoji}
                  />
                ) : (
                  ""
                )}
              </div>

              <div
                className={
                  !start
                    ? "hidden"
                    : openSideNav || openContactInfo
                    ? "  w-[50vw] flex items-center bg-bgGray h-[] fixed bottom-0 py-2 px-5 gap-5 z-0"
                    : "w-[75vw] flex items-center bg-bgGray h-[] fixed bottom-0 py-2 px-5 gap-5 z-0"
                }
              >
                {showDropdrownBottonL && <DropDownR ref={dropdownRef} />}
                <BsEmojiSmile className="text-2xl text-gray-700" />
                <button
                  type="button"
                  onClick={() => {
                    setShowDropdrownBottonL((prev) => !prev);
                    console.log("clicked third");
                  }}
                  className={
                    showDropdrownBottonL
                      ? " bg-zinc-400 rounded-full transition-opacity-1 duration-150 ease-in"
                      : "w-fit -rotate-45"
                  }
                >
                  <IoMdAdd
                    className={
                      showDropdrownBottonL
                        ? "text-2xl m-2 text-gray-900 rotate-45 transition-opacity-1 duration-150 ease-in"
                        : "text-2xl m-2 text-gray-700 -rotate-45"
                    }
                  />
                </button>

                <div className="flex bg-white items-center rounded-md gap-5 p-1 w-full">
                  <input
                    type="text"
                    className="w-full my-2 outline-none text-gray-600 px-3 "
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    onKeyDown={handlekeydown}
                  />
                </div>
                <button className="text-2xl " onClick={sendMessageToDB}>
                  <IoSendSharp />
                </button>
              </div>
            </div>
            {openContactInfo ? (
              <SideNavRight title="Contact Infos">
                <ContactInfoPage />
              </SideNavRight>
            ) : (
              <SideNavRight title="Search for messages">
                <SearchField />
              </SideNavRight>
            )}

            {showCreateGroup && (
              <CreateGrt title="Create new group">
                <CreateGroup />
              </CreateGrt>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Discossions;

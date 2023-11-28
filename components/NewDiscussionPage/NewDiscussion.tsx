import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useProfileContext } from "../context/profileContext";

type Props = {
  title: string;
  children: React.ReactElement;
};

const NewDiscussion = (props: Props) => {
  const { openProfile, setOpenProfile } = useProfileContext();
  return (
    <div
      className={
        openProfile
          ? "profil w-[25vw] inline-block text-[#3b4a54] bg-bgGray transition duration-1000 ease-in-out py-0"
          : " profiloff hidden"
      }
    >
      <div className=" flex items-center bg-[#008069] h-32  gap-10 w-full py-2  px-10">
        <button
          className="text-2xl py-5 font-bold text-gray-600"
          onClick={() => setOpenProfile(false)}
        >
          <AiOutlineArrowLeft size={25} className=" text-[#e7e8e9] " />
        </button>
        <p className=" text-[#e7e8e9] text-[20px]">{props.title}</p>
      </div>

      {props.children}
    </div>
  );
};

export default NewDiscussion;

import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useProfileContext } from "../context/profileContext";

type Props = {
  title: string;
  children: React.ReactElement;
};

const ProfilePage = ({ title, children }: Props) => {
  // const [hasMounted, setHasMounted] = useState(false);
  // useEffect(() => {
  //   setHasMounted(true);
  // }, []);
  // if (!hasMounted) return;
  const { openProfile, setOpenProfile } = useProfileContext();

  return (
    <div
      className={
        openProfile
          ? "profil w-[25vw] inline-block text-[#3b4a54] bg-bgGray fixed top-0 left-0 transition duration-1000 ease-in-out py-0 h-full overflow-y-auto"
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
        <p className=" text-[#e7e8e9] text-[20px]">{title}</p>
      </div>

      {children}
    </div>
  );
};

export default ProfilePage;

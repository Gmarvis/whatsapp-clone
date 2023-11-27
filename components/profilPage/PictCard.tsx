import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiArrowGoBackLine } from "react-icons/ri";
import { AiOutlineCheck } from "react-icons/ai";
import { useWhatSappContext } from "../context";
import { supabase } from "@/utils/supabase/client";
import { LOCAL_STORAGE } from "@/utils/service/storage";
import updateUserAvatar from "@/utils/queries/updateUserAvatar";

type Props = {
  profilepict: string;
  setProfilPict: React.Dispatch<React.SetStateAction<string>>;
  setImportPict: React.Dispatch<React.SetStateAction<boolean>>;
};

const PictCard = ({ profilepict, setProfilPict, setImportPict }: Props) => {
  // const [sendingFile, setSendingFile] = useState<any>();

  const currentUser = LOCAL_STORAGE.get("sender");
  const { profileImage, setProfileImage, sendingFile, setSendingFile } =
    useWhatSappContext();

  const reloadFile = () => {
    const newInput = document.createElement("input") as HTMLInputElement;
    newInput.type = "file";
    newInput.addEventListener("change", (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      setSendingFile(file);

      // const imageURl = URL.createObjectURL(file);

      const reader = new FileReader();
      reader.addEventListener("load", (e: any) => {
        const fileContent = reader.result;
        if (fileContent) {
          localStorage.setItem("uploadFile", fileContent as string);
          setProfilPict(fileContent as string);
        }
      });
      reader.readAsDataURL(file);
    });
    newInput.click();
  };

  const uploadFileToSupabase = async () => {
    const fileValue = `avatar${Date.now()}.png`;
    const { error } = await supabase.storage
      .from("whatsapp_avatars/images")
      .upload(fileValue, sendingFile);
    if (error) {
      console.error(error);
      return;
    }
    const { data } = supabase.storage
      .from("whatsapp_avatars/images")
      .getPublicUrl(fileValue);
    if (data) {
      console.log(data.publicUrl);
      setProfilPict(data.publicUrl);
      currentUser.image = data.publicUrl;
      LOCAL_STORAGE.save("sender", currentUser);
    }
    // setProfileImage(publicUrl as unknown as string);
    // setProfileImage(data.publicUrl);
    setProfilPict(data.publicUrl);
    // setProfileImage(data.publicUrl);
    LOCAL_STORAGE.save("imageURL", data.publicUrl);
    setProfileImage(LOCAL_STORAGE.get("imageURL"));

    updateUserAvatar(data.publicUrl);
    console.log("this is your profile picture");
    setImportPict(false);
  };

  https: return (
    <div className=" cardprofil w-[470px] h-[500px] z-100 bg-[#d8dfe3] shadow-maebrie">
      <div className=" flex items-center justify-evenly bg-[#008069] h-12  gap-10 w-full py-2  px-3 text-[#f4f9fc]">
        <button className="text-2xl" onClick={() => setImportPict(false)}>
          <AiOutlineClose size={25} className="" />
        </button>
        <span className=" text-lg "> Drag image to adjust</span>
        <button
          className="text-2xl flex gap-2 items-center "
          onClick={reloadFile}
        >
          <RiArrowGoBackLine size={20} className=" " />
          <span className=" text-[16px] "> reload</span>
        </button>
      </div>
      <div className="border-none cursor-move ">
        <Image
          src={profilepict || profileImage}
          alt=""
          width={100}
          height={100}
          className=" w-full h-[360px] border-none "
        />
      </div>
      {/* */}
      {/* <div className=" overlay overlay w-full h-full relative  rounded-full   "></div> */}
      <div></div>
      <button
        className="bg-[#008069] p-4 rounded-full translate-y-[-55%] translate-x-[350px]"
        onClick={uploadFileToSupabase}
      >
        <AiOutlineCheck size={35} className=" text-white " />{" "}
      </button>
    </div>
  );
};

export default PictCard;

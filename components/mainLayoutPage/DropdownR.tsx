"use client";
import React, { ChangeEvent, forwardRef, useState } from "react";
import { useRef } from "react";
import { TbFileDescription } from "react-icons/tb";
import { MdPhotoLibrary } from "react-icons/md";
import { AiFillCamera } from "react-icons/ai";
import { FaUserLarge } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";
import { WiStars } from "react-icons/wi";
import { supabase } from "@/utils/supabase/client";
import { useWhatSappContext } from "../context";

export interface IAppProps {}

const DropDownR = forwardRef<HTMLUListElement>((props: IAppProps, ref) => {
  console.log("in the drop d");
  // const [selectedFile, setSelectedFile] = useState(null);
  const hiddenFileInputRef = useRef();
  const { setShowCamera } = useWhatSappContext();
  const { opendocs, setOpendocs } = useWhatSappContext();

  const handleFileChange = (event: ChangeEvent<HTMLElement>) => {
    const file = event.target.files[0];

    setOpendocs(file);
    // console.log(typeof opendocs);
  };

  const handleOpenFilePicker = () => {
    hiddenFileInputRef.current.click();
  };

  const handleUploadFile = async () => {
    if (!selectedFile) {
      return;
    }

    const storage = supabase.storage;

    const fileName = selectedFile.name;
    const fileData = await selectedFile.arrayBuffer();

    const { error } = await storage.from("uploads").upload(fileName, fileData, {
      cacheControl: "3600",
      contentType: selectedFile.type,
    });

    if (error) {
      console.error("Failed to upload file:", error);
      return;
    }

    // Send file URL to another user using any appropriate method
    const fileURL = await storage.from("uploads").getPublicUrl(fileName);
    console.log("File uploaded:", fileURL);
  };

  return (
    <ul
      ref={ref}
      className="absolute mb-80 py-2 w-[250px] bg-white shadow-xl  delay-7000 transform transition-duration-10000   translate-x-12 -scale-20  ease-in-out rounded-[16px] font-sans font-medium"
    >
      <li
        onClick={() => setOpendocs((prev: any) => !prev)}
        className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap flex items-center "
      >
        <input
          type="file"
          id="fileInput"
          ref={hiddenFileInputRef}
          // style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <TbFileDescription
          size={23}
          className=" bg-[#edecee] text-[#8544bd] w-6"
        />
        {/* <span className="ml-2" onClick={handleOpenFilePicker}>
          Document
        </span> */}
      </li>
      <li
        id="photo"
        className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap flex items-center"
      >
        <input
          type="file"
          id="fileInput"
          ref={hiddenFileInputRef}
          style={{ display: "none" }}
        />
        <MdPhotoLibrary size={25} className=" bg-white text-[#2250cf]" />
        <span className="ml-2" onClick={handleOpenFilePicker}>
          Photos and Videos
        </span>
      </li>
      <li
        onClick={() => setShowCamera((prev: boolean) => !prev)}
        id="photo"
        className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap flex items-center"
      >
        <AiFillCamera size={25} className=" bg- text-[#ff2a58] " />
        <span className="ml-2">Camera</span>
      </li>
      <li className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap flex items-center">
        <FaUserLarge size={22} className=" bg-white text-[#4a64cb] " />{" "}
        <span className="ml-2">Contact</span>
      </li>
      <li className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap flex items-center">
        <FontAwesomeIcon
          icon={faSquarePollHorizontal}
          style={{ width: 23, height: 23 }}
          className=" text-[#ff8c00]"
        />
        <span className="ml-2">Survey</span>
      </li>
      <li className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap flex items-center">
        <WiStars size={23} className=" bg-[#20c997] text-white rounded-md" />{" "}
        <span className="ml-2">New sticker</span>
      </li>
    </ul>
  );
});

export default DropDownR;

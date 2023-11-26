"use client";
import React, { useState } from "react";
import { useWhatSappContext } from "../context";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

const Imageupload = () => {
  const { openImage, setOpenImage } = useWhatSappContext();

  const handleClose = () => {
    setOpenImage(null);
  };

  return (
    <div className="bg-gray-50 h-[100vh]">
      <div className="bg-gray-100 py-4 px-4">
        <IoMdClose
          onClick={handleClose}
          className="w-[30px] h-[30px] bg-gray-500 font-bold text-white rounded"
        />
      </div>
      {/* <p className="flex inset-0 items-center">{openImage && openImage.size}</p> */}
      <Image src={openImage} alt="" width={500} height={500} />
    </div>
  );
};

export default Imageupload;

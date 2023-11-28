"use client";
import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Avatar from "../Avatar";
import { useWhatSappContext } from "@/components/context";
import { useWhatSappContactContext } from "../context/Context";

type Props = {
  children: React.ReactElement;
  title: string;
};

const SideNavRight = React.memo((props: Props) => {
  // const ref = useRef<HTMLDivElement>(null);/

  const { openSideNav, setOpenSideNav } = useWhatSappContext();
  const { openContactInfo, setOpenContactInfo } = useWhatSappContactContext();

  const handleClose = () => {
    setOpenSideNav(false);
    setOpenContactInfo(false);
  };

  return (
    <div
      className={
        openSideNav || openContactInfo
          ? " w-[25vw] inline-block text-[#3b4a54] transition duration-1000 ease-in-out py-0"
          : " hidden w-0"
      }
    >
      <div className=" flex items-center bg-bgGray h-16  gap-10 w-full py-2  px-10">
        <button
          className="text-2xl py-5 font-bold text-gray-600"
          onClick={handleClose}
        >
          <AiOutlineClose />
        </button>
        <p className=" text-[#111b11]">{props.title}</p>
      </div>
      {props.children}
    </div>
  );
});

export default SideNavRight;

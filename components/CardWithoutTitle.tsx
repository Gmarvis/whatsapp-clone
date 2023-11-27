"use client";

import React, { forwardRef, useRef, useState } from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import DropDown from "./mainLayoutPage/DropDown";
import { dropdownProfilePict } from "@/utils/data/mainpageDropdownLists";
import { Popover, Whisper } from "rsuite";
import { useWhatSappContext } from "./context";
import UploadPicture from "./profilPage/UploadPicture";

type Props = {
  image: string;
};

const CardWithoutTitle = forwardRef<HTMLUListElement, Props>((props, ref) => {
  return (
    <>
      <div className="relative w-full flex flex-col hover:opacity-100   gap-2   justify-center items-center py-8 mx-auto border-b border-b-gray-200 bg-bgGray z-0 ">
        <Whisper
          trigger="click"
          speaker={
            <Popover style={{ backgroundColor: "transparent" }} arrow={false}>
              <DropDown dropdownList={dropdownProfilePict} />
            </Popover>
          }
          placement={"autoHorizontalEnd"}
        >
          <div>
            <Image
              src={props.image}
              alt="Avatar image"
              width={200}
              height={200}
              className=" bg-cover bg-center object-cover cardprofil w-44 h-44 rounded-full"
            />

            <div
              className="overlay w-44 h-44 absolute  rounded-full cursor-pointer  opacity-0  hover:opacity-100"
              title="change the profile picture"
            >
              <div className="w-44 h-44 rounded-full  bottom-0 hover:opacity-100 opacity-0  hover:bg-zinc-600/60 hover:backdrop-brightness-75 absolute   -top-44">
                <div className=" absolute left-16 top-12 flex flex-col justify-center items-center ">
                  <span className=" -translate-x-6">
                    <FaCamera size={25} className="text-[#ffffff] " />{" "}
                  </span>
                  <span className="text-[#ffffff] text-[12px] font-semibold w-24">
                    CHANGE PROFIL PICTURE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Whisper>
      </div>
    </>
  );
});

export default React.memo(CardWithoutTitle);

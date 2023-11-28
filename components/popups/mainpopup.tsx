import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useWhatSappContext } from "@/components/context";
// import { useWhatSappContext } from "../context";

type Props = {
  children: React.ReactElement;
};

const Mainpopup = ({ visible }: any, { onClose }: any, props: Props) => {
  const handleOnclose = (e: any) => {
    if (e.target.id === "container") onClose();
  };

  if (!visible) return null;

  return (
    <div
      id="container"
      onClick={handleOnclose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="w-[400px] h-[50vh] bg-white p-6 rounded">
        <button className="text-2xl text-gray-600">
          <AiOutlineClose size={20} />
        </button>
      </div>
      {props.children}
    </div>
  );
};

export default Mainpopup;

import React from "react";
import Whitebtn from "../atoms/whitebtn";
import Greenbtn from "../atoms/greenbtn";

const Reportpopup = ({ visible }: any, { onClose }: any) => {
  const handleOnclose = (e: any) => {
    if (e.target.id === "container") onClose();
  };

  if (!visible) return null;

  return (
    <div
      id="container"
      onClick={handleOnclose}
      className="fixed z-10 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="relative w-[500px] h-[45vh] bg-white p-5 rounded px-4">
        <h1 className="text-[22px] text-gray-600">
          Report this contact to Whatsapp ?
        </h1>
        <div className="flex gap-3">
          <input
            type="checkbox"
            className="text-teal-800 rounded w-[20px] border border-gray-100"
          />
          <label htmlFor="blocking" className="text-[17px]">
            Block this contact and clear the chat
          </label>
        </div>
        <hr className="text-gray-400 " />
        <p className="text-gray-500 text-[16px]">
          The last 5 messages will be transfered to Whatsapp.
        </p>
        <p className="text-gray-500 text-[16px]">
          The contact will not be notify
        </p>
        <div className="absolute bottom-4 right-6 flex gap-4">
          <Whitebtn label="Cancel" className="" />
          <Greenbtn label="Report" className="" />
        </div>
      </div>
    </div>
  );
};

export default Reportpopup;

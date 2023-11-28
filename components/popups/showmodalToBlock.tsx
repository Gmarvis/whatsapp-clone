import React from "react";
import Whitebtn from "../atoms/whitebtn";
import Greenbtn from "../atoms/greenbtn";

const ShowmodalToBlock = ({ visible }: any, { onClose }: any) => {
  const handleOnclose = (e: any) => {
    if (e.target.id === "container") onClose();
  };

  if (!visible) return null;
  return (
    <div
      id="container"
      onClick={handleOnclose}
      className="fixed z-10 inset-0 bg-white bg-opacity-40 backdrop-blur-sm flex justify-center items-center shadow-2xl"
    >
      <div className="relative w-[500px] h-[50vh] bg-white p-8 rounded ">
        <h1 className="text-[22px] text-gray-600">Block Mustapha</h1>
        <div className="flex gap-3">
          <div>
            <input
              type="checkbox"
              className="text-teal-800 rounded border border-gray-600"
            />
          </div>

          <div>
            <p className="text-[17px]">Report a contact</p>
            <p className="text-[17px]">
              The five last messages of this person will be transfered to
              whatsapp.
            </p>
          </div>
        </div>
        <hr className="text-gray-400 " />
        <p className="text-gray-500 text-[16px]">
          Blocked contacts will neither be able to send nor <br /> call. This
          contact will not be informed.
        </p>
        <div className="absolute bottom-4 right-6 flex gap-4">
          <Whitebtn label="Cancel" className="" />
          <Greenbtn label="Report" className="" />
        </div>
      </div>
    </div>
  );
};

export default ShowmodalToBlock;

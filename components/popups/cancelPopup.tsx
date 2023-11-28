import React from "react";
import Greenbtn from "../atoms/greenbtn";
import Whitebtn from "../atoms/whitebtn";

const CancelPopup = ({ visible }: any, { onClose }: any) => {
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
      <div className="relative w-[500px] h-[40vh] bg-white p-5 rounded">
        <h1 className="text-[22px] text-gray-600">Clear this discussion ?</h1>
        <div className="flex flex-col gap-4 pt-2">
          <p className="text-gray-500 text-[16px]">
            This discussion will be void, but will still figure in the <br />
            discusion list
          </p>
          <div className="flex gap-3">
            <input
              type="checkbox"
              className="text-teal-800 rounded w-[20px] border-[2px] border-gray-600"
            />
            <label htmlFor="blocking" className="text-[17px]">
              Keep important messages
            </label>
          </div>
        </div>
        <div className="absolute bottom-8 right-6 flex gap-4">
          <Whitebtn label="Cancel" className="" />
          <Greenbtn label="Clear this discussion" className="" />
        </div>
      </div>
    </div>
  );
};

export default CancelPopup;

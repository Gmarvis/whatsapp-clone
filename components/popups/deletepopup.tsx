import React from "react";
import Whitebtn from "../atoms/whitebtn";
import Greenbtn from "../atoms/greenbtn";

const Deletepopup = ({ visible }: any, { onClose }: any) => {
  const handleOnclose = (e: any) => {
    if ((e.target.id === "container", onClose)) onClose();
  };

  if (!visible) return null;

  return (
    <div
      id="container"
      onClick={handleOnclose}
      className="fixed z-10 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="relative w-[500px] h-[25vh] bg-white p-5 rounded px-4">
        <h1 className="text-[22px] text-gray-600">Delete this discussion ?</h1>

        <div className="absolute bottom-8 right-6 flex gap-4">
          <Whitebtn label="Cancel" className="" />
          <Greenbtn label="Delete the discussion" className="" />
        </div>
      </div>
    </div>
  );
};

export default Deletepopup;

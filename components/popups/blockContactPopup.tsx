import React, { useState } from "react";
import Whitebtn from "../atoms/whitebtn";
import Greenbtn from "../atoms/greenbtn";

const BlockContactPopup = ({ visible }: any, { onClose }: any) => {
  const [selectedRadio, setSelectedRadio] = useState("");
  const [confirmButtonColor, setConfirmButtonColor] = useState("#ccc");
  const handleOnclose = (e: any) => {
    if ((e.target.id === "container", onClose)) onClose();
  };

  if (!visible) return null;

  const handleRadioChange = (event: any) => {
    setSelectedRadio(event.target.value);

    if (event.target.value) {
      setConfirmButtonColor("#0f9d58");
    } else {
      setConfirmButtonColor("#ccc");
    }
  };

  return (
    <div
      id="container"
      onClick={handleOnclose}
      className="fixed z-10 inset-0 bg-white bg-opacity-40 backdrop-blur-sm flex justify-center items-center shadow-2xl"
    >
      <div className="relative w-[80vh] h-[70vh] bg-white px-6 rounded ">
        <h1 className="text-[22px] text-gray-600">Block Mustapha</h1>
        <p className="text-gray-500">
          (USERNAME) will no longer call you nor call you. This person will not
          be notify. <span className="text-blue-500">More infos</span>
        </p>
        <div className="text-gray-800">
          <p className="text-[17px] text-gray-400 py-2">Reason for blocking</p>
          <hr className="text-gray-400 " />
          <div className="flex gap-4 pt-0">
            <input
              type="radio"
              id="option1"
              name="radioOptions"
              value="option1"
              checked={selectedRadio === "option1"}
              onChange={handleRadioChange}
              className="text-teal-80 border-gray-600 w-[22px]"
            />
            <label htmlFor="block" className="text-[17px]">
              I dont have any reason
            </label>
          </div>
          <hr className="text-gray-400 " />
          <div className="flex gap-4 mt-0">
            <input
              type="radio"
              id="option2"
              name="radioOptions"
              value="option2"
              checked={selectedRadio === "option2"}
              onChange={handleRadioChange}
              className="text-teal-800  border-gray-600 w-[22px]"
            />
            <label htmlFor="block" className="text-[17px]">
              I did not register
            </label>
          </div>
          <hr className="text-gray-400 " />{" "}
          <div className="flex gap-4">
            <input
              type="radio"
              id="option3"
              name="radioOptions"
              value="option3"
              checked={selectedRadio === "option3"}
              onChange={handleRadioChange}
              className="text-teal-800  border-gray-600 w-[22px]"
            />
            <label htmlFor="block" className="text-[17px]">
              Spam
            </label>
          </div>
          <hr className="text-gray-400 " />{" "}
          <div className="flex gap-4">
            <input
              type="radio"
              id="option4"
              name="radioOptions"
              value="option4"
              checked={selectedRadio === "option4"}
              onChange={handleRadioChange}
              className="text-teal-800  border-gray-600 w-[22px]"
            />
            <label htmlFor="block" className="text-[17px]">
              Inappropriate messages
            </label>
          </div>
          <hr className="text-gray-400 " />{" "}
          <div className="flex gap-4">
            <input
              type="radio"
              id="option5"
              name="radioOptions"
              value="option5"
              checked={selectedRadio === "option5"}
              onChange={handleRadioChange}
              className="text-teal-800  border-gray-600 w-[22px]"
            />
            <label htmlFor="block" className="text-[17px]">
              Others
            </label>
          </div>
          <hr className="text-gray-400 " />
        </div>

        <div className="absolute bottom-4 right-6 flex gap-4">
          <Whitebtn label="Cancel" className="" />
          <button
            style={{ backgroundColor: confirmButtonColor }}
            disabled={selectedRadio === ""}
            className="rounded-full px-8 py-2"
          >
            Block
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockContactPopup;

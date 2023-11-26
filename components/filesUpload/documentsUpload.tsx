import React from "react";
import { useWhatSappContext } from "../context";
import { IoMdClose } from "react-icons/io";

const DocumentsUpload = () => {
  const { opendocs, setOpendocs } = useWhatSappContext();

  const handleClose = () => {
    setOpendocs(null);
  };

  return (
    <div className="bg-gray-50 h-[100vh]">
      <div className="bg-gray-100 py-4 px-4">
        <IoMdClose
          onClick={handleClose}
          className="w-[30px] h-[30px] bg-gray-500 font-bold text-white rounded"
        />
      </div>
      <p>{opendocs && opendocs.name}</p>
    </div>
  );
};

export default DocumentsUpload;

import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { IoBan } from "react-icons/io5";
import { BiSolidDislike } from "react-icons/bi";
import Deletepopup from "../popups/deletepopup";
import Reportpopup from "../popups/reportpopup";
import ShowmodalToBlock from "../popups/showmodalToBlock";
import BlockContactPopup from "../popups/blockContactPopup";

type Props = {};

const ContactAction = (props: Props) => {
  const [popupMod, setPopupMod] = useState(false);
  const [reportPopup, setReportPopup] = useState(false);
  const [delPopup, setDelPopup] = useState(false);

  const handleOnClose = () => setPopupMod(false);

  return (
    <div className=" flex flex-col gap-6 mt-6 text-[#ff2e74]">
      <div
        onClick={() => setPopupMod(true)}
        className=" text-md flex gap-5 items-center justify-start cursor-pointer hover:bg-slate-100"
      >
        {" "}
        <span>
          {" "}
          <IoBan size={25} className=" rotate-90 " />
        </span>{" "}
        <span> To Bloc Verges DKV</span>
        {<BlockContactPopup onClose={handleOnClose} visible={popupMod} />}
      </div>
      <div
        onClick={() => setReportPopup(true)}
        className=" text-lg flex items-center  justify-start gap-5 cursor-pointer hover:bg-slate-100"
      >
        <span>
          <BiSolidDislike size={25} />{" "}
        </span>{" "}
        <span>Signal Verges DKV</span> {<Reportpopup visible={reportPopup} />}
      </div>
      <div
        onClick={() => setDelPopup(true)}
        className=" text-lg flex gap-5  justify-start items-center cursor-pointer hover:bg-slate-100"
      >
        {" "}
        <span>
          <HiOutlineTrash size={25} />{" "}
        </span>{" "}
        <span>delete Verges DKV</span>
      </div>
      {<Deletepopup visible={delPopup} />}
    </div>
  );
};

export default ContactAction;

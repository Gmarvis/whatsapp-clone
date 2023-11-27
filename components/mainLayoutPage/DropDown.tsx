import React, { forwardRef, useState } from "react";
import Mainpopup from "../popups/mainpopup";
import { useWhatSappContext } from "../context";
import ShowmodalToBlock from "../popups/showmodalToBlock";
import Reportpopup from "../popups/reportpopup";
import Deletepopup from "../popups/deletepopup";
import CancelPopup from "../popups/cancelPopup";
import DisconnectPopup from "../popups/disconnectPopup";
// import { uploadFile } from "@/utils/service/getFile";
import { useProfileContext } from "../context/profileContext";
import { useWhatSappContactContext } from "../context/Context";
import { uploadGroupIcon } from "@/utils/queries/UploadGroupIcon";

export interface IAppProps {
  dropdownList: string[];
}

const DropDown = forwardRef<HTMLUListElement, IAppProps>((props, ref) => {
  console.log("in the drop d");
  const [profil, setProfil] = useState<string>("Show the picture");
  const [popupMod, setPopupMod] = useState<boolean>(false);
  const [reportPopup, setReportPopup] = useState<boolean>(false);
  const [delPopup, setDelPopup] = useState<boolean>(false);
  const [cancelPopup, setCancelPopup] = useState<boolean>(false);
  const [disconPopup, SetDisconPopup] = useState<boolean>(false);

  // const { showPPicture, setShowPPicture } = useWhatSappContext();
  // const handleLink = (value: string) => {
  // you can use switch case or if else statements

  const uldd = document.getElementById("uldropdown") as HTMLUListElement;

  const { setShowPPicture, setProfilPict, setImportPict, setSendingFile } =
    useWhatSappContext();
  const { showCreateGroup, setShowCreateGroupe } = useProfileContext();
  const { setOpenContactInfo } = useWhatSappContactContext();

  const handleLink = (value: string) => {
    if (value === "new group") setShowCreateGroupe((prev) => !prev);
    if (value === "to block") setPopupMod(true);
    else if (value === "report") setReportPopup(true);
    else if (value === "remove the discussion") setDelPopup(true);
    else if (value === "cancel this discussion") setCancelPopup(true);
    else if (value === "disconnect") SetDisconPopup(true);

    if (value === "Show the picture") setShowPPicture(true);
    if (value === "Import a picture") {
      const inputFile = document.createElement("input") as HTMLInputElement;
      inputFile.type = "file";

      inputFile.addEventListener("change", (e: any) => {
        const file = e.target.files[0];
        setSendingFile(file);
        const reader = new FileReader();
        reader.addEventListener("load", (e: any) => {
          const fileContent = reader.result;
          if (fileContent) {
            setProfilPict(fileContent as string);
          }
        });
        reader.readAsDataURL(file);
      });

      setImportPict(true);
      inputFile.click();
    }

    // handle add group icon
    if (value === "Upload photo") {
      const inputFile = document.createElement("input") as HTMLInputElement;
      inputFile.type = "file";
      inputFile.addEventListener("change", async (e: any) => {
        const file = e.target.files[0];
        setSendingFile(file);
        const reader = new FileReader();
        reader.addEventListener("load", (e: any) => {
          const fileContent = reader.result;
          if (fileContent) {
            setProfilPict(fileContent as string);
          }
        });
        reader.readAsDataURL(file);
        uploadGroupIcon(file);
      });

      // setImportPict(true);
      inputFile.click();
    }

    if (value === "contact infos") setOpenContactInfo(true);
    if (uldd !== null) {
      uldd.style.display = "none";
    }
  };

  const handleOnclose = () => SetDisconPopup(false);

  return (
    <>
      {popupMod && <ShowmodalToBlock visible={popupMod} />}

      {reportPopup && <Reportpopup visible={reportPopup} />}

      {delPopup && <Deletepopup visible={delPopup} />}

      {cancelPopup && <CancelPopup visible={cancelPopup} />}

      {disconPopup && (
        <DisconnectPopup onClose={handleOnclose} visible={disconPopup} />
      )}

      {!(popupMod && reportPopup && delPopup && cancelPopup && disconPopup) && (
        <ul
          ref={ref}
          className="absolute mt-8 py-2 w-[250px] bg-white rounded-md shadow-xl z-2 transition-transform delay-5000 ease-in-out -translate-x-48 z-100"
        >
          {props.dropdownList.map((value, index) => (
            <li
              key={index}
              className="w-64  text-sm text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap"
              onClick={() => handleLink(value)}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </>
  );
  // };
});

export default React.memo(DropDown);

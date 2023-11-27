"use client";
import React, { SetStateAction, forwardRef } from "react";
import { useRef } from "react";
import { TbFileDescription } from "react-icons/tb";
import { MdPhotoLibrary } from "react-icons/md";
import { AiFillCamera } from "react-icons/ai";
import { supabase } from "@/utils/supabase/client";
import { useWhatSappContext } from "../context";

export interface IAppProps {
  setDocsopen: React.Dispatch<SetStateAction<string>>;
  RefObject: string;
}

const DropDownR = forwardRef<HTMLUListElement, IAppProps>((props, ref) => {
  console.log("in the drop d");
  // const [selectedFile, setSelectedFile] = useState(null);
  const hiddenFileInputRef = useRef()!;
  const { setShowCamera } = useWhatSappContext();
  const { setOpendocs } = useWhatSappContext();
  const { setOpenImage } = useWhatSappContext();

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setOpendocs(fileURL);
    const bucket = "whatsapp_avatars";

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload("fileURl", file);

    if (error) {
      console.error("error adding docs", error);
    } else {
      console.log("image added data", data);
      const imageUrl = supabase.storage.from(bucket).getPublicUrl(data.path);
      console.log("send image url", imageUrl.data.publicUrl);
      props.setDocsopen(imageUrl.data.publicUrl as string);
      return imageUrl.data.publicUrl;
    }
  };

  const handleImageupload = async (event: any) => {
    const file = event.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setOpenImage(fileURL);

    const bucket = "whatsapp_avatars";

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileURL, file, {
        cacheControl: "3600",
        contentType: file.type,
      });

    if (error) {
      console.error("error adding docs", error);
    } else {
      console.log("image uploaded successfully", data);
      const imageUrl = supabase.storage.from(bucket).getPublicUrl(data.path);
      props.setDocsopen(imageUrl.data.publicUrl as string);
      console.log("send image url", imageUrl.data.publicUrl);
      return imageUrl.data.publicUrl;
    }
  };

  const handleOpenFilePicker = () => {
    hiddenFileInputRef.current.click();
  };

  // const handleUploadFile = async () => {
  //   if (!selectedFile) {
  //     return;
  //   }

  //   const storage = supabase.storage;

  //   const fileName = selectedFile.name;
  //   const fileData = await selectedFile.arrayBuffer();

  //   const { error } = await storage.from("uploads").upload(fileName, fileData, {
  //     cacheControl: "3600",
  //     contentType: selectedFile.type,
  //   });

  //   if (error) {
  //     console.error("Failed to upload file:", error);
  //     return;
  //   }

  //   // Send file URL to another user using any appropriate method
  //   const fileURL = await storage.from("uploads").getPublicUrl(fileName);
  //   console.log("File uploaded:", fileURL);
  // };

  return (
    <ul
      ref={ref}
      className="absolute mb-[35vh] py-2 w-[250px] bg-white shadow-xl  delay-7000 transform transition-duration-10000   translate-x-12 -scale-20  ease-in-out rounded-[16px] font-sans font-medium"
    >
      <li
        onClick={() => setOpendocs((prev: any) => !prev)}
        className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap flex items-center "
      >
        <input
          type="file"
          id="fileInput"
          ref={hiddenFileInputRef}
          style={{ display: "none" }}
          accept="docs, pdf, word"
          onChange={handleFileChange}
        />
        <TbFileDescription
          size={23}
          className=" bg-[#edecee] text-[#8544bd] w-6"
        />
        <span className="ml-2" onClick={handleOpenFilePicker}>
          Document
        </span>
      </li>
      <li
        onClick={() => setOpenImage((prev: any) => !prev)}
        id="photo"
        className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap flex items-center"
      >
        <input
          type="file"
          id="fileInput"
          ref={hiddenFileInputRef}
          style={{ display: "none" }}
          accept="image/jpeg, video/mp4, video/avi, image/png, image/gif"
          onChange={handleImageupload}
        />
        <MdPhotoLibrary size={25} className=" bg-white text-[#2250cf]" />
        <span className="ml-2" onClick={handleOpenFilePicker}>
          Photos and Videos
        </span>
      </li>
      <li
        onClick={() => setShowCamera((prev: boolean) => !prev)}
        id="photo"
        className="w-64  text-sm capitalize text-gray-700 hover:bg-bgGray hover:text-black py-[10px] px-[24px] hover:w-full cursor-pointer  nowrap flex items-center"
      >
        <AiFillCamera size={25} className=" bg- text-[#ff2a58] " />
        <span className="ml-2">Camera</span>
      </li>
    </ul>
  );
});

export default DropDownR;

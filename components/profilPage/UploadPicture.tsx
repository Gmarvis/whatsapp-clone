import Image from "next/image";
import React from "react";
import { useWhatSappContext } from "../context";
import PictCard from "./PictCard";

type Props = {};

const UploadPicture = (props: Props) => {
  const { importPict, profilepict, setProfilPict, setImportPict } =
    useWhatSappContext();
  if (typeof localStorage === "undefined") return;
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <div
      className={
        importPict
          ? " top-0 left-0 bg-white/95 w-[100vw] h-screen z-0 overflow-hidden flex flex-col pt-16 items-center"
          : "hidden"
      }
    >
      <PictCard
        profilepict={profilepict}
        setProfilPict={setProfilPict}
        setImportPict={setImportPict}
      />
    </div>
  );
};

export default UploadPicture;

import React from "react";
import Whitebtn from "../atoms/whitebtn";
import Greenbtn from "../atoms/greenbtn";
import { useRouter } from "next/navigation";

const DisconnectPopup = ({ visible, onClose }: any) => {
  const handleOnclose = (e: any) => {
    if (e.target.id === "container" && onClose) onClose();
  };

  if (!visible) return null;
  const router = useRouter();
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem('email')
    router.push("/");
  };

  return (
    <div
      id="container"
      onClick={handleOnclose}
      className="fixed z-10 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="relative w-[500px] h-[35vh] bg-white p-5 rounded">
        <h1 className="text-[22px] text-gray-500">Disconnect ?</h1>
        <div>
          <p className="text-[16px]">You really want to logout ?</p>
          <p className="text-[16px]">
            Otherwise, you can activate {" "}
            <span className="text-blue-400">Log screen.</span>
          </p>
        </div>

        <div className="absolute bottom-8 right-6 flex gap-4">
          <Whitebtn label="Cancel" onClick={() => onClose()}/>
          <Greenbtn label="Disconnect" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default DisconnectPopup;

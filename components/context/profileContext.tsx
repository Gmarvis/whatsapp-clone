"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type ProfileContextType = {
  openProfile: boolean;
  setOpenProfile: Dispatch<SetStateAction<boolean>>;

  showCreateGroup: boolean;
  setShowCreateGroupe: Dispatch<SetStateAction<boolean>>;
};

const initContextState: ProfileContextType = {
  openProfile: false,
  setOpenProfile: (openProfile) => !openProfile,
  showCreateGroup: false,
  setShowCreateGroupe: (showCreateGroup) => !showCreateGroup,
};

export const ProfileContext =
  createContext<ProfileContextType>(initContextState);

export const ProfileContextProvider = ({ children }: any) => {
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [showCreateGroup, setShowCreateGroupe] = useState<boolean>(false);

  const values = {
    openProfile,
    setOpenProfile,
    showCreateGroup,
    setShowCreateGroupe,
  };

  return (
    <ProfileContext.Provider value={values}>{children}</ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const { openProfile, setOpenProfile, showCreateGroup, setShowCreateGroupe } =
    useContext(ProfileContext);
  return { openProfile, setOpenProfile, showCreateGroup, setShowCreateGroupe };
};

// export const useRecieverInfoContext = () => {
//   const reciever: any = JSON.parse(localStorage.getItem('reciever') || '{}')
//   return reciever
// }

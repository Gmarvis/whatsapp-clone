"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type WhatSappContextContactType = {
  openContactInfo: boolean;
  setOpenContactInfo: Dispatch<SetStateAction<boolean>>;
};

const initContextContactState: WhatSappContextContactType = {
  openContactInfo: false,
  setOpenContactInfo: (openContactInfo) => !openContactInfo,
};

export const WhatSappContactContext = createContext<WhatSappContextContactType>(
  initContextContactState
);

export const WhatSappContactContextProvider = ({ children }: any) => {
  const [openContactInfo, setOpenContactInfo] = useState<boolean>(false);

  const values = { openContactInfo, setOpenContactInfo };

  return (
    <WhatSappContactContext.Provider value={values}>
      {children}
    </WhatSappContactContext.Provider>
  );
};

export const useWhatSappContactContext = () => {
  const { openContactInfo, setOpenContactInfo } = useContext(
    WhatSappContactContext
  );
  return { openContactInfo, setOpenContactInfo };
};

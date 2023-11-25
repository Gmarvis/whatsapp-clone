import React, { ChangeEvent } from "react";
import { useWhatSappContext } from "../context";

const DocumentsUpload = () => {
  const { opendocs } = useWhatSappContext();

  return <div>{opendocs}</div>;
};

export default DocumentsUpload;

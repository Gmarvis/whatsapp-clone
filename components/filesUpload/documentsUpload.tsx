import React from "react";

const DocumentsUpload = () => {
  const sendFileToChatServer = (fileUrl) => {};

  const uploadFileToServer = (fileData) => {
    fetch("/api/upload", {
      method: "POST",
      body: fileData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Handle successful upload
          sendFileToChatServer(data.fileUrl);
        } else {
          // Handle upload error
          console.error("Failed to upload file:", data.error);
        }
      });
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      return;
    }

    // Process the selected file
    const fileData = new FormData();
    fileData.append("file", selectedFile);

    // Send the file data to the server
    uploadFileToServer(fileData);
  };

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        accept=".doc,.docx,.pdf"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default DocumentsUpload;

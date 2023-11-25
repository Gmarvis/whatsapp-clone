import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import Image from "next/image";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "user",
        }}
      />
      <button
        className="bg-teal-600 py-3 px-6 rounded mt-4 text-white text-[17px] w-[100px]"
        onClick={capture}
      >
        Camera
      </button>

      {capturedImage && (
        <Image
          src={capturedImage}
          alt="Captured Image"
          className="py-2 center"
          layout="fixed"
          width={200}
          height={200}
        />
      )}
    </>
  );
};

export default WebcamCapture;

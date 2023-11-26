"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Pulsation from "./component/PulseLoader";
import { LOCAL_STORAGE } from "@/utils/service/storage";

const Signupb = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);

  const handleInputChange = async () => {
    setIsloading(true);
    const googleUser = JSON.parse(
      localStorage.getItem("sb-xkwspfurbsmpwwazlkmu-auth-token") || "{}"
    );

    LOCAL_STORAGE.save("email", googleUser.user.email);

    const { data, error } = await supabase.from("user").insert({
      email: googleUser.user.email,
      name: googleUser.user.user_metadata.name,
      image: googleUser.user.user_metadata.picture,
      phone: googleUser.user.identities.phone,
    });

    if (error) console.log("an error occured while sending user", error);

    console.log("data from DB", data);

    router.push("/discussions");
  };

  return (
    <div>
      <h1>Welcome to Waxchat</h1>
      <h4>A chat app where you can chat with your relatives</h4>
      <button
        onClick={() => handleInputChange()}
        className="border p-3 bg-red-300"
      >
        Next
      </button>
    </div>
  );
};
export default Signupb;

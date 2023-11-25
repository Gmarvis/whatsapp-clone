"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { GrSettingsOption } from "react-icons/gr";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Pulsation from "./component/PulseLoader";
import { LOCAL_STORAGE } from "@/utils/service/storage";

const Signupb = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);

  // const generateToken = async (id: any) => {
  //   const token = await supabase.auth.setSession({id})
  //   return token
  // }

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

    // const email = localStorage.getItem("email");
    // const random = one + two + three + four + five + six;
    // let code = JSON.stringify(params.signup);
    // let sentCode = code.slice(10, 16);

    // if (random == sentCode) {
    //   const { data, error } = await supabase
    //     .from("user")
    //     .insert({ email: email });

    //   console.log(data);

    //   if (error) {
    //     console.log(error);
    //     setError("Email address already exist");
    //     setIsloading(false);
    //     return;
    //   }
    //   //  if (data) console.log(data);
    //   router.push("/discussions");
    // } else {
    //   setError("Invalid code");
    //   console.log("invalid");
    //   setIsloading(false);
    //   return;
    // }
  };

  return (
    <div className=" mt-56 items-center justify-center text-center">
      <h1 className="text-3xl font-extrabold text-white font-serif">
        Welcome to WHATSAPP WEB
      </h1>
      <h4 className="mt-8 mb-6 font-bold text-xl text-gray-950">
        Read our <span className="text-themecolor">Privacy Policy</span>. Tap
        'Agree and Continue' to accept the{" "}
        <span className="text-themecolor">Terms of Service</span>
      </h4>
      <button
        onClick={() => handleInputChange()}
        className="border p-4 px-5 text-base font-extrabold text-themecolor rounded"
      >
        Agree and Continue
      </button>
    </div>
  );
};

export default Signupb;

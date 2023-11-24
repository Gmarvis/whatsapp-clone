"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { GrSettingsOption } from "react-icons/gr";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Pulsation from "./component/PulseLoader";

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
    const googleUser = JSON.parse(localStorage.getItem("sb-xkwspfurbsmpwwazlkmu-auth-token") || '{}')

    localStorage.setItem("email", JSON.stringify(googleUser.user.email))

    const { data, error } = await supabase
      .from('user')
      .insert({ email: googleUser.user.email, name: googleUser.user.user_metadata.name, image: googleUser.user.user_metadata.picture, phone: googleUser.user.identities.phone  })

    if (error) console.log('an error occured while sending user', error)
    
      console.log('data from DB', data)
    
    router.push('/discussions')

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

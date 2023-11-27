"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import GoogleButton from "./atoms/googlebtn";
import { redirect, useRouter } from "next/navigation";
import { AuthResponse } from "@supabase/supabase-js";

const Signup = () => {

  if (typeof localStorage === "undefined") return;

  async function handleSignInWithGoogle(response: { credential: any; }) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
      nonce: 'NONCE', // must be the same one as provided in data-nonce (if any)
    })
  }


  return (
    <div>
      <div className="flex flex-col justify-center mt-2 xl:mt-5 w-[75vw] mobile:max-sm:w-[95%]">
        <div className="flex items-center gap-4 text-white">
          <Image src={"/logo.png"} width={60} height={60} alt={""}></Image>
          <p className="font-bold text-xl">WAXCHAT WEB</p>
        </div>

        <div className="bg-white  mobile:max-sm:ml-2 flex flex-col justify-center w-full p-20 mobile:max-sm:p-5 mt-8 rounded drop-shadow">
          <h2 className="text-center text-5xl font-extrabold text-themecolor font-serif mb-4">
            Log In With WaxChat Using Just Your Google
          </h2>
          <p className="text-center text-slate-500 mb-6">
            Cross platform web messaging with friends and family all over the world.
          </p>

          <GoogleButton />
        </div>
        
      </div>
    </div>
  );
};

export default Signup;

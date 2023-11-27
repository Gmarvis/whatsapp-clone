"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import GoogleButton from "./atoms/googlebtn";

const Signup = () => {
  if (typeof localStorage === "undefined") return;

  const handleGoogleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: usrToUse(),
      },
    });
  };

  const usrToUse = () => {
    let url =
      process?.env?.NODE_ENV === "production" // Set this to your site URL in production env.
        ? process?.env?.NEXT_PUBLIC_VERCEL_URL // Automatically set by Vercel.
        : "http://localhost:3000/discussions";
    // Make sure to include `https://` when not localhost.
    url = url?.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url?.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

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

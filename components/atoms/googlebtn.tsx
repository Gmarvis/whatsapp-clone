import { googlePicture } from "@/utils/data/mainpageDropdownLists";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import React from "react";

const GoogleButton = () => {
  const handleGoogleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: urlToUse(),
      },
    });
  };
  const urlToUse = () => {
    let url: string | undefined =
      process.env.NODE_ENV === "production"
        ? process?.env?.NEXT_PUBLIC_VERCEL_URL
        : "http://localhost:3000/discussion";
    url = url?.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url?.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  return (
    <div>
      <div
        onClick={() => handleGoogleSignin()}
        data-u
        className="flex border p-4 gap-3 self-center"
      >
        <Image height={20} width={20} alt="google logo" src={googlePicture} />
        <p>Sign in with Google</p>
      </div>
    </div>
  );
};
export default GoogleButton;

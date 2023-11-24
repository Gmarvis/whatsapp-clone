"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [email, setEmail] = React.useState<string>("");
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");
  const router = useRouter();

  if (typeof localStorage === "undefined") return;

  useEffect(() => {
    const localEmail: any = localStorage.getItem("email");
    console.log(localEmail);
    if (localEmail) {
      router.push("/discussions");
    }
  }, []);

  const signup = async (e: any) => {
    e.preventDefault();
    if (email === "") {
      setError("Please enter your email");
      return;
    } else {
      let expression: any =
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
      let regularExp = new RegExp(expression, "i");
      if (!email.match(regularExp)) {
        console.log("invalid email address");
        setError("Invalid email address");
      } else {
        const { data } = await supabase.from("user").select("email");
        let res = data?.filter((i) => i.email === email);
        console.log(res);
        if (res?.length) {
          localStorage.setItem("email", email);
          setSuccess("Welcome back 🙂");
          router.push("/discussions");
          return;
        }
        if (res?.length === 0) {
          const { error, data } = await supabase.auth.signInWithOtp({ email });

          if (error) {
            setError("Something went wrong");
            console.log(error);
            return;
          }
          if (data) {
            console.log(data);
            setError("");
            localStorage.setItem("email", email);
            setSubmitted(true);
          }
          if (submitted) {
            console.log("check your email address");
            return (
              <div>
                <h1 className="text-center text-green-600">
                  Please check your email to signup
                </h1>
              </div>
            );
          }
        }
      }
    }
  };

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
        emailRedirectTo: "https://localhost:3000/discussions",
      },
    });
  }

  return (
    <div>
      <div className="flex flex-col justify-center mt-2 xl:mt-5 w-[75vw] mobile:max-sm:w-[95%]">
        <div className="flex items-center gap-4 text-white">
          <Image src={"/logo.png"} width={50} height={50} alt={""}></Image>
          <p>WHATSAPP WEB</p>
        </div>
        <div className="bg-white mobile:max-sm:ml-2 flex flex-col justify-center w-full p-20 mobile:max-sm:p-5 mt-8 rounded drop-shadow">
          <h2 className="text-center text-gray-900 text-2xl">
            Enter your email
          </h2>
          <p className="text-center text-slate-500 mt-2">
            signup to whatsapp by entering your email address
          </p>
          <form
            action=""
            // onSubmit={signup}
            onSubmit={signInWithEmail}
            className="flex flex-col mt-5 gap-5 items-center"
          >
            <input
              className="w-60 mx-auto border border-slate-200 p-2 rounded outline-1 outline-secondry"
              type="email"
              placeholder="youremail@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-red-600">{error}</p>
            <p className="text-center">{success}</p>
            <button
              // onClick={() => signup()}
              type="submit"
              className="bg-secondry w-20 py-2 text-sm text-white rounded"
            >
              NEXT
            </button>
          </form>
          {submitted ? (
            <p className="text-center py-4">Please check out your mail</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default Signup;

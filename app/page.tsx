import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Signup from "@/components/signup";
import Discossions from "@/app/discussions/page";
import SideNavRight from "@/components/RightSideBar/SideNavRight";
import SearchField from "@/components/RightSideBar/SearchField";

export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.//
    // Feel free to remove it once you have Supabase connected.//
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  if (isSupabaseConnected) console.log("supabase is connected successfully");

  return (
    <div className="flex-1 h-[80vh] w-[100%] flex flex-col items-center mx-auto rounded-sm ">
      {/* <Signupb /> */}
      <Signup />
      {/* <Discossions /> */}
    </div>
  );
}

import { Room, User } from "@/type";
import { supabase } from "../supabase/client";
import { updateReadMessageStatus } from "./updateReadMessageStatus";

const fetchSingleRoom = async (user_id: string) => {
  // console.log(id);
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("user_id", user_id)
    .single();

  if (error) console.log("error while fetching single room", error);
  if (data) {
    // console.log("Here is single room", data);
    // localStorage.setItem("reciever", JSON.stringify(data))
    return data as User;
  }
};
export default fetchSingleRoom;

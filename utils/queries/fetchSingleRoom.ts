import { Room, User } from "@/type";
import { supabase } from "../supabase/client";

const fetchSingleRoom = async (roomId: string) => {
  // console.log(id);
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("user_id", roomId);

  if (error) console.log("error while fetching single room", error);
  if (data) {
    console.log("Here is single room", data);
    // localStorage.setItem("reciever", JSON.stringify(data))
    return data[0] as unknown as User;
  }
};
export default fetchSingleRoom;

import { Room, User } from "@/type";
import { supabase } from "../supabase/client";
import fetchSingleRoom from "./fetchSingleRoom";

// this function query a signed up user on clicking on the user on the side bar
const fetchSingleUser = async (id: string) => {
  let roomObject: Object;
  const { data, error } = await supabase.from("user").select().eq("id", id);
  // .single()

  if (error) console.log(error);
  if (data) {
    console.log("single user object", data);
    localStorage.setItem("reciever", JSON.stringify(data)); // sending the reciever object to the local storage on a click
    return data[0] as unknown as User;
  }
};
export default fetchSingleUser;

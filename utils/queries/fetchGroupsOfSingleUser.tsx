import { supabase } from "../supabase/client";

// get all the groups to which a signup user belongs to
const fetchGroupsOfSingleUser = async () => {
  const sender = JSON.parse(localStorage.getItem("sender") || "{}");
  const { data, error } = await supabase
    .from("roomuser")
    .select("room_id")
    .eq("user_id", sender.id);

  if (error)
    console.log(
      "could not search for all groups to which user belongs to",
      error
    );
  if (data) {
    console.log("these are groups to which you belong", data);
    console.log(typeof data);
  }
  return data;
};
export default fetchGroupsOfSingleUser;

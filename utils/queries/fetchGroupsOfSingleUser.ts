import { supabase } from "../supabase/client";
// get all the groups to which a signup user belongs to
const fetchGroupsOfSingleUser = async (userId: string | undefined) => {
  try {
    let { data } = await supabase
      .from("roomuser")
      .select("*")
      .eq("user_id", userId);
    if (data) {
      // console.log("these are groups to which you belong", data);
      return data;
    }
  } catch (error) {
    if (error)
      console.log(
        "could not search for all groups to which user belongs to",
        error
      );
  }
};
export default fetchGroupsOfSingleUser;

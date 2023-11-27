import { Group, User } from "@/type";
import { supabase } from "../supabase/client";

const getAllGroupsPerUser = async (groups: Group[]) => {
  // let grpData: User[] = []
  const allGroups = groups?.map(async (grp) => {
    const { data, error } = await supabase
      .from("rooms")
      .select()
      .eq("id", grp.room_id)
      .single();

    if (error) console.log("could not fetch group of user", error);
    if (data) {
      // console.log('this is group', data)
      // grpData.push(data)
      return data;
    }
  });
  console.log("this is returned group", allGroups);
  return allGroups;
};
export default getAllGroupsPerUser;

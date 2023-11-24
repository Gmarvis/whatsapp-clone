import { supabase } from "../supabase/client";
import fetchGroupsOfSingleUser from "./fetchGroupsOfSingleUser";

const fetchUserGoups = async (userId: string) => {
  const groups = await fetchGroupsOfSingleUser(userId);

  const userGroups: Promise<any[] | null>[] | undefined = groups?.map(
    async (row) => {
      let { data, error } = await supabase
        .from("rooms")
        .select("*")
        .match({ id: row.room_id, status: true });

      if (error) console.log("could not fetch all group ", error);
      if (data) {
        // console.log("rooms data: ", data);
        localStorage.setItem("grupMember", JSON.stringify(data));
      }
      return data;
    }
  );

  return await Promise.all(userGroups as Promise<string[] | null>[]);
};
export default fetchUserGoups;

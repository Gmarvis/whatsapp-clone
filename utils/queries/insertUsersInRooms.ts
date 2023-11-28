import { User } from "@/type";
import { supabase } from "../supabase/client";

const insertUsersInRooms = async (users: User[]) => {
  // console.log(typeof users)
  // console.log(users);
  const sendUsers = users?.map(async (user) => {
    if (user.name !== "" && user.id !== "") {
      const { data, error } = await supabase
        .from("rooms")
        .upsert(
          {
            name: `${user.name}`,
            user_id: `${user.id}`,
            image: `${user.image}`,
          },
          {
            onConflict: "name", // Specify the column to check for conflicts
          }
        )
        .select();
      if (error) {
        console.log("could not post users in room", error);
        return;
      }
      if (data) {
        // console.log("this is data from insert data", data);
        return data;
      }
    }
  });

  // console.log("sendUSers: ", sendUsers);
  return Promise.all(sendUsers);
};
export default insertUsersInRooms;

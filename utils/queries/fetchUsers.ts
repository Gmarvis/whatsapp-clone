import { User } from "@/type";
import { User } from "@/type";
import { supabase } from "../supabase/client";
import fetchUserGoups from "./fetchAllUserGroups";
import fetchGroupsOfSingleUser from "./fetchGroupsOfSingleUser";
import fetchSignupUser from "./fetchSignupUser";
import fetchSingleRoom from "./fetchSingleRoom";
import { shuffleArr } from "./getMessage";
import insertUsersInRooms from "./insertUsersInRooms";

const fetchUsers = async (currentUserId: string) => {
  const { data, error } = await supabase.from("user").select();
  if (error) return [];

  const groups = await Promise.all(
    (await fetchUserGoups(currentUserId)) as any[]
  );

  const currentUserRoomId = (await fetchSingleRoom(currentUserId))?.id;
  const groups = await Promise.all(
    (await fetchUserGoups(currentUserId)) as any[]
  );

  const currentUserRoomId = (await fetchSingleRoom(currentUserId))?.id;

  const value = [...groups.flat(), ...data];
  // console.log("user and  groups: ", value);
  const newList = shuffleArr(value);

  const usersInRoomTable = (await insertUsersInRooms(newList))
    .flat()
    .filter(Boolean);
  // console.log("filtered users", usersInRoomTable.flat().filter(Boolean));

  const listOfunreadMessagesCount = (
    await supabase.from("unread_messages").select("*")
  ).data;
  const listOfunreadMessagesCount = (
    await supabase.from("unread_messages").select("*")
  ).data;

  const listToReturn = listOfunreadMessagesCount?.reduce(
    (acc, curr) => {
      const index = acc?.findIndex(
        (item: User) => item.user_id === curr.sender_id
      );
      if (index !== -1 && curr.receiver_room_id === currentUserRoomId) {
        acc[index] = {
          ...acc[index],
          unread_count: curr.unread_count,
          last_message: curr.last_message,
        };
      }

      return acc;
    },
    [...usersInRoomTable]
  );

  return {
    merged: listToReturn,
    data: data,
    groups: groups.flat().map((group) => group.id),
    currentUserRoomId,
  };
};
export default fetchUsers;

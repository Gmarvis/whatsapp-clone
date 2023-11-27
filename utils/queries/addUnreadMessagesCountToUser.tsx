import { FetchUser, User } from "@/type";
import { supabase } from "../supabase/client";
import fetchUsers from "./fetchUsers";

export const addUnreadMessageCountToUser = async (currentUserId: string) => {
  const listOfUsers: FetchUser = (await fetchUsers(currentUserId)) as FetchUser;

  const listOfunreadMessagesCount = (
    await supabase.from("unread_messages").select("*")
  ).data;

  const listToReturn = listOfunreadMessagesCount?.reduce(
    (acc, curr) => {
      const index = acc?.findIndex(
        (item: User) =>
          item.user_id === curr.sender_id &&
          curr.receiver_room_id === listOfUsers.currentUserRoomId
      );
      if (index !== -1)
        acc[index] = { ...acc[index], unread_count: curr.unread_count };
      return acc;
    },
    [...listOfUsers.merged]
  );

  return {
    merged: listToReturn,
    data: listOfUsers.data,
    groups: listOfUsers.groups,
    currentUserRoomId: listOfUsers.currentUserRoomId,
  };
};

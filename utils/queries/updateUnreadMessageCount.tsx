import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../supabase/client";

export const updateUnreadMessageCount = async (
  sender_id: string,
  receiver_room_id: string,
  content?: string
) => {
  let guardContent: string = "",
    senderid = "",
    receiver_id = "",
    last_unread_count = 0,
    unreadMessages: PostgrestSingleResponse<null>;

  if (
    guardContent === content &&
    senderid === sender_id &&
    receiver_id === receiver_room_id
  )
    return;

  const { data, error } = await supabase
    .from("unread_messages")
    .select("*")
    .match({ sender_id: sender_id, receiver_room_id: receiver_room_id })
    .single();
    console.log(data.last_message === content);
  if (data && data.last_message === content) {
    console.log("encore du test not accepted");
    return;
  } else {
    console.log("encore du test mais accepted", content);
    unreadMessages = await supabase.from("unread_messages").upsert(
      {
        sender_id: sender_id,
        receiver_room_id: receiver_room_id,
        unread_count: last_unread_count + 1,
        last_message: content,
      },
      {
        onConflict: "sender_id, receiver_room_id ",
        // ignoreDuplicates: false,
      }
    );

    guardContent = content as string;
    senderid = sender_id;
    receiver_id = receiver_room_id;
    last_unread_count =
      data === null ? data?.unread_count + 1 : data?.unread_count;
    console.log("last_unread_count", last_unread_count,data?.unread_count);
  }

  return unreadMessages;
};

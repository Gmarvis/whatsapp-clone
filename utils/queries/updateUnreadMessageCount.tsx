import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../supabase/client";

export const updateUnreadMessageCount = async (
  sender_id: string,
  receiver_room_id: string,
  content?: string
) => {
  const { data, error } = await supabase
    .from("unread_messages")
    .select("unread_count")
    .match({ sender_id: sender_id, receiver_room_id: receiver_room_id })
    .single();

  const dbvalue = !data ? 1 : data.unread_count + 1;
  const unreadMessages: PostgrestSingleResponse<null> = await supabase
    .from("unread_messages")
    .upsert(
      {
        sender_id: sender_id,
        receiver_room_id: receiver_room_id,
        unread_count: dbvalue,
        last_message: content,
      },
      {
        onConflict: "sender_id, receiver_room_id ",
        ignoreDuplicates: false,
      }
    );

  return unreadMessages;
};

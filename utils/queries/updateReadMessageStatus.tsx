import { supabase } from "../supabase/client";
import { updateUnreadMessageCount } from "./updateUnreadMessageCount";

export const updateReadMessageStatus = async (
  sender_id: string,
  receiver_room_id: string
) => {
  const readStatus = await supabase
    .from("messages")
    .update({ is_read: true })
    .match({
      sender_id: sender_id,
      receiver_room_id: receiver_room_id,
    });

  if (readStatus.data)
    console.log("read messages updated status: ", readStatus.data);
  if (readStatus.error)
    console.log(
      "error while updating the read messages status: ",
      readStatus.error
    );

  updateUnreadMessageCount(sender_id, receiver_room_id, 0)
    .then((data) => {
      if (data)
        console.log("reinitializing the counter of unread messages: ", data);
    })
    .catch((err) => {
      if (err instanceof Error)
        console.log("error initializing the counter of unread messages: ", err);
    });

  return readStatus;
};

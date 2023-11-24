import { supabase } from "../supabase/client";

export const getReceivedMessages = async (
  receiver_user_id: string,
  current_user_roomId?: string
) => {
  const { data, error } = await supabase.from("messages").select("*").match({
    sender_id: receiver_user_id,
    receiver_room_id: current_user_roomId,
  });

  if (error) {
    console.log("unable to get recieved msgs", error)
    return};

  if (data) {
    console.log('these are messages', data)
    return data;
  }
};

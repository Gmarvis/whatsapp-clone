import { Message } from "postcss";
import { supabase } from "../supabase/client";
import { getReceivedMessages } from "./getReceivedMessage";

export const getMessages = async (
  current_user_id: string,
  receiver_room_id: string,
  receiver_user_id: string,
  current_user_roomId: string
) => {
  const messages: any = (await getReceivedMessages(
    receiver_user_id,
    current_user_roomId
  )) as any[];

  const { data, error } = await supabase.from("messages").select("*").match({
    sender_id: current_user_id,
    receiver_room_id: receiver_room_id,
  });

  if (error) return;

  // console.log("this is received messages: ", messages);
  if (data) {
    // console.log("this is sent messages: ", data);
    if (current_user_id !== receiver_room_id)
      return shuffleArr([...data, ...messages]);

    return data;
  }
};

export const shuffleArr = (arr: any[]) => {
  if (arr.length <= 1) return arr;
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

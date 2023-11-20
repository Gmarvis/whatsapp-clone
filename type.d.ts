export type Placement =
  | "top"
  | "bottom"
  | "right"
  | "left"
  | "bottomStart"
  | "bottomEnd"
  | "topStart"
  | "topEnd"
  | "leftStart"
  | "leftEnd"
  | "rightStart"
  | "rightEnd"
  | "auto"
  | "autoVerticalStart"
  | "autoVerticalEnd"
  | "autoHorizontalStart"
  | "autoHorizontalEnd";

type User = {
  created_at?: string;
  email?: string;
  id?: string;
  image?: string;
  name: string;
  phone?: string;
  updated_at?: string;
  user_id: string;
};

type Message = {
  id?: string;
  created_at?: string;
  sender_id: string;
  receiver_id?: string;
  content: string;
  sent_at?: string;
  updated_at?: string;
  emoji?: string;
  receiver_room_id?: string;
};

type Roomuser = {
  id: string;
  room_id: string;
  user_id: string;
};

type Room = {
  created_at?: string;
  id?: string;
  image?: string;
  name: string;
  status?: boolean;
  updated_at?: string;
  user_id?: string;
};

type PartRoomUser = Pick<Room | "updated_at" | "name" | "image"> & User;

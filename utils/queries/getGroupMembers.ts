import { supabase } from "../supabase/client";

export const getGroupMembers = async (groupId: string) => {
  try {
    const { data } = await supabase
      .from("roomuser")
      .select("*")
      .eq("room_id", groupId);

    if (data) {
      console.log(" the members of the group: ", data);
      //subscribe all the member to group
      data?.map((member) => {
        const subscribe = supabase
          .channel(`group_:${groupId}`)
          .subscribe(member.room_id);
        if (subscribe)
          console.log(" creation of a group and user subscribed to a group");
      });

      return data?.map((member) => member.room_id);
    }
  } catch (error) {
    if (error) console.log("error fetching the group members: ", error);
  }
};

//  THis function bellow is to get all members in the a sellected group

export const getMembersInGroup = async (groupId: string) => {
  try {
    const { data } = await supabase
      .from("roomuser")
      .select("*")
      .eq("room_id", groupId);

    if (data) {
      console.log(" the members of the group: ", data);

      data?.map((member) => {
        const subscribe = supabase
          .channel(`group_:${groupId}`)
          .subscribe(member.room_id);
        if (subscribe)
          console.log(" creation of a group user subscribed to a group");
      });

      return data?.map((member) => member.user_id);
    }
  } catch (error) {
    if (error) console.log("error fetching the group members: ", error);
  }
};

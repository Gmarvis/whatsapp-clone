import { useWhatSappContext } from "@/components/context";
import { supabase } from "../supabase/client";
import { LOCAL_STORAGE } from "../service/storage";

export const uploadGroupIcon = async (file: any) => {
  // const { setGroupIcon } = useWhatSappContext();

  const fileValue = `groupIcon${Date.now()}.png`;

  const { data, error } = await supabase.storage
    .from("whatsapp_avatars/images")
    .upload(fileValue, file);

  if (error) {
    console.error("error creatin group icon", error);
  } else {
    console.log("group icon data", data);
    const imageUrl = supabase.storage
      .from("whatsapp_avatars/images")
      .getPublicUrl(data.path);
    console.log("group icon download url", imageUrl.data.publicUrl);
    return imageUrl.data.publicUrl;
  }
};

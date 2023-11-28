import { User } from "@/type";
import { supabase } from "../supabase/client";
import { LOCAL_STORAGE } from "../service/storage";

const updateUserAvatar = async (image: string) => {
  const currentUser: User = JSON.parse(localStorage.getItem("sender") || "{}");
  // console.log(image)
  const { data, error } = await supabase
    .from("user")
    .update({ image: image })
    .eq("id", currentUser.id)
    .select();

  if (error) console.log("could not update", error);
  if (data) {
    LOCAL_STORAGE.save("sender", data);

    const activeUser = LOCAL_STORAGE.get("sender");
    const userImage = activeUser.image;
    setProfileImage(userImage);
    console.clear();
    console.log("User Profile picture", userImage);
    console.log("successfully updated", data);
  }
};

export default updateUserAvatar;
function setProfileImage(image: any) {
  throw new Error("Function not implemented.");
}

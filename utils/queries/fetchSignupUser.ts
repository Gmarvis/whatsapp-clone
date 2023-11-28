import { User } from "@/type";
import { supabase } from "../supabase/client";

const fetchSignupUser = async (email: string) => {
  const { data, error } = await supabase
    .from("user")
  const { data, error } = await supabase
    .from("user")
    .select()
    .eq("email", email)
    .single();
  if (error) console.log("Error while getting single signup user", error);
  if (data) {
    console.log("here is signup user", data);
    localStorage.setItem("sender", JSON.stringify(data));
    console.log("here is signup user", data);
    localStorage.setItem("sender", JSON.stringify(data));
  }
  return data as User;
};
export default fetchSignupUser;

export const swap = (arr: User[], index1: number, index2: number) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
};

import { supabase } from "../supabase/client";

export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
    return;
  }
  console.log("gotten users", data);
  return data;
};

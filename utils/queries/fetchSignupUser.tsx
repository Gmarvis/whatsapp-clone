import { supabase } from "../supabase/client";

const fetchSignupUser = async () => {
  const email = localStorage.getItem("email");
  console.log(email);
  const { data, error } = await supabase
    .from("user")
    .select()
    .eq("email", email)
    .single();

  if (error) console.log("error while fetching signup user", error);
  if (data) {
    console.log("Here is signup user", data);
    localStorage.setItem("sender", JSON.stringify(data));
  }
  return data[0];
};
export default fetchSignupUser;

import { createClient } from "@/utils/supabase/server";

export const getAllVolunteer = async () => {
  try {
    const supabase = await createClient();

    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "volunteer");
    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }
    return {
      status: "success",
      users,
    };
  } catch (error) {
    throw error;
  }
};

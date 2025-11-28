"use server";
import { createClient } from "@/utils/supabase/server";

export const getAllDisasters = async () => {
  try {
    const supabase = await createClient();
    const { data: disasters, error } = await supabase
      .from("disasters")
      .select("*");
    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }
    return {
      status: "success",
      data: disasters,
    };
  } catch (error) {
    throw error;
  }
};

export const deletesingleDisaster = async (disasterID: string) => {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("disasters")
      .delete()
      .eq("id", disasterID);
    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }
  } catch (error) {
    throw error;
  }
};

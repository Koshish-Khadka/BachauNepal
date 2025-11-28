"use server";
import { createClient } from "@/utils/supabase/server";

export const getAllResources = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .is("disaster_id", null);
    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }
    return { status: "success", data };
  } catch (error) {
    throw error;
  }
};

export const getResourcesByDisasterId = async (disasterId: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("disaster_id", disasterId);
    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }
    return { status: "success", data };
  } catch (error) {
    throw error;
  }
};

export const deletesingleResouces = async (resourcesID: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("id", resourcesID);
    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }
    return { status: "success", data };
  } catch (error) {
    throw error;
  }
};

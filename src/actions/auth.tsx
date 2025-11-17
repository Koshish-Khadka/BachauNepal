"use server";

import { createClient } from "@/utils/supabase/server";

type signInArgs = {
  email: string;
  password: string;
};

type signUpArgs = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "volunteer";
};

export const LoginUser = async (loginData: signInArgs) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });
    if (error) {
      return { status: "error", message: error.message };
    }
    if (!data.user) {
      return {
        status: "error",
        message: "No user returned. Login might have failed.",
      };
    }

    return { status: "success", user: data.user };
  } catch (error) {
    console.log("Failed to login user", error);
  }
};

export const registerUser = async (signupdata: signUpArgs) => {
  try {
    const supabase = await createClient();
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", signupdata.email)
      .single();

    if (existingUser) {
      return {
        status: "error",
        message: "User with this email already exists.",
      };
    }

    // 1️ Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: signupdata.email,
      password: signupdata.password,
      options: {
        data: {
          role: signupdata.role,
          name: signupdata.name,
        },
      },
    });

    if (authError) {
      return { status: "error", message: authError.message };
    }

    if (!authData.user) {
      return {
        status: "error",
        message: "Signup failed. No user returned.",
      };
    }

    const userId = authData.user.id;

    // 2️ Insert into your custom "users" table
    const { error: insertError } = await supabase.from("users").insert({
      id: userId,
      name: signupdata.name,
      email: signupdata.email,
      role: signupdata.role,
    });

    if (insertError) {
      return { status: "error", message: insertError.message };
    }

    return {
      status: "success",
      message: "User registered successfully!",
      user: authData.user,
    };
  } catch (error) {
    console.log("failed to register user", error);
    return { status: "error", message: "Something went wrong." };
  }
};

export const LogoutUser = async () => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error logging out:", error.message);
      return { status: "error", message: error.message };
    }
    return { status: "success", message: "Logged out successfully." };
  } catch (error) {
    console.log("Unexpected error during logout:", error);
    return { status: "error", message: "Something went wrong." };
  }
};

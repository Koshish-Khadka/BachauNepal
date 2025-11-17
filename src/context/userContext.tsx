"use client";
import { createClient } from "@/utils/supabase/client";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  created_at: string;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchUserData: () => Promise<void>;
};

export const userContext = createContext<UserContextType | undefined>(
  undefined
);

export const Userprovider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUserData = async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) return;

      const { data: Profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      setUser({
        id: Profile.id,
        username: Profile.name,
        email: Profile.email,
        role: Profile.role,
        created_at: Profile.created_at,
      });
      return Profile;
    } catch (error) {
      console.error("Unexpected error fetching user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
    };

    fetchData();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser, fetchUserData }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

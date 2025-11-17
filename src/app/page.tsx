"use client";

import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import Filter from "@/components/Filter";
import Navbar from "@/components/Navbar";
import { useUser } from "@/context/userContext";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function Home() {
  const { user } = useUser();
  console.log("Hello", user?.username);
  return (
    <div className="relative h-screen w-screen">
      <Map />
      <Navbar />
      <Sidebar />
      <Filter />
    </div>
  );
}

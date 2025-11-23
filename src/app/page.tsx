"use client";

import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import Filter from "@/components/Filter";
import Navbar from "@/components/Navbar";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      <header>
        <Navbar />
      </header>
      <main>
        <section>
          <Map />
          <Filter />
        </section>
        <aside>
          <Sidebar />
        </aside>
      </main>
    </div>
  );
}

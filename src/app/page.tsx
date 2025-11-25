"use client";

import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Switches from "@/components/Switches";
import DisasterDetail from "@/components/DisasterDetail";
import { useDisaster } from "@/context/disasterContext";
import Filter from "@/components/Filter";

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
          <DisasterDetail />
          {/* <Switches /> */}
        </section>
        <aside>
          <Sidebar />
        </aside>
      </main>
    </div>
  );
}

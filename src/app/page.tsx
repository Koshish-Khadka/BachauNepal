"use client";

import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import Filter from "@/components/Filter";
import Navbar from "@/components/Navbar";
import { getAllResources, getResourcesByDisasterId } from "@/actions/resource";
import { useEffect, useState } from "react";

export type resourceDataType = {
  id: string;
  created_at: string;
  title: string;
  type: string;
  description: string;
  lat: number;
  lng: number;
  contactnum: string;
  capacity: string | number;
  created_by: string;
};

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function Home() {
  // Fetch all resources on page load

  const [resources, setResources] = useState<resourceDataType[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const result = await getAllResources();
        if (result.status === "success") {
          // console.log("Resources:", result.data);
          setResources(result.data || []);
        } else {
          console.log("Error fetching resources:", result.message);
        }
      } catch (error) {
        console.log("Failed to fetch Resources", error);
      }
    };
    fetchResources();
  }, []);

  // Fetch resources by disaster ID example
  useEffect(() => {
    const fetchResourcesByDisasterId = async () => {
      try {
        const result = await getResourcesByDisasterId(
          "3e39e93e-658c-44bc-882e-f0587a9138d7"
        );
        if (result.status === "success") {
          // console.log("Disaster Resources:", result.data);
        } else {
          console.log("Error fetching disaster resources:", result.message);
        }
      } catch (error) {
        console.log("Failed to fetch disaster resource", error);
      }
    };
    fetchResourcesByDisasterId();
  });

  return (
    <div className="relative h-screen w-screen">
      <header>
        <Navbar />
      </header>
      <main>
        <section>
          <Map resources={resources} />
          <Filter />
        </section>
        <aside>
          <Sidebar />
        </aside>
      </main>
    </div>
  );
}

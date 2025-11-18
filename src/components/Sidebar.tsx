"use client";

import { getAllDisasters } from "@/actions/disaster";
import { ArrowLeft, ArrowRight, MapPin, Wind } from "lucide-react";
import { useEffect, useState } from "react";
type disasterDataType = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  startdata: string;
  enddate: string | null;
  location: string;
  radius: number;
  status: string;
  created_by: string;
  lat: number;
  lng: number;
};

export default function Sidebar() {
  const disaster = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [isOpen, setIsOpen] = useState(true);
  const [disastersData, setDisastersData] = useState<disasterDataType[]>([]);

  const handleSidebarToggle = () => setIsOpen(!isOpen);

  // Fetch Disaster data
  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const result = await getAllDisasters();
        if (result.status === "success") {
          // console.log("Disasters:", result.data);
          setDisastersData(result.data || []);
        } else {
          console.log("Error fetching disasters:", result.message);
        }
      } catch (error) {
        console.log("Failed to fetch Disasters", error);
      }
    };
    fetchDisasters();
  }, []);

  return (
    <div className="absolute top-0 left-0 z-[9999] flex items-start">
      {/* Sidebar */}
      <div
        className={`bg-white/90 h-screen rounded-r-2xl p-4 shadow-lg overflow-y-scroll transition-all duration-300
        ${isOpen ? "w-[18rem]" : "w-0 p-0 overflow-hidden"}`}
      >
        {isOpen && (
          <>
            <div className="p-2 border border-gray-300 rounded-md mt-4">
              <h1 className="text-[16px] font-bold ">
                Alert and Ongoing Disasters
              </h1>
              <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                <MapPin />
                Red markers indicate ongoing situations.
              </p>
            </div>

            <div>
              {disastersData.map((item, index) => (
                <div
                  key={index}
                  className="p-2 border border-gray-300 rounded-md mt-4"
                >
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Wind color="#f65c51" />
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mt-1">
                      Status: {item.status}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Location: {item.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Toggle Button (Always visible, never shrinks) */}
      <button
        onClick={handleSidebarToggle}
        className="ml-1 mt-1 bg-blue-800 p-2 rounded-md shadow cursor-pointer"
      >
        {isOpen ? <ArrowLeft color="#fff" /> : <ArrowRight color="#fff" />}
      </button>
    </div>
  );
}

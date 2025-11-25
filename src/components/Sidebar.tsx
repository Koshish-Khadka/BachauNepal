"use client";

import { AlertTriangle, ArrowLeft, Menu } from "lucide-react";

import { Disaster, useDisaster } from "@/context/disasterContext";
import { Button } from "./ui/button";

export default function Sidebar() {
  const {
    disasters,
    selectedDisaster,
    setSelectedDisaster,
    isOpen,
    setIsOpen,
  } = useDisaster();

  const handleSidebarToggle = () => setIsOpen(!isOpen);

  const handleDisasterclick = (disaster: Disaster) => {
    setSelectedDisaster(disaster);
    // setIsOpenDescription(true);
  };

  return (
    <div className="absolute top-0 left-0 z-[9999] flex items-start">
      {/* Sidebar */}
      <div
        className={`bg-white h-screen rounded-r-2xl shadow-lg overflow-y-scroll transition-all duration-300
        ${isOpen ? "w-[18rem]" : "w-0 p-0 overflow-hidden"}`}
      >
        {isOpen && (
          <div>
            <div className="p-4 border-b mt-4 bg-white flex-0">
              <h2 className="text-lg font-semibold text-gray-800">
                Alert and Ongoing Disasters
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Red markers indicate ongoing situations
              </p>

              {/* Disaster Count */}
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-gray-600">
                  {disasters.length} disasters registered
                </span>
                <span className="px-2 py-1 bg-red-50 text-red-700 rounded">
                  {disasters.filter((d) => d.status === "active").length} active
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {disasters.map((disaster) => (
                <div
                  key={disaster.id}
                  onClick={() => handleDisasterclick(disaster)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedDisaster?.id === disaster.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        disaster.status === "active"
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-800">
                        {disaster.type} in {disaster.location}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {disaster.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            disaster.status === "active"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {disaster.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Open the description detail of the disaster */}

      {/* Toggle Button (Always visible, never shrinks) */}
      <Button
        onClick={handleSidebarToggle}
        className="ml-1 mt-1 bg-white p-2  shadow cursor-pointer hover:bg-gray-200 rounded-lg transition-colors"
      >
        {isOpen ? <ArrowLeft color="black" /> : <Menu color="black" />}
      </Button>
    </div>
  );
}

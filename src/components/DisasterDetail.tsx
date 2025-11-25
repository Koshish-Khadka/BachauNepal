"use client";
import { useDisaster } from "@/context/disasterContext";
import {
  AlertTriangle,
  Calendar,
  HomeIcon,
  Info,
  MapPin,
  Radar,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const DisasterDetail = () => {
  const {
    selectedDisaster,
    setSelectedDisaster,
    setIsOpenDescription,
    isOpenDescription,
  } = useDisaster();

  const handleButtonclose = () => {
    setSelectedDisaster(null);
    setIsOpenDescription(false);
  };

  return (
    <div className="flex items-start">
      {/* Backdrop (optional) */}
      {isOpenDescription && (
        <div
          className="fixed inset-0 bg-black/20"
          onClick={handleButtonclose}
        />
      )}
      {/* Sliding Panel */}
      <div
        className={`
          absolute top-0 right-0 h-screen w-96 bg-white shadow-2xl z-[9999] 
          transform transition-transform duration-300 ease-out overflow-y-auto
          ${isOpenDescription ? "translate-x-0" : "translate-x-full"}
          `}
      >
        {/* Header */}
        <div
          className={`p-4 border-b ${
            selectedDisaster?.status === "active"
              ? "bg-red-50"
              : selectedDisaster?.status === "resolved"
              ? "bg-green-50"
              : "bg-gray-50"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  selectedDisaster?.status === "active"
                    ? "bg-red-100"
                    : selectedDisaster?.status === "resolved"
                    ? "bg-green-100"
                    : "bg-gray-200"
                }`}
              >
                <AlertTriangle
                  className={`w-5 h-5 ${
                    selectedDisaster?.status === "active"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {selectedDisaster?.type}
                </h3>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {selectedDisaster?.location}
                </p>
              </div>
            </div>
            <Button
              onClick={handleButtonclose}
              className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
              variant={"outline"}
            >
              <X className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
        {/* Disaster Image */}
        <div className="border-b pb-4">
          <Image
            src={"/images/earthquake.jpg"}
            alt="Disaster Image"
            width={1000}
            height={600}
            className="w-full h-auto rounded-md"
          />
          <h2 className="font-semibold text-lg text-gray-800 py-2 px-4">{selectedDisaster?.title}</h2>
        </div>
        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Description
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {selectedDisaster?.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-2 border space-y-2 rounded-md">
              <p className="font-medium text-gray-800">Start Date</p>
              <div className="flex gap-2">
                <Calendar className="w-4 h-4" />
                <p className="text-sm text-gray-600">Nov 20,2025</p>
              </div>
            </div>
            <div className="p-2 border space-y-2 rounded-md">
              <p className="font-medium text-gray-800">End Date</p>
              <div className="flex gap-2">
                <Calendar className="w-4 h-4" />
                <p className="text-sm text-gray-600">Nov 20,2025</p>
              </div>
            </div>
            <div className="p-2 border space-y-2 rounded-md">
              <p className="font-medium text-gray-800">Radius</p>
              <div className="flex gap-2">
                <Radar className="w-4 h-4" />
                <p className="text-sm text-gray-600">10km</p>
              </div>
            </div>
            <div className="p-2 border space-y-2 rounded-md">
              <p className="font-medium text-gray-800">Shelter</p>
              <div className="flex gap-2">
                <HomeIcon className="w-4 h-4" />
                <p className="text-sm text-gray-600">10km</p>
              </div>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="p-2">
          <Button
            className="w-full p-5 transition-all hover:scale-105 duration-150 ease-in-out"
            variant={"outline"}
          >
            View Resources Nearby
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DisasterDetail;

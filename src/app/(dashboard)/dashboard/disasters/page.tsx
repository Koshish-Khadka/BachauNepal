"use client";
import AddDisaster from "@/components/AddDisaster";
import { Button } from "@/components/ui/button";
import { useDisaster } from "@/context/disasterContext";
import { Calendar, Delete, Edit, HomeIcon, Info, Radar, X } from "lucide-react";
import React from "react";

const Disaster = () => {
  const data = [1, 2, 3, 4, 5];
  const { setAddDisaster, addDisaster } = useDisaster();
  return (
    <div>
      <h2 className="text-sm text-gray-600 leading-relaxed">
        Monitor and manage disaster events across Nepal.
      </h2>

      <div className="shadow rounded-md mt-4 bg-white">
        <div className="border-b p-3 pb-4 flex justify-between">
          <p>All(5)</p>
          <Button onClick={() => setAddDisaster(true)}>Add Disaster</Button>
        </div>
        {data.map((data, index) => {
          return (
            <div key={index}>
              <div className="px-3 py-5 border-b">
                <div className="flex justify-between">
                  <h2 className="font-semibold text-lg text-gray-800 py-2 ">
                    Earthquake in Kathmandu
                  </h2>
                  <div className="space-x-4">
                    <Button variant={"outline"}>
                      <Edit />
                    </Button>
                    <Button variant={"destructive"}>
                      <X />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed max-w-5xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores provident sapiente praesentium perferendis ducimus cum
                  reiciendis reprehenderit tempora fugiat officia ipsam magnam
                  corrupti harum ad, animi odio sit quibusdam? Unde?
                </p>
                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-2 space-y-2 rounded-md">
                    <p className="font-medium text-gray-800">Start Date</p>
                    <div className="flex gap-2">
                      <Calendar className="w-4 h-4" />
                      <p className="text-sm text-gray-600">Nov 20,2025</p>
                    </div>
                  </div>
                  <div className="p-2 space-y-2 rounded-md">
                    <p className="font-medium text-gray-800">End Date</p>
                    <div className="flex gap-2">
                      <Calendar className="w-4 h-4" />
                      <p className="text-sm text-gray-600">Nov 20,2025</p>
                    </div>
                  </div>
                  <div className="p-2 space-y-2 rounded-md">
                    <p className="font-medium text-gray-800">Radius</p>
                    <div className="flex gap-2">
                      <Radar className="w-4 h-4" />
                      <p className="text-sm text-gray-600">10km</p>
                    </div>
                  </div>
                  <div className="p-2 space-y-2 rounded-md">
                    <p className="font-medium text-gray-800">Shelter</p>
                    <div className="flex gap-2">
                      <HomeIcon className="w-4 h-4" />
                      <p className="text-sm text-gray-600">10km</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {addDisaster && <AddDisaster />}
      </div>
    </div>
  );
};

export default Disaster;

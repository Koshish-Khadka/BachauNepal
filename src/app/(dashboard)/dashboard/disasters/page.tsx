"use client";
import { deletesingleDisaster } from "@/actions/disaster";
import AddDisaster from "@/app/(dashboard)/components/AddDisaster";
import { Button } from "@/components/ui/button";
import { useDisaster } from "@/context/disasterContext";
import { Calendar, Edit, HomeIcon, Radar, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Disaster = () => {
  const { setAddDisaster, addDisaster, disasters } = useDisaster();
  // console.log("all disasters", disasters);
  const handleDisasterDelete = async (disasterID: string) => {
    try {
      const response = await deletesingleDisaster(disasterID);
      if (response?.status === "error") {
        toast.error("Failed to delete");
        return;
      }
      return toast.success("Disaster Deleted Successfully");
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };
  return (
    <div>
      <h2 className="text-sm text-gray-600 leading-relaxed">
        Monitor and manage disaster events across Nepal.
      </h2>

      <div className="shadow rounded-md mt-4 bg-white">
        <div className="border-b p-3 pb-4 flex justify-between">
          <p>All({disasters.length})</p>
          <Button onClick={() => setAddDisaster(true)}>Add Disaster</Button>
        </div>
        {disasters.map((data) => {
          return (
            <div key={data.id}>
              <div className="px-3 py-5 border-b">
                <div className="flex justify-between">
                  <h2 className="font-semibold text-lg text-gray-800 py-2 ">
                    {data.title}
                  </h2>
                  <div className="space-x-4">
                    <Button variant={"outline"}>
                      <Edit />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <X />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. It will permanently
                            delete this disaster.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDisasterDelete(data.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed max-w-5xl">
                  {data.description}
                </p>
                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-2 space-y-2 rounded-md">
                    <p className="font-medium text-gray-800">Start Date</p>
                    <div className="flex gap-2">
                      <Calendar className="w-4 h-4" />
                      <p className="text-sm text-gray-600">{data.startdate}</p>
                    </div>
                  </div>
                  <div className="p-2 space-y-2 rounded-md">
                    <p className="font-medium text-gray-800">End Date</p>
                    <div className="flex gap-2">
                      <Calendar className="w-4 h-4" />
                      <p className="text-sm text-gray-600">{data.enddate}</p>
                    </div>
                  </div>
                  <div className="p-2 space-y-2 rounded-md">
                    <p className="font-medium text-gray-800">Radius</p>
                    <div className="flex gap-2">
                      <Radar className="w-4 h-4" />
                      <p className="text-sm text-gray-600">{data.radius}km</p>
                    </div>
                  </div>
                  <div className="p-2 space-y-2 rounded-md">
                    <p className="font-medium text-gray-800">Location</p>
                    <div className="flex gap-2">
                      <HomeIcon className="w-4 h-4" />
                      <p className="text-sm text-gray-600">{data.location}</p>
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

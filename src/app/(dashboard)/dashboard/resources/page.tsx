"use client";
import { Button } from "@/components/ui/button";
import { useResource } from "@/context/resourcesContext";
import {
  Calendar,
  Edit,
  GroupIcon,
  Home,
  HomeIcon,
  PhoneCall,
  Radar,
  X,
} from "lucide-react";
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
import { deletesingleResouces } from "@/actions/resource";
import { toast } from "sonner";
import AddResource from "../../components/AddResources";

const Resource = () => {
  const { resources, addResource, setAddResource } = useResource();

  const Deleteresources = async (resourceID: string) => {
    try {
      const response = await deletesingleResouces(resourceID);
      if (response.status === "error") {
        toast.error("Failed to delete resource");
        return;
      }
      return toast.success("Resouce Deleted Successfully");
    } catch (error) {
      console.error("Failed to delete resouerces", error);
    }
  };
  return (
    <div>
      <h2 className="text-sm text-gray-600 leading-relaxed">
        Monitor and manage resources events across Nepal.
      </h2>

      <div className="shadow rounded-md mt-4 bg-white">
        <div className="border-b p-3 pb-4 flex justify-between">
          <p>All({resources.length})</p>
          <Button className="bg-green-700" onClick={() => setAddResource(true)}>
            Add Resources
          </Button>
        </div>
        {resources.map((data) => {
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
                            delete this resources.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => Deleteresources(data.id)}
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
                    <p className="font-medium text-gray-800">Resource type</p>
                    <div className="flex gap-2">
                      <Home className="w-4 h-4" />
                      <p className="text-sm text-gray-600">{data.type}</p>
                    </div>
                  </div>
                  <div className="p-2 space-y-2 rounded-md">
                    <p className="font-medium text-gray-800">contactnum</p>
                    <div className="flex gap-2">
                      <PhoneCall className="w-4 h-4" />
                      <p className="text-sm text-gray-600">{data.contactnum}</p>
                    </div>
                  </div>
                  <div className="p-2 space-y-2 rounded-md">
                    <p className="font-medium text-gray-800">Capacity</p>
                    <div className="flex gap-2">
                      <GroupIcon className="w-4 h-4" />
                      <p className="text-sm text-gray-600">{data.capacity}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {addResource && <AddResource />}
      </div>
    </div>
  );
};

export default Resource;

import React from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useResource } from "@/context/resourcesContext";
import { useDisaster } from "@/context/disasterContext";

const Switches = () => {
  const { isResourceShown, setIsResourceShown } = useResource();
  const { isDisasterShown, setIsDisasterShown } = useDisaster();
  return (
    <div className="absolute top-8 right-10 z-[999] bg-white rounded-md p-3 w-48">
      <h1 className="text-center font-medium mb-2">Switches</h1>
      <div className="flex flex-col space-x-2 space-y-4">
        <div className="flex gap-3">
          <Switch
            id="airplane-mode"
            checked={isResourceShown}
            onCheckedChange={() => setIsResourceShown(!isResourceShown)}
          />
          <Label
            htmlFor="airplane-mode"
            className="font-normal text-sm text-gray-800"
          >
            Show resources
          </Label>
        </div>
        <div className="flex gap-3">
          <Switch
            id="airplane-mode"
            checked={isDisasterShown}
            onCheckedChange={() => setIsDisasterShown(!isDisasterShown)}
          />
          <Label
            htmlFor="airplane-mode"
            className="font-normal text-sm text-gray-800"
          >
            Show Disaster
          </Label>
        </div>
      </div>
    </div>
  );
};

export default Switches;

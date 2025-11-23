import { SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import image from "../../public/world.jpg";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useResource } from "@/context/resourcesContext";

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const { isResourceShown, setIsResourceShown } = useResource();
  return (
    <div className="absolute top-4 right-2 z-[9999]">
      <div title="filter" className="p-3 bg-blue-800 rounded-full">
        <SlidersHorizontal color="white" onClick={toggleFilter} />
      </div>
      {isOpen && (
        <div>
          <div className="absolute top-10 right-10 bg-white p-4 shadow-lg w-64 rounded-md">
            <h3 className="text-sm font-normal mb-2">Map type</h3>

            <div className="flex justify-between mt-4">
              <div className="space-y-2">
                <Image
                  alt="Image"
                  src={image}
                  width={50}
                  height={80}
                  className="rounded-lg"
                />
                <p>Satellite</p>
              </div>
              <div className="space-y-2">
                <Image
                  alt="Image"
                  src={image}
                  width={50}
                  height={80}
                  className="rounded-lg"
                />
                <p>Terrain</p>
              </div>
              <div className="space-y-2">
                <Image
                  alt="Image"
                  src={image}
                  width={50}
                  height={80}
                  className="rounded-lg"
                />
                <p>Hybrid</p>
              </div>
            </div>

            <h3 className="text-sm font-normal mt-4 mb-3 border-t pt-4">
              Show/Hide Resources
            </h3>
            <div className="flex items-center space-x-2 space-y-2">
              <Switch
                id="airplane-mode"
                checked={isResourceShown}
                onCheckedChange={() => setIsResourceShown(!isResourceShown)}
              />
              <Label htmlFor="airplane-mode">Show resources</Label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;

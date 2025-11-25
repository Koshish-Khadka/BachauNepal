import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import Switches from "./Switches";

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute top-2 right-5 z-[9999]">
      <div title="filter" className="p-3 bg-white rounded-full">
        <SlidersHorizontal color="black" onClick={toggleFilter} />
      </div>
      {isOpen && <Switches />}
    </div>
  );
};

export default Filter;

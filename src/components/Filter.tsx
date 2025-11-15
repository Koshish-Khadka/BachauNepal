import { SlidersHorizontal } from "lucide-react";

const Filter = () => {
  return (
    <div className="absolute top-4 right-2 z-[9999]">
      <div title="filter" className="p-3 bg-blue-800 rounded-full">
        <SlidersHorizontal color="white" />
      </div>
    </div>
  );
};

export default Filter;

import { MapPin } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <nav
      className="
  absolute 
  top-4 
  left-1/2 
  -translate-x-1/2
  flex justify-center items-center 
  z-[9999] 
  bg-white/90 
  px-6 py-3 
  rounded-2xl 
  shadow-lg
"
    >
      <ul className="flex items-center gap-x-10 ">
        <li className="flex items-center gap-2 text-[16px] font-bold text-gray-700">
          <MapPin />
          Bachau
          <br />
          Nepal
        </li>
        <li className="text-lg text-gray-600">Map</li>
        <li className="text-lg text-gray-600">Blogs</li>
        <li className="text-[18px] ">
          <button title="button" className="bg-blue-800 p-2 px-4 rounded-lg text-white font-normal">Login</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
